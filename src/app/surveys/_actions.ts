
'use server';

import { z } from 'zod';
import type { Survey, SurveyAnswer, SurveyResponseInput } from '@/lib/types';
import { getSurveyById } from '@/lib/mockData'; // To validate against actual survey questions

export type SurveyFormState = {
  message: string;
  fields?: Record<string, string | string[]>;
  issues?: string[];
  success?: boolean;
  surveyId?: string;
};

export async function submitSurveyAction(
  prevState: SurveyFormState,
  formData: FormData
): Promise<SurveyFormState> {
  const surveyId = formData.get('surveyId') as string;

  if (!surveyId) {
    return {
      message: 'Survey ID is missing.',
      issues: ['Survey ID is missing.'],
      success: false,
    };
  }

  const survey = getSurveyById(surveyId);
  if (!survey) {
    return {
      message: 'Survey not found.',
      issues: [`Survey with ID "${surveyId}" not found.`],
      success: false,
      surveyId,
    };
  }
  
  if (!survey.isActive) {
    return {
      message: 'This survey is closed and no longer accepting responses.',
      issues: ['Survey is closed.'],
      success: false,
      surveyId,
    }
  }

  const answers: SurveyAnswer[] = [];
  const rawFields: Record<string, string | string[]> = {};
  const validationIssues: string[] = [];

  // Dynamically build Zod schema based on survey questions
  const fieldSchemas: Record<string, z.ZodTypeAny> = {
    surveyId: z.string(),
  };

  for (const question of survey.questions) {
    const fieldName = `question_${question.id}`;
    let questionSchema: z.ZodTypeAny;

    switch (question.type) {
      case 'text':
        questionSchema = z.string();
        if (question.isRequired) {
          questionSchema = questionSchema.min(1, { message: `${question.text} is required.` });
        } else {
          questionSchema = questionSchema.optional();
        }
        break;
      case 'single-choice':
      case 'yes-no':
        questionSchema = z.string();
         if (question.isRequired) {
          questionSchema = questionSchema.min(1, { message: `${question.text} is required.` });
        } else {
          questionSchema = questionSchema.optional();
        }
        break;
      case 'rating':
        questionSchema = z.coerce.number();
         if (question.isRequired) {
            questionSchema = questionSchema.min(question.minRating || 1).max(question.maxRating || 5);
        } else {
           questionSchema = questionSchema.optional();
        }
        break;
      case 'multiple-choice':
        // For multiple choice, we'll collect values and validate if at least one is selected if required
        // Zod validation for "at least one checkbox" is complex with dynamic field names.
        // We'll handle this manually after parsing.
        question.options?.forEach(opt => {
          fieldSchemas[`${fieldName}_${opt.value}`] = z.string().optional();
        });
        // Placeholder, actual validation for "at least one" will be manual
        questionSchema = z.any().optional(); 
        break;
      default:
        questionSchema = z.any().optional();
    }
    if (question.type !== 'multiple-choice') {
         fieldSchemas[fieldName] = questionSchema;
    }
  }
  
  const FormSchema = z.object(fieldSchemas);
  
  const parsedData: Record<string, any> = { surveyId };
  formData.forEach((value, key) => {
    if (key.startsWith('question_')) {
        // For multiple choice, collect all selected values for that question
        if(key.includes('_') && survey.questions.find(q => `question_${q.id}` === key.substring(0, key.lastIndexOf('_')) && q.type === 'multiple-choice')) {
            const baseFieldName = key.substring(0, key.lastIndexOf('_'));
            if(!parsedData[baseFieldName]) {
                parsedData[baseFieldName] = [];
            }
            (parsedData[baseFieldName] as string[]).push(value as string);
            rawFields[key] = value as string; // also keep raw for potential re-population
        } else {
             parsedData[key] = value;
             rawFields[key] = value as string;
        }
    }
  });


  const validatedFields = FormSchema.safeParse(parsedData);

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check your answers.',
      fields: rawFields,
      issues: validatedFields.error.issues.map((issue) => issue.message),
      success: false,
      surveyId,
    };
  }

  // Manual validation for required multiple-choice questions
   for (const question of survey.questions) {
    if (question.type === 'multiple-choice' && question.isRequired) {
      const fieldName = `question_${question.id}`;
      const selectedOptions = parsedData[fieldName] as string[] | undefined;
      if (!selectedOptions || selectedOptions.length === 0) {
        validationIssues.push(`${question.text} is required. Please select at least one option.`);
      }
    }
  }

  if (validationIssues.length > 0) {
     return {
      message: 'Invalid form data. Please check your answers.',
      fields: rawFields,
      issues: validationIssues,
      success: false,
      surveyId,
    };
  }


  // Process and structure answers
  for (const question of survey.questions) {
    const fieldName = `question_${question.id}`;
    if (question.type === 'multiple-choice') {
      const selectedValues: string[] = [];
      question.options?.forEach(opt => {
        if (formData.get(`${fieldName}_${opt.value}`)) {
          selectedValues.push(opt.value);
        }
      });
      if (selectedValues.length > 0 || !question.isRequired) {
        answers.push({ questionId: question.id, value: selectedValues });
      }
    } else {
      const value = formData.get(fieldName);
      if (value !== null && (value !== '' || !question.isRequired)) {
        answers.push({ 
            questionId: question.id, 
            value: question.type === 'rating' ? Number(value) : (value as string)
        });
      }
    }
  }

  const surveyResponse: SurveyResponseInput = {
    surveyId,
    answers,
    // userId: 'mockUserId', // TODO: Integrate with actual auth if needed
  };

  // --- Mock Submission ---
  console.log('Survey Response Submitted:', JSON.stringify(surveyResponse, null, 2));
  // In a real app, you would save this to your database (e.g., MongoDB)
  // Example: await db.collection('surveyResponses').insertOne({ ...surveyResponse, submittedAt: new Date() });
  // --- End Mock Submission ---

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: 'Your survey responses have been submitted successfully!',
    success: true,
    surveyId,
  };
}

'use server';

import { generateStudySchedule, type GenerateStudyScheduleInput, type GenerateStudyScheduleOutput } from '@/ai/flows/generate-study-schedule';
import { z } from 'zod';

const StudyPlannerSchema = z.object({
  courseDeadlines: z.string().min(1, "Course deadlines are required."),
  studyTimeAvailability: z.string().min(1, "Study time availability is required."),
  preferredDifficultyLevel: z.enum(['easy', 'medium', 'hard']),
});

export type StudyPlannerFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  studySchedule?: string;
};

export async function createStudyScheduleAction(
  prevState: StudyPlannerFormState,
  formData: FormData
): Promise<StudyPlannerFormState> {
  const validatedFields = StudyPlannerSchema.safeParse({
    courseDeadlines: formData.get('courseDeadlines'),
    studyTimeAvailability: formData.get('studyTimeAvailability'),
    preferredDifficultyLevel: formData.get('preferredDifficultyLevel'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      fields: Object.fromEntries(formData.entries()) as Record<string, string>,
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const input: GenerateStudyScheduleInput = validatedFields.data;
    const result: GenerateStudyScheduleOutput = await generateStudySchedule(input);
    
    return {
      message: 'Study schedule generated successfully!',
      studySchedule: result.studySchedule,
    };
  } catch (error) {
    console.error('Error generating study schedule:', error);
    return {
      message: 'Failed to generate study schedule. Please try again.',
      fields: validatedFields.data,
      issues: ['An unexpected error occurred.'],
    };
  }
}

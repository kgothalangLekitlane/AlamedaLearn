
'use client';

import type { Survey, SurveyQuestion, SurveyQuestionOption } from '@/lib/types';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitSurveyAction, type SurveyFormState } from '@/app/surveys/_actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SurveyFormProps {
  survey: Survey;
}

const initialState: SurveyFormState = {
  message: '',
  success: false,
};

function SubmitButton({disabled}: {disabled?: boolean}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      {pending ? 'Submitting...' : 'Submit Survey'}
    </Button>
  );
}

export default function SurveyForm({ survey }: SurveyFormProps) {
  const [state, formAction] = useActionState(submitSurveyAction, initialState);
  const { toast } = useToast();
  // Store answers in local state to handle dynamic form updates if needed
  // For Server Actions with FormData, this is less critical for simple cases
  // but good for complex client-side validation or previews.
  const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Survey Submitted",
          description: state.message,
          variant: "default",
        });
        // Optionally reset form or redirect
        // For now, just clear local answers if used, actual form reset would need ref or re-render
        setAnswers({});
      } else {
         toast({
          title: "Submission Error",
          description: state.message || "An error occurred.",
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  const renderQuestion = (question: SurveyQuestion) => {
    const questionName = `question_${question.id}`;
    switch (question.type) {
      case 'text':
        return (
          <Textarea
            id={question.id}
            name={questionName}
            placeholder="Your answer here..."
            rows={3}
            required={question.isRequired}
            disabled={!survey.isActive || state.success}
          />
        );
      case 'single-choice':
      case 'yes-no':
        const options = question.type === 'yes-no' ? 
            [
                {id: `${question.id}-yes`, value: 'yes', label: 'Yes'},
                {id: `${question.id}-no`, value: 'no', label: 'No'}
            ] 
            : question.options;
        return (
          <RadioGroup 
            name={questionName} 
            required={question.isRequired}
            disabled={!survey.isActive || state.success}
          >
            {options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id} className="font-normal">{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'multiple-choice':
        return (
          <div>
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={option.id}
                  name={`${questionName}_${option.value}`} // Unique name for each checkbox
                  value={option.value}
                  disabled={!survey.isActive || state.success}
                />
                <Label htmlFor={option.id} className="font-normal">{option.label}</Label>
              </div>
            ))}
          </div>
        );
      case 'rating':
        const ratingOptions = [];
        for (let i = question.minRating || 1; i <= (question.maxRating || 5); i++) {
          ratingOptions.push({ value: i.toString(), label: i.toString() });
        }
        return (
            <div className="space-y-2">
                <Select 
                    name={questionName} 
                    required={question.isRequired}
                    disabled={!survey.isActive || state.success}
                >
                    <SelectTrigger id={question.id}>
                    <SelectValue placeholder={`Select a rating (${question.minRating}-${question.maxRating})`} />
                    </SelectTrigger>
                    <SelectContent>
                    {ratingOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                {question.ratingLabels && (
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                        <span>{question.ratingLabels.min}</span>
                        <span>{question.ratingLabels.max}</span>
                    </div>
                )}
          </div>
        );
      default:
        return <p>Unsupported question type.</p>;
    }
  };

  if (state.success) {
     return (
      <Card className="shadow-xl border-success bg-success/10">
        <CardHeader>
          <CardTitle className="text-2xl text-success flex items-center">
            <CheckCircle className="h-6 w-6 mr-2" /> Thank You!
          </CardTitle>
          <CardDescription>{state.message}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your feedback has been successfully submitted. We appreciate you taking the time.</p>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{survey.title}</CardTitle>
        <CardDescription>{survey.description}</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <input type="hidden" name="surveyId" value={survey.id} />
        <CardContent className="space-y-8">
          {survey.questions.map((question, index) => (
            <div key={question.id} className="space-y-3 p-4 border rounded-lg shadow-sm bg-card">
              <Label htmlFor={question.id} className="text-base font-semibold flex items-center">
                {index + 1}. {question.text}
                {question.isRequired && <span className="text-destructive ml-1">*</span>}
              </Label>
              {renderQuestion(question)}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton disabled={!survey.isActive}/>
           {state.message && !state.success && state.issues && state.issues.length > 0 && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside">
                  {state.issues.map((issue, idx) => <li key={idx}>{issue}</li>)}
                </ul>
                 {state.message !== 'Invalid form data.' && <p className="mt-2">{state.message}</p>}
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

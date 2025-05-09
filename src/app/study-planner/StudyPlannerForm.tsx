
'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { createStudyScheduleAction, type StudyPlannerFormState } from './_actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const initialState: StudyPlannerFormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Generate Schedule
    </Button>
  );
}

export default function StudyPlannerForm() {
  const [state, formAction] = useActionState(createStudyScheduleAction, initialState);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">AI Study Planner</CardTitle>
          <CardDescription>
            Let our AI help you create a personalized study schedule. Fill in your details below.
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subjectDeadlines" className="text-base">Subject Deadlines</Label> {/* Renamed from courseDeadlines */}
              <Textarea
                id="subjectDeadlines" // Renamed from courseDeadlines
                name="subjectDeadlines" // Renamed from courseDeadlines
                placeholder="e.g., Mathematics: 2024-11-15, Physical Sciences: 2024-10-30" // Example can remain similar
                rows={4}
                required
                defaultValue={state.fields?.subjectDeadlines} // Renamed from courseDeadlines
                className="text-base"
              />
              <p className="text-xs text-muted-foreground">
                List subject names and their deadlines (YYYY-MM-DD), one per line or comma-separated. {/* Updated text */}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studyTimeAvailability" className="text-base">Study Time Availability</Label>
              <Textarea
                id="studyTimeAvailability"
                name="studyTimeAvailability"
                placeholder="e.g., Monday: 18:00-20:00, Wednesday: 19:00-21:00, Saturday: 10:00-14:00"
                rows={4}
                required
                defaultValue={state.fields?.studyTimeAvailability}
                className="text-base"
              />
              <p className="text-xs text-muted-foreground">
                Specify days and times you are free to study.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDifficultyLevel" className="text-base">Preferred Difficulty Level</Label>
              <Select name="preferredDifficultyLevel" defaultValue={state.fields?.preferredDifficultyLevel || "medium"} required>
                <SelectTrigger id="preferredDifficultyLevel" className="text-base">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Choose how challenging you want your study plan to be.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <SubmitButton />
            {state.issues && state.issues.length > 0 && (
              <Alert variant="destructive" className="w-full">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside">
                    {state.issues.map((issue, index) => <li key={index}>{issue}</li>)}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </form>
      </Card>

      {state.message && !state.studySchedule && state.message !== 'Invalid form data.' && (
         <Alert variant={state.issues ? "destructive" : "default"} className="w-full">
            {state.issues ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertTitle>{state.issues ? "Error" : "Status"}</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
      )}

      {state.studySchedule && (
        <Card className="shadow-xl mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-success flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" /> Your Personalized Study Schedule
            </CardTitle>
            <CardDescription>{state.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm leading-relaxed font-mono">
              {state.studySchedule}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

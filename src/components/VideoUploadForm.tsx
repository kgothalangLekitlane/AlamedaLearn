
'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef, useState } from 'react';
import { uploadVideoAction, type VideoUploadFormState } from '@/app/profile/_actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, UploadCloud } from 'lucide-react';
import { mockCourses } from '@/lib/mockData'; // To get subject and grade lists
import { useToast } from '@/hooks/use-toast';


const initialState: VideoUploadFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
      {pending ? 'Uploading...' : 'Upload Video'}
    </Button>
  );
}

export default function VideoUploadForm() {
  const [state, formAction] = useActionState(uploadVideoAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);

  const uniqueSubjects = Array.from(new Set(mockCourses.map(course => course.subject))).sort();
  const uniqueGrades = Array.from(new Set(mockCourses.map(course => course.grade))).sort();
  
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success",
          description: state.message,
          variant: "default",
        });
        formRef.current?.reset(); // Reset form on success
        setFileName(null);
      } else if (state.issues && state.issues.length > 0) {
        // Error already handled by form alert
      } else if (!state.success && state.message !== 'Invalid form data.'){
         toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Upload New Lesson Video</CardTitle>
        <CardDescription>
          Share your knowledge by uploading a video lesson.
        </CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Video Title</Label>
            <Input id="title" name="title" placeholder="e.g., Introduction to Algebra" required />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea id="description" name="description" placeholder="A brief overview of the video content." rows={3} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="subject">Subject</Label>
              <Select name="subject" required>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueSubjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="grade">Grade</Label>
              <Select name="grade" required>
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueGrades.map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="module">Module Name (Optional)</Label>
            <Input id="module" name="module" placeholder="e.g., Chapter 1: Basic Concepts" />
             <p className="text-xs text-muted-foreground">If this video belongs to a specific module.</p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="videoFile">Video File</Label>
            <Input 
              id="videoFile" 
              name="videoFile" 
              type="file" 
              accept="video/*" 
              required 
              onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
            />
            {fileName && <p className="text-xs text-muted-foreground mt-1">Selected: {fileName}</p>}
          </div>
           {state.issues && state.issues.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Please fix the following issues:</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside pl-4">
                    {state.issues.map((issue, index) => <li key={index}>{issue}</li>)}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}



'use server';

import { z } from 'zod';
import type { User } from '@/lib/types';

const VideoUploadSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  subject: z.string().min(1, "Subject is required."),
  grade: z.string().min(1, "Grade is required."),
  module: z.string().optional(), // For simplicity, making module optional or simple text
  // videoFile: typeof window === 'undefined' ? z.any() : z.instanceof(File).refine(file => file.size > 0, 'Video file is required.'),
  // File upload validation is tricky with server actions and Zod alone for client-side inference.
  // For now, we'll assume the file is handled and just take metadata.
});

export type VideoUploadFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success?: boolean;
};

export async function uploadVideoAction(
  prevState: VideoUploadFormState,
  formData: FormData
): Promise<VideoUploadFormState> {
  
  // console.log("FormData received in action:");
  // formData.forEach((value, key) => {
  //   console.log(key, value);
  // });

  const validatedFields = VideoUploadSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    subject: formData.get('subject'),
    grade: formData.get('grade'),
    module: formData.get('module'),
    // videoFile: formData.get('videoFile'), // This would be a File object
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      fields: Object.fromEntries(formData.entries()) as Record<string, string>,
      issues: validatedFields.error.issues.map((issue) => issue.message),
      success: false,
    };
  }
  
  const videoFile = formData.get('videoFile') as File | null;

  if (!videoFile || videoFile.size === 0) {
    return {
      message: 'Invalid form data.',
      fields: validatedFields.data,
      issues: ['Video file is required.'],
      success: false,
    };
  }

  // Mock video upload process
  console.log('Mock Uploading Video:', validatedFields.data.title);
  console.log('File name:', videoFile.name, 'File size:', videoFile.size, 'File type:', videoFile.type);


  // Simulate API call / storage
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real app, you would upload the file to a file storage service
  // and save the metadata (including the storage URL) to your database (e.g., MongoDB).
  // For example, linking it to the lesson, module, course, and uploader.

  return {
    message: `Video "${validatedFields.data.title}" (${videoFile.name}) uploaded successfully (mock).`,
    success: true,
  };
}


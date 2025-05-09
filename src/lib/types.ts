
export interface Lesson {
  id: string;
  title: string;
  contentType: 'video' | 'quiz' | 'resource' | 'text';
  content: string; // URL for video/resource, quiz questions (JSON string), or text content
  durationMinutes?: number; // Optional: Estimated time to complete the lesson
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress?: number; // Percentage, 0-100
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  grade: string; // e.g., "Grade 10", "Grade 11", "Grade 12"
  description: string;
  imageUrl: string;
  modules: Module[];
  progress?: number; // Percentage, 0-100
  instructor?: string; // Optional: Name of the instructor
  deadline?: string; // Optional: YYYY-MM-DD
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  subscribed: boolean;
  subscriptionTier?: 'monthly' | 'annual';
}

export interface Deadline {
  courseName: string;
  date: string; // YYYY-MM-DD
}


export interface Lesson {
  id: string;
  title: string;
  contentType: 'video' | 'quiz' | 'resource' | 'text';
  content: string; // URL for video/resource, quiz questions (JSON string), or text content
  durationMinutes?: number; // Optional: Estimated time to complete the lesson
  uploadedBy?: string; // Tutor's user ID
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
  // This type seems to be for general user profile, distinct from auth user.
  // Let's keep it for now, but auth will use a new User type.
  id: string;
  name: string;
  email: string;
  subscribed: boolean;
  subscriptionTier?: 'monthly' | 'annual';
}

export interface User {
  id: string;
  name: string;
  email: string;
  isTutor: boolean;
  bio?: string;
  profilePictureUrl?: string;
}

export interface Deadline {
  courseName: string;
  date: string; // YYYY-MM-DD
}

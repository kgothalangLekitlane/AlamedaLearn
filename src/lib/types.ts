
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
  country?: string; // New
  province?: string; // New
  city?: string; // New
}

export interface Deadline {
  courseName: string;
  date: string; // YYYY-MM-DD
}

// Survey Types
export interface SurveyQuestionOption {
  id: string; // e.g. 'option1'
  value: string; // e.g. 'strongly_agree'
  label: string; // e.g. 'Strongly Agree'
}

export interface SurveyQuestion {
  id: string; // e.g., 'q1'
  text: string;
  type: 'multiple-choice' | 'single-choice' | 'text' | 'rating' | 'yes-no';
  options?: SurveyQuestionOption[]; // For multiple-choice, single-choice
  minRating?: number; // For rating (e.g., 1)
  maxRating?: number; // For rating (e.g., 5)
  ratingLabels?: { min: string; max: string }; // Optional labels for min/max rating
  isRequired?: boolean;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
  isActive: boolean; // To control if survey is open for responses
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface SurveyAnswer {
  questionId: string;
  // Value can be a single string (text, single-choice, rating, yes-no)
  // or an array of strings (multiple-choice)
  value: string | string[] | number;
}

export interface SurveyResponseInput {
  surveyId: string;
  answers: SurveyAnswer[];
  userId?: string; // Optional: if the user is logged in
}

export interface SurveyResponse extends SurveyResponseInput {
  id: string; // Unique ID for the response
  submittedAt: string; // ISO date string
}

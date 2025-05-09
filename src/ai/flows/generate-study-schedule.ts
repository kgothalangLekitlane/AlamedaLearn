
// use server'

/**
 * @fileOverview AI-powered study schedule generator.
 *
 * - generateStudySchedule - A function that generates a personalized study schedule.
 * - GenerateStudyScheduleInput - The input type for the generateStudySchedule function.
 * - GenerateStudyScheduleOutput - The return type for the generateStudySchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudyScheduleInputSchema = z.object({
  subjectDeadlines: z // Renamed from courseDeadlines
    .string()
    .describe(
      'A list of subject deadlines in the format: Subject Name: YYYY-MM-DD, Subject Name: YYYY-MM-DD.' // Updated description
    ),
  studyTimeAvailability: z
    .string()
    .describe(
      'Days of the week and times available for studying, e.g., Monday: 18:00-20:00, Tuesday: 19:00-21:00.'
    ),
  preferredDifficultyLevel: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The preferred difficulty level of the study schedule.'),
});
export type GenerateStudyScheduleInput = z.infer<
  typeof GenerateStudyScheduleInputSchema
>;

const GenerateStudyScheduleOutputSchema = z.object({
  studySchedule: z
    .string()
    .describe('A personalized study schedule based on the input parameters.'),
});
export type GenerateStudyScheduleOutput = z.infer<
  typeof GenerateStudyScheduleOutputSchema
>;

export async function generateStudySchedule(
  input: GenerateStudyScheduleInput
): Promise<GenerateStudyScheduleOutput> {
  return generateStudyScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudySchedulePrompt',
  input: {schema: GenerateStudyScheduleInputSchema},
  output: {schema: GenerateStudyScheduleOutputSchema},
  prompt: `You are a study schedule expert. Create a personalized study schedule for the user based on the following information:

Subject Deadlines: {{{subjectDeadlines}}}
Study Time Availability: {{{studyTimeAvailability}}}
Preferred Difficulty Level: {{{preferredDifficultyLevel}}}

Consider the subject deadlines, study time availability, and preferred difficulty level to create an optimized study schedule. The study schedule should be clear, concise, and easy to follow.
`, // Renamed Course Deadlines to Subject Deadlines and courseDeadlines to subjectDeadlines
});

const generateStudyScheduleFlow = ai.defineFlow(
  {
    name: 'generateStudyScheduleFlow',
    inputSchema: GenerateStudyScheduleInputSchema,
    outputSchema: GenerateStudyScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

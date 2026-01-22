import { z } from 'zod';

/**
 * Validation schema for review submission
 */
export const reviewSchema = z.object({
  classId: z.string().min(1, 'Class ID is required'),
  authorName: z
    .string()
    .max(50, 'Name must be under 50 characters')
    .optional()
    .or(z.literal('')),
  metrics: z.object({
    difficulty: z
      .number()
      .min(1, 'Difficulty must be at least 1')
      .max(10, 'Difficulty cannot exceed 10'),
    hoursPerWeek: z
      .number()
      .min(0, 'Hours must be positive')
      .max(30, 'Hours cannot exceed 30'),
    learningStyle: z
      .object({
        memorization: z.number().min(0).max(100),
        practice: z.number().min(0).max(100),
        projects: z.number().min(0).max(100),
      })
      .refine((data) => data.memorization + data.practice + data.projects === 100, {
        message: 'Learning style percentages must sum to 100',
      }),
    assessmentMix: z
      .object({
        tests: z.number().min(0).max(100),
        essays: z.number().min(0).max(100),
        labs: z.number().min(0).max(100),
        presentations: z.number().min(0).max(100),
        homework: z.number().min(0).max(100),
        projects: z.number().min(0).max(100),
      })
      .refine(
        (data) => {
          const sum =
            data.tests +
            data.essays +
            data.labs +
            data.presentations +
            data.homework +
            data.projects;
          return sum === 100;
        },
        {
          message: 'Assessment mix percentages must sum to 100',
        }
      ),
    skillRequirements: z.object({
      timeManagement: z.number().min(1).max(10),
      writing: z.number().min(1).max(10),
      math: z.number().min(1).max(10),
      problemSolving: z.number().min(1).max(10),
      memorization: z.number().min(1).max(10),
      criticalThinking: z.number().min(1).max(10),
    }),
  }),
  responses: z.object({
    whoWouldThrive: z
      .string()
      .min(20, 'Please provide at least 20 characters')
      .max(500, 'Please keep under 500 characters'),
    whatSurprised: z
      .string()
      .min(20, 'Please provide at least 20 characters')
      .max(500, 'Please keep under 500 characters'),
    skillsThatMattered: z
      .string()
      .min(20, 'Please provide at least 20 characters')
      .max(500, 'Please keep under 500 characters'),
    additionalThoughts: z
      .string()
      .max(500, 'Please keep under 500 characters')
      .optional(),
  }),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;

import { z } from 'zod'

export const createTextQuestionInput = z.object({
  question: z.string(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  isNiche: z.boolean().optional(),
  answer: z.string(),
  incorrect1: z.string(),
  incorrect2: z.string(),
  incorrect3: z.string(),
  tags: z.array(z.string()).min(1),
})

export const patchTextQuestionInput = z.object({
  question: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  isNiche: z.boolean().optional(),
  answer: z.string().optional(),
  status: z.enum(['APPROVED', 'PENDING', 'REJECTED']).optional(),
  rejectionReason: z.string().optional(),
  incorrect1: z.string().optional(),
  incorrect2: z.string().optional(),
  incorrect3: z.string().optional(),
  userId: z.string().optional(),
  tags: z
    .array(
      z.object({
        id: z.string().optional(), // If present, it's an existing tag
        name: z.string()
      })
    )
    .optional()
})

import { z } from 'zod'

export const createTextQuestionInput = z.object({
  question: z.string(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  isNiche: z.boolean().optional(),
  answer: z.string(),
  falseOptions: z.array(z.string()).length(3),
  tags: z.array(z.string()).min(1)
})

export const patchTextQuestionInput = z.object({
  question: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).optional(),
  isNiche: z.boolean().optional(),
  answer: z.string().optional(),
  status: z.enum(['APPROVED', 'PENDING', 'REJECTED']).optional(),
  rejectionReason: z.string().optional(),
  falseOptions: z
    .array(
      z.object({
        id: z.string().optional(), // If present, it's an existing tag
        text: z.string()
      })
    )
    .optional(),

  tags: z
    .array(
      z.object({
        id: z.string().optional(), // If present, it's an existing tag
        name: z.string()
      })
    )
    .optional()
})

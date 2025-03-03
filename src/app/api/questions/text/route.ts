import { prisma } from '@/db'
import { createTextQuestionInput } from '@/validation/questions'
import { NextRequest } from 'next/server'
import { auth } from '../../../../../auth'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  const body = await request.json()
  //Only logged in users can post questions
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    return Response.json({ error: 'You must be logged in to create a question' }, { status: 401 })
  }

  const parsedQuestion = createTextQuestionInput.safeParse(body)
  if (parsedQuestion.success === false) {
    return Response.json({ error: parsedQuestion.error }, { status: 400 })
  }

  try {
    const newQuestion = await prisma.question.create({
      data: {
        userId: session.user.id,
        difficulty: parsedQuestion.data.difficulty,
        isNiche: parsedQuestion.data.isNiche,
        question: parsedQuestion.data.question,
        status: 'PENDING',
        type: 'TEXT',
        answer: parsedQuestion.data.answer,
        incorrect1: parsedQuestion.data.incorrect1,
        incorrect2: parsedQuestion.data.incorrect2,
        incorrect3: parsedQuestion.data.incorrect3,
        questionTags: {
          create: parsedQuestion.data.tags.map((tag) => ({
            tag: { connectOrCreate: { create: { name: tag }, where: { name: tag } } }
          }))
        }
      }
    })
    return Response.json({ newQuestion })
  } catch (e) {
    return Response.json({ error: 'An error occurred while creating the question' }, { status: 500 })
  }
}

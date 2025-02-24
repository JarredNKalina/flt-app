import { prisma } from '@/db'
import { createTextQuestionInput } from '@/validation/questions'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  //Only logged in users can post questions

  // if(!user) {
  //   return Response.json({ error: 'You must be logged in to create a question' }, { status: 401 })
  // }
  const parsedQuestion = createTextQuestionInput.safeParse(body)
  if (parsedQuestion.success === false) {
    return Response.json({ error: parsedQuestion.error }, { status: 400 })
  }

  try {
    const newQuestion = await prisma.question.create({
      data: {
        difficulty: parsedQuestion.data.difficulty,
        isNiche: parsedQuestion.data.isNiche,
        question: parsedQuestion.data.question,
        status: 'PENDING',
        type: 'TEXT',
        answer: { create: { text: parsedQuestion.data.answer } },
        falseTextOptions: {
          create: parsedQuestion.data.falseOptions.map((option) => ({
            answer: { create: { text: option } }
          }))
        },
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

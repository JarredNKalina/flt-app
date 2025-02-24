import { prisma } from '@/db'

import { Difficulty, Status } from '@prisma/client'

import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const statuses = searchParams.get('status')?.split(',')
  const difficulties = searchParams.get('difficulty')?.split(',')
  const isNiche = searchParams.get('isNiche')
  const tags = searchParams.get('tag')?.split(',')

  if (statuses && !statuses.every((status) => ['APPROVED', 'PENDING', 'REJECTED'].includes(status))) {
    return Response.json({ error: 'Invalid status' }, { status: 400 })
  }
  if (difficulties && !difficulties.every((difficulty) => ['EASY', 'MEDIUM', 'HARD'].includes(difficulty))) {
    return Response.json({ error: 'Invalid difficulty' }, { status: 400 })
  }
  if (isNiche && !['true', 'false'].includes(isNiche)) {
    return Response.json({ error: 'Invalid isNiche' }, { status: 400 })
  }

  function getStatus() {
    return statuses?.map((status) => status as Status)
  }

  function getDifficulty() {
    return difficulties?.map((difficulty) => difficulty as Difficulty)
  }

  function getIsNiche() {
    return isNiche === 'true'
  }

  function getTagNames() {
    return tags
  }

  try {
    const questions = await prisma.question.findMany({
      include: {
        answer: true,
        falseTextOptions: { include: { answer: true } },
        questionTags: { include: { tag: true } }
      },
      where: {
        isNiche: getIsNiche(),
        status: { in: getStatus() },
        difficulty: { in: getDifficulty() },
        questionTags: { some: { tag: { name: { in: getTagNames() } } } }
      }
    })

    const flattenedQuestions = questions.map((q) => ({
      id: q.id,
      question: q.question,
      difficulty: q.difficulty,
      isNiche: q.isNiche,
      type: q.type,
      status: q.status,
      answer: q.answer?.text, // Keep only answer text
      falseTextOptions: q.falseTextOptions.map((opt) => opt.answer.text), // Keep only answer IDs
      questionTags: q.questionTags.map((qt) => qt.tag.name) // Flatten tag names
    }))

    return Response.json({ questions: flattenedQuestions })
  } catch (e) {
    return Response.json({ error: 'An error occurred while fetching the questions' }, { status: 500 })
  }
}

import { prisma } from '@/db'

import { Difficulty, Status } from '@prisma/client'
import { headers } from 'next/headers'

import { type NextRequest } from 'next/server'
import { auth } from '../../../../auth'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const statuses = searchParams.get('status')?.split(',')
  const difficulties = searchParams.get('difficulty')?.split(',')
  const isNiche = searchParams.get('isNiche')
  const tags = searchParams.get('tag')?.split(',')
  const session = await auth.api.getSession({ headers: await headers() })

  if (statuses && !statuses.every((status) => ['APPROVED', 'PENDING', 'REJECTED'].includes(status))) {
    return Response.json({ error: 'Invalid status' }, { status: 400 })
  }
  if (difficulties && !difficulties.every((difficulty) => ['EASY', 'MEDIUM', 'HARD'].includes(difficulty))) {
    return Response.json({ error: 'Invalid difficulty' }, { status: 400 })
  }
  if (isNiche && !['true', 'false'].includes(isNiche)) {
    return Response.json({ error: 'Invalid isNiche' }, { status: 400 })
  }

  //if searching for any questions other than approved, user must be logged admin

  if (statuses && !statuses.every((status) => status === 'APPROVED') && (!session || session.user.role !== 'ADMIN')) {
    return Response.json({ error: 'Only admins can view questions that are not approved' }, { status: 403 })
  }

  function getStatus() {
    if (!statuses) return ['APPROVED'] as Status[]
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
      answer: q.answer,
      incorrect1: q.incorrect1,
      incorrect2: q.incorrect2,
      incorrect3: q.incorrect3,
      questionTags: q.questionTags.map((qt) => qt.tag.name) // Flatten tag names
    }))

    return Response.json({ questions: flattenedQuestions })
  } catch (e) {
    return Response.json({ error: 'An error occurred while fetching the questions' }, { status: 500 })
  }
}

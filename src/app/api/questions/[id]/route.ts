import { prisma } from '@/db'
import { patchTextQuestionInput } from '@/validation/questions'
import { Prisma } from '@prisma/client'

import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  if (Array.isArray(id)) {
    return Response.json({ error: 'Invalid id. Id cannot be an array' }, { status: 400 })
  }
  if (!id) {
    return Response.json({ error: 'Invalid id. Id cannot be undefined ' }, { status: 400 })
  }

  try {
    const question = await prisma.question.findUnique({
      where: { id },
      include: {
        answer: true,
        falseTextOptions: { include: { answer: true } },
        questionTags: { include: { tag: true } }
      }
    })
    return Response.json({ question })
  } catch (e) {
    return Response.json({ error: 'An error occurred while fetching the question' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const body = await request.json()
  const id = (await params).id

  const parsedQuestion = patchTextQuestionInput.safeParse(body)
  if (parsedQuestion.success === false) {
    return Response.json({ error: parsedQuestion.error }, { status: 400 })
  }

  // IF USER IS NOT AN ADMIN, THEY CANNOT UPDATE THE QUESTION

  // THE ONLY EXCEPTION IS IF THIS IS THE USERS QUESTION

  // if(user.id !== question.userId) {
  //   return Response.json({ error: 'You do not have permission to update this question' }, { status: 403 })
  // }

  //if(user.role !== 'ADMIN') {
  //  return Response.json({ error: 'Only admins or question owners can update questions' }, { status: 403 })
  //}

  if (Array.isArray(id)) {
    return Response.json({ error: 'Invalid id. Id cannot be an array' }, { status: 400 })
  }

  if (!id) {
    return Response.json({ error: 'Invalid id. Id cannot be undefined' }, { status: 400 })
  }

  const originalQuestion = await prisma.question.findUnique({
    where: { id },
    include: {
      questionTags: { include: { tag: true } }
    }
  })

  const parsedQuestionData = parsedQuestion.data

  const tags = parsedQuestion.data.tags
  const existingTagIds = originalQuestion?.questionTags.map((qt) => qt.tagId) || []
  const incomingTagIds = parsedQuestion.data.tags?.map((tag) => tag.id).filter(Boolean) || []

  // Find tags that need to be removed
  const tagsToRemove = existingTagIds.filter((id) => !incomingTagIds.includes(id))

  const updateData: Prisma.QuestionUpdateInput = {}

  if (tags) {
    updateData.questionTags = {
      deleteMany: tagsToRemove.map((id) => ({ tagId: id })), // Remove missing tags
      create: tags
        .filter((tag) => !tag.id) // Only create new ones
        .map((tag) => ({
          tag: { connectOrCreate: { where: { name: tag.name }, create: { name: tag.name } } }
        }))
    }
  }

  if (originalQuestion?.status !== 'REJECTED' && parsedQuestionData.rejectionReason) {
    return Response.json(
      { error: 'You cannot add a rejection reason to a question that is not rejected' },
      { status: 400 }
    )
  }
  if (parsedQuestionData.status) {
    // Only admins can update the status
    // if (user.role !== 'ADMIN') {
    //   return Response.json({ error: 'Only admins can update the status' }, { status: 403 })
    // }
    switch (parsedQuestionData.status) {
      case 'APPROVED':
        updateData.status = parsedQuestionData.status
        updateData.rejections = { deleteMany: {} }
        break
      case 'PENDING':
        return Response.json({ error: 'You cannot update the status to PENDING' }, { status: 400 })
      case 'REJECTED':
        if (!parsedQuestionData.rejectionReason) {
          return Response.json({ error: 'Rejection reason is required when rejecting a question' }, { status: 400 })
        }
        updateData.rejections = {
          create: {
            reason: parsedQuestionData.rejectionReason
          }
        }
        updateData.status = parsedQuestionData.status
        break
    }
  }

  if (parsedQuestionData.question) updateData.question = parsedQuestionData.question
  if (parsedQuestionData.difficulty) updateData.difficulty = parsedQuestionData.difficulty
  if (parsedQuestionData.isNiche !== undefined) updateData.isNiche = parsedQuestionData.isNiche
  if (parsedQuestionData.answer) updateData.answer = { update: { text: parsedQuestionData.answer } }

  try {
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: updateData,
      include: {
        answer: true,
        falseTextOptions: { include: { answer: true } },
        questionTags: { include: { tag: true } },
        rejections: true
      }
    })
    return Response.json({ updatedQuestion })
  } catch (e) {
    return Response.json({ error: 'An error occurred while updating the question' }, { status: 500 })
  }
}

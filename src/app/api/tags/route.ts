import { prisma } from '@/db'

import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const tags = await prisma.tag.findMany({
      where: { questionTags: { some: { question: { status: 'APPROVED' } } } },
      include: {
        _count: {
          select: {
            questionTags: { where: { question: { status: 'APPROVED' } } }
          }
        },
      }
    })

    const flattenedTags = tags.map((tag) => {
      return {
        id: tag.id,
        name: tag.name,
        approvedQuestionCount: tag._count.questionTags

      }
    })

    return Response.json({ flattenedTags })
  } catch (e) {
    return Response.json({ error: 'An error occurred while fetching the questions' }, { status: 500 })
  }
}

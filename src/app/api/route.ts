import { prisma } from '@/db'
import { type NextRequest } from 'next/server'

export function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  // query is "hello" for /api/search?query=hello

  prisma.tag
  console.log({ query })
  return Response.json(query)
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@user.com',
      name: 'admin',
      role: 'ADMIN',
      emailVerified: true
    }
  })
  const question1 = await prisma.question.create({
    data: {
      question: 'Which Italian artist shocked 1485 Florence with his large nude painting of the birth of a goddess?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'EASY',
      status: 'REJECTED',
      rejections: { createMany: { data: [{ reason: 'The answer is incorrect.', userId: adminUser.id }] } },
      answer: 'Al Pacino',
      incorrect1: 'Leonardo Da Vinci',
      incorrect2: 'Michelangelo',
      incorrect3: 'Donatello',
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: '15th century art' }, where: { name: '15th century art' } } } },
          { tag: { connectOrCreate: { create: { name: 'renaissance' }, where: { name: 'renaissance' } } } },
          { tag: { connectOrCreate: { create: { name: 'art' }, where: { name: 'art' } } } }
        ]
      },
      userId: adminUser.id
    }
  })

  const question2 = await prisma.question.create({
    data: {
      question: "What does the word 'rot' mean in German?",
      type: 'TEXT',
      isNiche: false,
      difficulty: 'MEDIUM',
      status: 'APPROVED',
      answer: 'Red',
      incorrect1: 'Nine',
      incorrect2: 'Dog',
      incorrect3: 'Submarine',
      userId: adminUser.id,
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'language' }, where: { name: 'language' } } } },
          { tag: { connectOrCreate: { create: { name: 'german' }, where: { name: 'german' } } } },
          { tag: { connectOrCreate: { create: { name: 'translation' }, where: { name: 'translation' } } } }
        ]
      }
    }
  })

  const question3 = await prisma.question.create({
    data: {
      question: 'What crime could be considered if someone is hanging out in public for no good reason?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'EASY',
      status: 'APPROVED',
      answer: 'Loitering',
      incorrect1: 'Jaywalking',
      incorrect2: 'Vandalism',
      incorrect3: 'Shoplifting',
      userId: adminUser.id,
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'crime' }, where: { name: 'crime' } } } },
          { tag: { connectOrCreate: { create: { name: 'law' }, where: { name: 'law' } } } },
          { tag: { connectOrCreate: { create: { name: 'society' }, where: { name: 'society' } } } }
        ]
      }
    }
  })

  const question4 = await prisma.question.create({
    data: {
      question: "Which pasta's name means 'little ribbons'?",
      type: 'TEXT',
      isNiche: false,
      difficulty: 'HARD',
      status: 'APPROVED',

      answer: 'Fettuccine',
      incorrect1: 'Orecchiette',
      incorrect2: 'Lasagne',
      incorrect3: 'Cavatappi',
      userId: adminUser.id,
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'food' }, where: { name: 'food' } } } },
          { tag: { connectOrCreate: { create: { name: 'words' }, where: { name: 'words' } } } },
          { tag: { connectOrCreate: { create: { name: 'language' }, where: { name: 'language' } } } }
        ]
      }
    }
  })

  const question5 = await prisma.question.create({
    data: {
      question: 'Which element has the chemical symbol "Au"?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'EASY',
      status: 'APPROVED',
      answer: 'Gold',
      incorrect1: 'Silver',
      incorrect2: 'Copper',
      incorrect3: 'Aluminum',
      userId: adminUser.id,
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'chemistry' }, where: { name: 'chemistry' } } } },
          { tag: { connectOrCreate: { create: { name: 'periodic table' }, where: { name: 'periodic table' } } } },
          { tag: { connectOrCreate: { create: { name: 'elements' }, where: { name: 'elements' } } } }
        ]
      }
    }
  })

  const question6 = await prisma.question.create({
    data: {
      question: 'Who painted the ceiling of the Sistine Chapel?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'MEDIUM',
      status: 'APPROVED',
      answer: 'Michelangelo',
      incorrect1: 'Leonardo Da Vinci',
      incorrect2: 'Raphael',
      incorrect3: 'Caravaggio',
      userId: adminUser.id,
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'renaissance' }, where: { name: 'renaissance' } } } },
          { tag: { connectOrCreate: { create: { name: 'art history' }, where: { name: 'art history' } } } },
          { tag: { connectOrCreate: { create: { name: 'famous painters' }, where: { name: 'famous painters' } } } }
        ]
      }
    }
  })

  const question7 = await prisma.question.create({
    data: {
      question: 'Which planet is known as the Red Planet?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'EASY',
      status: 'PENDING',
      answer: 'Mars',
      incorrect1: 'Venus',
      incorrect2: 'Jupiter',
      incorrect3: 'Saturn',
      userId: adminUser.id,
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'space' }, where: { name: 'space' } } } },
          { tag: { connectOrCreate: { create: { name: 'planets' }, where: { name: 'planets' } } } },
          { tag: { connectOrCreate: { create: { name: 'astronomy' }, where: { name: 'astronomy' } } } }
        ]
      }
    }
  })

  const question8 = await prisma.question.create({
    data: {
      question: 'What is the capital city of Canada?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'MEDIUM',
      status: 'REJECTED',
      rejections: { createMany: { data: [{ reason: 'Question is too easy', userId: adminUser.id }] } },
      answer: 'Ottawa',
      incorrect1: 'Toronto',
      incorrect2: 'Vancouver',
      incorrect3: 'Montreal',
      userId: adminUser.id,
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'countries' }, where: { name: 'countries' } } } },
          { tag: { connectOrCreate: { create: { name: 'capitals' }, where: { name: 'capitals' } } } },
          { tag: { connectOrCreate: { create: { name: 'north america' }, where: { name: 'north america' } } } },
          { tag: { connectOrCreate: { create: { name: 'canada' }, where: { name: 'canada' } } } }
        ]
      }
    }
  })

  const question9 = await prisma.question.create({
    data: {
      question: 'In what year did the Titanic sink?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'HARD',
      status: 'APPROVED',
      answer: '1912',
      incorrect1: '1905',
      incorrect2: '1923',
      incorrect3: '1898',
      userId: adminUser.id,
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'maritime' }, where: { name: 'maritime' } } } },
          { tag: { connectOrCreate: { create: { name: 'disasters' }, where: { name: 'disasters' } } } },
          { tag: { connectOrCreate: { create: { name: '20th century' }, where: { name: '20th century' } } } }
        ]
      }
    }
  })

  const question10 = await prisma.question.create({
    data: {
      question: 'Which U.S. status is known as the "Sunshine status"?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'EASY',
      status: 'PENDING',
      answer: 'Florida',
      incorrect1: 'California',
      incorrect2: 'Texas',
      incorrect3: 'Arizona',
      userId: adminUser.id,
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'statuss' }, where: { name: 'statuss' } } } },
          { tag: { connectOrCreate: { create: { name: 'nicknames' }, where: { name: 'nicknames' } } } }
        ]
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

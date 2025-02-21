import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const question1 = await prisma.question.create({
    data: {
      question: 'Which Italian artist shocked 1485 Florence with his large nude painting of the birth of a goddess?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'EASY',
      status: 'REJECTED',
      rejections: { createMany: { data: [{ reason: 'The answer is incorrect.' }] } },
      answer: { create: { text: 'Al Pacino ' } },
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: '15th century art' }, where: { name: '15th century art' } } } },
          { tag: { connectOrCreate: { create: { name: 'renaissance' }, where: { name: 'renaissance' } } } },
          { tag: { connectOrCreate: { create: { name: 'art' }, where: { name: 'art' } } } }
        ]
      },
      falseTextOptions: {
        create: [
          { answer: { create: { text: 'Leonardo Da Vinci' } } },
          { answer: { create: { text: 'Michelangelo' } } },
          { answer: { create: { text: 'Donatello' } } }
        ]
      }
    }
  })

  const question2 = await prisma.question.create({
    data: {
      question: "What does the word 'rot' mean in German?",
      type: 'TEXT',
      isNiche: false,
      difficulty: 'MEDIUM',
      status: 'APPROVED',
      answer: { create: { text: 'Red' } },
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'language' }, where: { name: 'language' } } } },
          { tag: { connectOrCreate: { create: { name: 'german' }, where: { name: 'german' } } } },
          { tag: { connectOrCreate: { create: { name: 'translation' }, where: { name: 'translation' } } } }
        ]
      },
      falseTextOptions: {
        create: [
          { answer: { create: { text: 'Nine' } } },
          { answer: { create: { text: 'Dog' } } },
          { answer: { create: { text: 'Submarine' } } }
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
      answer: { create: { text: 'Loitering' } },
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'crime' }, where: { name: 'crime' } } } },
          { tag: { connectOrCreate: { create: { name: 'law' }, where: { name: 'law' } } } },
          { tag: { connectOrCreate: { create: { name: 'society' }, where: { name: 'society' } } } }
        ]
      },
      falseTextOptions: {
        create: [
          { answer: { create: { text: 'Jaywalking' } } },
          { answer: { create: { text: 'Vandalism' } } },
          { answer: { create: { text: 'Shoplifting' } } }
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
      answer: { create: { text: 'Fettuccine' } },
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'food' }, where: { name: 'food' } } } },
          { tag: { connectOrCreate: { create: { name: 'words' }, where: { name: 'words' } } } },
          { tag: { connectOrCreate: { create: { name: 'language' }, where: { name: 'language' } } } }
        ]
      },
      falseTextOptions: {
        create: [
          { answer: { create: { text: 'Orecchiette' } } },
          { answer: { create: { text: 'Lasagne' } } },
          { answer: { create: { text: 'Cavatappi' } } }
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
      answer: { create: { text: 'Gold' } },
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'chemistry' }, where: { name: 'chemistry' } } } },
          { tag: { connectOrCreate: { create: { name: 'periodic table' }, where: { name: 'periodic table' } } } },
          { tag: { connectOrCreate: { create: { name: 'elements' }, where: { name: 'elements' } } } }
        ]
      },
      falseTextOptions: {
        create: [
          { answer: { create: { text: 'Silver' } } },
          { answer: { create: { text: 'Copper' } } },
          { answer: { create: { text: 'Aluminum' } } }
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
      answer: { create: { text: 'Michelangelo' } },
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'renaissance' }, where: { name: 'renaissance' } } } },
          { tag: { connectOrCreate: { create: { name: 'art history' }, where: { name: 'art history' } } } },
          { tag: { connectOrCreate: { create: { name: 'famous painters' }, where: { name: 'famous painters' } } } }
        ]
      },
      falseTextOptions: {
        create: [
          { answer: { create: { text: 'Leonardo Da Vinci' } } },
          { answer: { create: { text: 'Raphael' } } },
          { answer: { create: { text: 'Caravaggio' } } }
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
      answer: { create: { text: 'Mars' } },
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'space' }, where: { name: 'space' } } } },
          { tag: { connectOrCreate: { create: { name: 'planets' }, where: { name: 'planets' } } } },
          { tag: { connectOrCreate: { create: { name: 'astronomy' }, where: { name: 'astronomy' } } } }
        ]
      },
      falseTextOptions: {
        create: [
          { answer: { create: { text: 'Venus' } } },
          { answer: { create: { text: 'Jupiter' } } },
          { answer: { create: { text: 'Saturn' } } }
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
      rejections: { createMany: { data: [{ reason: 'Question is too easy' }] } },
      answer: { create: { text: 'Ottawa' } },
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'countries' }, where: { name: 'countries' } } } },
          { tag: { connectOrCreate: { create: { name: 'capitals' }, where: { name: 'capitals' } } } },
          { tag: { connectOrCreate: { create: { name: 'north america' }, where: { name: 'north america' } } } },
          { tag: { connectOrCreate: { create: { name: 'canada' }, where: { name: 'canada' } } } }
        ]
      },
      falseTextOptions: {
        create: [
          { answer: { create: { text: 'Toronto' } } },
          { answer: { create: { text: 'Vancouver' } } },
          { answer: { create: { text: 'Montreal' } } }
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
      answer: { create: { text: '1912' } },
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'maritime' }, where: { name: 'maritime' } } } },
          { tag: { connectOrCreate: { create: { name: 'disasters' }, where: { name: 'disasters' } } } },
          { tag: { connectOrCreate: { create: { name: '20th century' }, where: { name: '20th century' } } } }
        ]
      },
      falseTextOptions: {
        create: [
          { answer: { create: { text: '1905' } } },
          { answer: { create: { text: '1923' } } },
          { answer: { create: { text: '1898' } } }
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
      answer: { create: { text: 'Florida' } },
      questionTags: {
        create: [
          { tag: { connectOrCreate: { create: { name: 'statuss' }, where: { name: 'statuss' } } } },
          { tag: { connectOrCreate: { create: { name: 'nicknames' }, where: { name: 'nicknames' } } } }
        ]
      },
      falseTextOptions: {
        create: [
          { answer: { create: { text: 'California' } } },
          { answer: { create: { text: 'Texas' } } },
          { answer: { create: { text: 'Arizona' } } }
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

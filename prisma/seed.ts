import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { name: 'general_knowledge' },
      { name: 'entertainment' },
      { name: 'history' },
      { name: 'geography' },
      { name: 'sports' },
      { name: 'science' },
      { name: 'literature' },
      { name: 'food_and_drink' },
      { name: 'technology' },
      { name: 'culture' }
    ]
  })

  const question1 = await prisma.question.create({
    data: {
      question: 'Which Italian artist shocked 1485 Florence with his large nude painting of the birth of a goddess?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'EASY',
      isApproved: true,
      answer: { create: { text: 'Sandro Botticelli ' } },
      category: { connect: { name: 'culture' } },
      questionTags: {
        create: [
          { tag: { create: { name: '15th century art' } } },
          { tag: { create: { name: 'renaissance' } } },
          { tag: { create: { name: 'art' } } }
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
      isApproved: true,
      answer: { create: { text: 'Red' } },
      category: { connect: { name: 'culture' } },
      questionTags: {
        create: [
          { tag: { create: { name: 'language' } } },
          { tag: { create: { name: 'german' } } },
          { tag: { create: { name: 'translation' } } }
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
      isApproved: true,
      answer: { create: { text: 'Loitering' } },
      category: { connect: { name: 'culture' } },
      questionTags: {
        create: [
          { tag: { create: { name: 'crime' } } },
          { tag: { create: { name: 'law' } } },
          { tag: { create: { name: 'society' } } }
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
      isApproved: true,
      answer: { create: { text: 'Fettuccine' } },
      category: { connect: { name: 'food_and_drink' } },
      questionTags: {
        create: [
          { tag: { create: { name: 'food' } } },
          { tag: { create: { name: 'words' } } },
          { tag: { create: { name: 'language' } } }
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
      isApproved: true,
      answer: { create: { text: 'Gold' } },
      category: { connect: { name: 'science' } },
      questionTags: {
        create: [
          { tag: { create: { name: 'chemistry' } } },
          { tag: { create: { name: 'periodic table' } } },
          { tag: { create: { name: 'elements' } } }
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
      isApproved: true,
      answer: { create: { text: 'Michelangelo' } },
      category: { connect: { name: 'culture' } },
      questionTags: {
        create: [
          { tag: { create: { name: 'renaissance' } } },
          { tag: { create: { name: 'famous painters' } } },
          { tag: { create: { name: 'art history' } } }
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
      isApproved: true,
      answer: { create: { text: 'Mars' } },
      category: { connect: { name: 'science' } },
      questionTags: {
        create: [
          { tag: { create: { name: 'space' } } },
          { tag: { create: { name: 'planets' } } },
          { tag: { create: { name: 'astronomy' } } }
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
      isApproved: true,
      answer: { create: { text: 'Ottawa' } },
      category: { connect: { name: 'geography' } },
      questionTags: {
        create: [
          { tag: { create: { name: 'countries' } } },
          { tag: { create: { name: 'capitals' } } },
          { tag: { create: { name: 'north america' } } },
          { tag: { create: { name: 'canada' } } }
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
      isApproved: true,
      answer: { create: { text: '1912' } },
      category: { connect: { name: 'history' } },
      questionTags: {
        create: [
          { tag: { create: { name: 'maritime history' } } },
          { tag: { create: { name: 'famous disasters' } } },
          { tag: { create: { name: 'early 20th century' } } }
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
      question: 'Which U.S. state is known as the "Sunshine State"?',
      type: 'TEXT',
      isNiche: false,
      difficulty: 'EASY',
      isApproved: true,
      answer: { create: { text: 'Florida' } },
      category: { connect: { name: 'geography' } },
      questionTags: {
        create: [
          { tag: { create: { name: 'U.S. states' } } },
          { tag: { create: { name: 'nicknames' } } },
          { tag: { create: { name: 'travel' } } }
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

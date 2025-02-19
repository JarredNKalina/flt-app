import { PrismaClient } from '@prisma/client'
import express from 'express'

const PORT = process.env.PORT || 3000

const app = express()
const prisma = new PrismaClient()
app.use(express.json())

app.get('/', async (req, res) => {
  const tagCount = await prisma.tag.count()
  res.json(tagCount == 0 ? 'No tags have been added yet.' : 'Some users have been added to the database.')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

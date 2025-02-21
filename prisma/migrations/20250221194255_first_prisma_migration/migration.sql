-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'IMAGE');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "isNiche" BOOLEAN NOT NULL,
    "type" "QuestionType" NOT NULL,
    "answerId" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionTag" (
    "questionId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "QuestionTag_pkey" PRIMARY KEY ("questionId","tagId")
);

-- CreateTable
CREATE TABLE "FalseTextOption" (
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,

    CONSTRAINT "FalseTextOption_pkey" PRIMARY KEY ("questionId","answerId")
);

-- CreateTable
CREATE TABLE "FalseImageOption" (
    "questionId" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,

    CONSTRAINT "FalseImageOption_pkey" PRIMARY KEY ("questionId","answerId")
);

-- CreateTable
CREATE TABLE "TextOption" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "TextOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageOption" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "height" BIGINT NOT NULL,
    "width" BIGINT NOT NULL,
    "size" BIGINT NOT NULL,

    CONSTRAINT "ImageOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rejection" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Rejection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "TextOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTag" ADD CONSTRAINT "QuestionTag_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTag" ADD CONSTRAINT "QuestionTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FalseTextOption" ADD CONSTRAINT "FalseTextOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FalseTextOption" ADD CONSTRAINT "FalseTextOption_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "TextOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FalseImageOption" ADD CONSTRAINT "FalseImageOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FalseImageOption" ADD CONSTRAINT "FalseImageOption_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "ImageOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rejection" ADD CONSTRAINT "Rejection_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

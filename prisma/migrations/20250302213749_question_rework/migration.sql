/*
  Warnings:

  - You are about to drop the column `answerId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `FalseImageOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FalseTextOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TextOption` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incorrect1` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incorrect2` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incorrect3` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FalseImageOption" DROP CONSTRAINT "FalseImageOption_answerId_fkey";

-- DropForeignKey
ALTER TABLE "FalseImageOption" DROP CONSTRAINT "FalseImageOption_questionId_fkey";

-- DropForeignKey
ALTER TABLE "FalseTextOption" DROP CONSTRAINT "FalseTextOption_answerId_fkey";

-- DropForeignKey
ALTER TABLE "FalseTextOption" DROP CONSTRAINT "FalseTextOption_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_answerId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answerId",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "incorrect1" TEXT NOT NULL,
ADD COLUMN     "incorrect2" TEXT NOT NULL,
ADD COLUMN     "incorrect3" TEXT NOT NULL;

-- DropTable
DROP TABLE "FalseImageOption";

-- DropTable
DROP TABLE "FalseTextOption";

-- DropTable
DROP TABLE "ImageOption";

-- DropTable
DROP TABLE "TextOption";

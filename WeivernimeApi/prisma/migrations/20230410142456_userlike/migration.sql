/*
  Warnings:

  - Added the required column `userId` to the `likesAnalise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "likesAnalise" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "likesAnalise" ADD CONSTRAINT "likesAnalise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `imageUrl` to the `analise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "analise" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "analiseEp" (
    "id" SERIAL NOT NULL,
    "analiseId" INTEGER NOT NULL,
    "countEp" INTEGER,
    "rate" INTEGER,

    CONSTRAINT "analiseEp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "analiseEp" ADD CONSTRAINT "analiseEp_analiseId_fkey" FOREIGN KEY ("analiseId") REFERENCES "analise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

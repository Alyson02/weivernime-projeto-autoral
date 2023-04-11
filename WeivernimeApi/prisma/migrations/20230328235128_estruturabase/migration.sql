/*
  Warnings:

  - You are about to drop the column `pic` on the `user` table. All the data in the column will be lost.
  - Added the required column `foto` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "pic",
ADD COLUMN     "backgroundUrl" TEXT,
ADD COLUMN     "foto" TEXT NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "analise" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "notaGeral" INTEGER NOT NULL,
    "notaAbertura" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "analise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likesAnalise" (
    "id" SERIAL NOT NULL,
    "analiseId" INTEGER NOT NULL,
    "liked" BOOLEAN NOT NULL,

    CONSTRAINT "likesAnalise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personagensUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "foto" TEXT NOT NULL,

    CONSTRAINT "personagensUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "analise" ADD CONSTRAINT "analise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likesAnalise" ADD CONSTRAINT "likesAnalise_analiseId_fkey" FOREIGN KEY ("analiseId") REFERENCES "analise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personagensUser" ADD CONSTRAINT "personagensUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

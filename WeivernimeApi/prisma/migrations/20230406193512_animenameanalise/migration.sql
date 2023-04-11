/*
  Warnings:

  - Added the required column `animeName` to the `analise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "analise" ADD COLUMN     "animeName" TEXT NOT NULL;

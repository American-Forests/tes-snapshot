/*
  Warnings:

  - Added the required column `incorpname` to the `Municipality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Municipality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Municipality" ADD COLUMN     "incorpname" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

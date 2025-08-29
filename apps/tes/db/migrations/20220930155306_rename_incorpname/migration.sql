/*
  Warnings:

  - You are about to drop the column `incorpname` on the `Municipality` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Municipality" DROP COLUMN "incorpname",
ADD COLUMN     "incorporated_place_name" TEXT;

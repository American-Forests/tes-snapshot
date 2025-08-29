/*
  Warnings:

  - You are about to drop the column `extent` on the `Area` table. All the data in the column will be lost.
  - You are about to drop the column `extent` on the `Blockgroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Area" DROP COLUMN "extent";

-- AlterTable
ALTER TABLE "Blockgroup" DROP COLUMN "extent";

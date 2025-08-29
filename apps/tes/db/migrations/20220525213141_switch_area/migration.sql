/*
  Warnings:

  - You are about to drop the column `sidewalk` on the `Blockgroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "sidewalk" BOOLEAN;

-- AlterTable
ALTER TABLE "Blockgroup" DROP COLUMN "sidewalk";

/*
  Warnings:

  - You are about to drop the column `center` on the `Municipality` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "municipality_center_idx";

-- AlterTable
ALTER TABLE "Municipality" DROP COLUMN "center";

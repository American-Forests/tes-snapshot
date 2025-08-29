/*
  Warnings:

  - You are about to drop the column `poc_proportion` on the `NeighborhoodLike` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NeighborhoodLike" DROP COLUMN "poc_proportion",
ADD COLUMN     "minority_ethnic_group_proportion" DOUBLE PRECISION;

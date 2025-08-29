/*
  Warnings:

  - Added the required column `treesDeciduousSmall` to the `RightOfWayOnPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RightOfWayOnPlan" ADD COLUMN     "treesDeciduousSmall" INTEGER NOT NULL;

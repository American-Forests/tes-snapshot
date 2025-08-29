/*
  Warnings:

  - Added the required column `equity_index` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tree_canopy_gap_max` to the `Blockgroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blockgroup" ADD COLUMN     "equity_index" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tree_canopy_gap_max" DOUBLE PRECISION NOT NULL;

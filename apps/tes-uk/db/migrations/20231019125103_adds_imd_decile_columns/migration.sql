/*
  Warnings:

  - Added the required column `employment_rank_decile` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `health_rank_decile` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income_rank_decile` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NeighborhoodLike" ADD COLUMN     "employment_rank_decile" INTEGER NOT NULL,
ADD COLUMN     "health_rank_decile" INTEGER NOT NULL,
ADD COLUMN     "income_rank_decile" INTEGER NOT NULL;

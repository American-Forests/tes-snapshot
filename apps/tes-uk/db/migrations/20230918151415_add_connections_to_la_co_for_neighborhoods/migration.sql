/*
  Warnings:

  - Added the required column `constituency_id` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locality_id` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NeighborhoodLike" ADD COLUMN     "constituency_id" TEXT NOT NULL,
ADD COLUMN     "locality_id" TEXT NOT NULL;

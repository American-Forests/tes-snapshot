/*
  Warnings:

  - You are about to drop the column `country` on the `NeighborhoodLike` table. All the data in the column will be lost.
  - Added the required column `country_id` to the `NeighborhoodLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NeighborhoodLike" DROP COLUMN "country",
ADD COLUMN     "country_id" TEXT NOT NULL;

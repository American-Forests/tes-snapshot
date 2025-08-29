/*
  Warnings:

  - You are about to drop the column `air_pollution_normalized` on the `NeighborhoodLike` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NeighborhoodLike" DROP COLUMN "air_pollution_normalized",
ADD COLUMN     "no2_average" DOUBLE PRECISION,
ADD COLUMN     "no2_normalized" DOUBLE PRECISION,
ADD COLUMN     "pm25_average" DOUBLE PRECISION,
ADD COLUMN     "pm25_normalized" DOUBLE PRECISION,
ADD COLUMN     "region" TEXT;

/*
  Warnings:

  - Made the column `geom` on table `Area` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Area" ALTER COLUMN "geom" SET NOT NULL;

-- CreateIndex
CREATE INDEX "area_idx" ON "Area"("geom");

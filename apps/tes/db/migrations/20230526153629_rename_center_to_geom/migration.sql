/*
  Warnings:

  - You are about to drop the column `center` on the `CongressionalDistrict` table. All the data in the column will be lost.
  - You are about to drop the column `center` on the `State` table. All the data in the column will be lost.
  - Added the required column `geom` to the `CongressionalDistrict` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geom` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "congressional_district_idx";

-- DropIndex
DROP INDEX "state_idx";

-- AlterTable
ALTER TABLE "CongressionalDistrict" DROP COLUMN "center",
ADD COLUMN     "geom" geometry(Point, 4326) NOT NULL;

-- AlterTable
ALTER TABLE "State" DROP COLUMN "center",
ADD COLUMN     "geom" geometry(Point, 4326) NOT NULL;

-- CreateIndex
CREATE INDEX "congressional_district_idx" ON "CongressionalDistrict" USING GIST ("geom");

-- CreateIndex
CREATE INDEX "state_idx" ON "State" USING GIST ("geom");

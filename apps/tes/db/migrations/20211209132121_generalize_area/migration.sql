/*
  Warnings:

  - You are about to drop the `RightOfWay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RightOfWayOnScenario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AreaType" AS ENUM ('RIGHT_OF_WAY');

-- DropForeignKey
ALTER TABLE "RightOfWayOnScenario" DROP CONSTRAINT "RightOfWayOnScenario_rightOfWayId_fkey";

-- DropForeignKey
ALTER TABLE "RightOfWayOnScenario" DROP CONSTRAINT "RightOfWayOnScenario_scenarioId_fkey";

-- DropTable
DROP TABLE "RightOfWay";

-- DropTable
DROP TABLE "RightOfWayOnScenario";

-- CreateTable
CREATE TABLE "AreaOnScenario" (
    "scenarioId" INTEGER NOT NULL,
    "areaId" INTEGER NOT NULL,
    "treesDeciduousSmall" INTEGER NOT NULL DEFAULT 0,
    "treesDeciduousMedium" INTEGER NOT NULL DEFAULT 0,
    "treesDeciduousLarge" INTEGER NOT NULL DEFAULT 0,
    "treesBroadleafSmall" INTEGER NOT NULL DEFAULT 0,
    "treesBroadleafMedium" INTEGER NOT NULL DEFAULT 0,
    "treesBroadleafLarge" INTEGER NOT NULL DEFAULT 0,
    "treesConiferousSmall" INTEGER NOT NULL DEFAULT 0,
    "treesConiferousMedium" INTEGER NOT NULL DEFAULT 0,
    "treesConiferousLarge" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AreaOnScenario_pkey" PRIMARY KEY ("scenarioId","areaId")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" INTEGER NOT NULL,
    "type" "AreaType" NOT NULL,
    "treeCanopy" DOUBLE PRECISION NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "plantableArea" DOUBLE PRECISION NOT NULL,
    "geom" geometry(Polygon, 4326) NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "right_of_way_idx" ON "Area"("geom");

-- AddForeignKey
ALTER TABLE "AreaOnScenario" ADD CONSTRAINT "AreaOnScenario_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AreaOnScenario" ADD CONSTRAINT "AreaOnScenario_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RightOfWayOnPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_userId_fkey";

-- DropForeignKey
ALTER TABLE "RightOfWayOnPlan" DROP CONSTRAINT "RightOfWayOnPlan_planId_fkey";

-- DropForeignKey
ALTER TABLE "RightOfWayOnPlan" DROP CONSTRAINT "RightOfWayOnPlan_rightOfWayId_fkey";

-- DropTable
DROP TABLE "Plan";

-- DropTable
DROP TABLE "RightOfWayOnPlan";

-- CreateTable
CREATE TABLE "RightOfWayOnScenario" (
    "scenarioId" INTEGER NOT NULL,
    "rightOfWayId" INTEGER NOT NULL,
    "treesDeciduousSmall" INTEGER NOT NULL DEFAULT 0,
    "treesDeciduousMedium" INTEGER NOT NULL DEFAULT 0,
    "treesDeciduousLarge" INTEGER NOT NULL DEFAULT 0,
    "treesBroadleafSmall" INTEGER NOT NULL DEFAULT 0,
    "treesBroadleafMedium" INTEGER NOT NULL DEFAULT 0,
    "treesBroadleafLarge" INTEGER NOT NULL DEFAULT 0,
    "treesConiferousSmall" INTEGER NOT NULL DEFAULT 0,
    "treesConiferousMedium" INTEGER NOT NULL DEFAULT 0,
    "treesConiferousLarge" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RightOfWayOnScenario_pkey" PRIMARY KEY ("scenarioId","rightOfWayId")
);

-- CreateTable
CREATE TABLE "Scenario" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RightOfWayOnScenario" ADD CONSTRAINT "RightOfWayOnScenario_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES "Scenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RightOfWayOnScenario" ADD CONSTRAINT "RightOfWayOnScenario_rightOfWayId_fkey" FOREIGN KEY ("rightOfWayId") REFERENCES "RightOfWay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `Area` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AreaOnScenario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AreaOnScenario" DROP CONSTRAINT "AreaOnScenario_areaId_fkey";

-- AlterTable
ALTER TABLE "Area" DROP CONSTRAINT "Area_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Area_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "AreaOnScenario" DROP CONSTRAINT "AreaOnScenario_pkey",
ALTER COLUMN "areaId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AreaOnScenario_pkey" PRIMARY KEY ("scenarioId", "areaId");

-- AddForeignKey
ALTER TABLE "AreaOnScenario" ADD CONSTRAINT "AreaOnScenario_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

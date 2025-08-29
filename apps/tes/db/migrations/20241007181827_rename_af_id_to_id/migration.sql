/*
  Warnings:

  - The primary key for the `Area` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `af_id` on the `Area` table. All the data in the column will be lost.
  - Added the required column `id` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AreaOnScenario" DROP CONSTRAINT "AreaOnScenario_areaId_fkey";

-- AlterTable
ALTER TABLE "Area" DROP CONSTRAINT "Area_pkey",
DROP COLUMN "af_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Area_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "AreaOnScenario" ADD CONSTRAINT "AreaOnScenario_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

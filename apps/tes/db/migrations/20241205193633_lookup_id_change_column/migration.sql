/*
  Warnings:

  - You are about to drop the column `geoid_change` on the `BlockgroupOnScenario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlockgroupOnScenario" DROP COLUMN "geoid_change",
ADD COLUMN     "lookup_id_change" BOOLEAN;

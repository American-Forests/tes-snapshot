/*
  Warnings:

  - You are about to drop the column `forest_health` on the `BlockgroupSupplemental` table. All the data in the column will be lost.
  - You are about to drop the column `tribal` on the `BlockgroupSupplemental` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlockgroupSupplemental" DROP COLUMN "forest_health",
DROP COLUMN "tribal";

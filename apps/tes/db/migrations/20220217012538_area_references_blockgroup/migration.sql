/*
  Warnings:

  - Added the required column `blockgroupId` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "blockgroupId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_blockgroupId_fkey" FOREIGN KEY ("blockgroupId") REFERENCES "Blockgroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

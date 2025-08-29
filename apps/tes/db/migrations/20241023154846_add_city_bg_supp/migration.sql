/*
  Warnings:

  - You are about to drop the column `city` on the `Blockgroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blockgroup" DROP COLUMN "city";

-- AlterTable
ALTER TABLE "BlockgroupSupplemental" ADD COLUMN     "city" "City";

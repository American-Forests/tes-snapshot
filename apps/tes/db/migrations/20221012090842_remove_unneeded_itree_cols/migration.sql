/*
  Warnings:

  - You are about to drop the column `county` on the `iTree` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `iTree` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "iTree" DROP COLUMN "county",
DROP COLUMN "state";

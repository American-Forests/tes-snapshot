/*
  Warnings:

  - The primary key for the `Municipality` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `slug` on table `Municipality` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Municipality" DROP CONSTRAINT "Municipality_pkey",
ALTER COLUMN "slug" SET NOT NULL,
ADD CONSTRAINT "Municipality_pkey" PRIMARY KEY ("slug");

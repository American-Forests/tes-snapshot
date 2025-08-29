/*
  Warnings:

  - Added the required column `center` to the `Municipality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Municipality" ADD COLUMN     "center" geometry(Point, 4326) NOT NULL;

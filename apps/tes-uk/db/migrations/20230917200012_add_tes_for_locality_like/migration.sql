/*
  Warnings:

  - Added the required column `tree_equity_score` to the `LocalityLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LocalityLike" ADD COLUMN     "tree_equity_score" INTEGER NOT NULL;

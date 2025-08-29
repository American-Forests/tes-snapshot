/*
  Warnings:

  - A unique constraint covering the columns `[gid]` on the table `Area` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gid]` on the table `Blockgroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Area_gid_key" ON "Area"("gid");

-- CreateIndex
CREATE UNIQUE INDEX "Blockgroup_gid_key" ON "Blockgroup"("gid");

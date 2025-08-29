-- DropIndex
DROP INDEX "blockgroup_idx";

-- CreateIndex
CREATE INDEX "blockgroup_idx" ON "Blockgroup" USING GIST ("geom");

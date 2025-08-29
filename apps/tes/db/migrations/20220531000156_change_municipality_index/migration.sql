-- DropIndex
DROP INDEX "municipality_idx";

-- CreateIndex
CREATE INDEX "municipality_idx" ON "Municipality" USING GIST ("geom");

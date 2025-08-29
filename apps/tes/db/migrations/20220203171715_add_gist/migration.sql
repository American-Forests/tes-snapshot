-- CreateIndex
CREATE INDEX "area_idx" ON "Area" USING GIST("geom");

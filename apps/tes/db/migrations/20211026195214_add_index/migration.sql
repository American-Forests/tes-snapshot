-- CreateIndex
CREATE INDEX "right_of_way_idx" ON "RightOfWay" USING GIST("geom");

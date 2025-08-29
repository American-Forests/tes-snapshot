-- CreateIndex
CREATE INDEX "municipality_center_idx" ON "Municipality" USING GIST ("center");

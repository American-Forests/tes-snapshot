-- CreateTable
CREATE TABLE "Municipality" (
    "gid" INTEGER NOT NULL,
    "geom" geometry(MultiPolygon, 4326) NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("gid")
);

-- CreateIndex
CREATE INDEX "municipality_idx" ON "Municipality"("geom");

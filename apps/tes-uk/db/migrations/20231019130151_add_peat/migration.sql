-- CreateTable
CREATE TABLE "Peat" (
    "gid" SERIAL NOT NULL,
    "geom" geometry(MultiPolygon, 4326) NOT NULL,

    CONSTRAINT "Peat_pkey" PRIMARY KEY ("gid")
);

-- CreateIndex
CREATE INDEX "peat_idx" ON "Peat" USING GIST ("geom");

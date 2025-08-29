-- CreateTable
CREATE TABLE "TreeCanopy" (
    "gid" SERIAL NOT NULL,
    "geom" geometry(MultiPolygon, 4326) NOT NULL,
    "city" "City" NOT NULL DEFAULT E'RICHMOND',

    CONSTRAINT "TreeCanopy_pkey" PRIMARY KEY ("gid")
);

-- CreateIndex
CREATE INDEX "tree_canopy_idx" ON "TreeCanopy" USING GIST ("geom");

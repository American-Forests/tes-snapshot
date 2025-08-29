-- CreateTable
CREATE TABLE "LocalityLike" (
    "gid" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "geom" geometry(MultiPolygon, 4326) NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "LocalityLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "locality_like_idx" ON "LocalityLike" USING GIST ("geom");

-- CreateTable
CREATE TABLE "County" (
    "gid" SERIAL NOT NULL,
    "geom" geometry(Point, 4326) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "County_pkey" PRIMARY KEY ("gid")
);

-- CreateIndex
CREATE INDEX "county_idx" ON "County" USING GIST ("geom");

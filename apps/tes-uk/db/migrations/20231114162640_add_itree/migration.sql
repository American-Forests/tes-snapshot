-- CreateTable
CREATE TABLE "iTree" (
    "la_code" TEXT NOT NULL,
    "co2" DOUBLE PRECISION NOT NULL,
    "runoff_avoided" DOUBLE PRECISION NOT NULL,
    "no2" DOUBLE PRECISION NOT NULL,
    "pm25" DOUBLE PRECISION NOT NULL,
    "so2" DOUBLE PRECISION NOT NULL,
    "total_ecosystem_service_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "iTree_pkey" PRIMARY KEY ("la_code")
);

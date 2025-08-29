-- CreateTable
CREATE TABLE "iTree" (
    "state" TEXT,
    "county" TEXT,
    "fips" TEXT NOT NULL,
    "co2_value" DOUBLE PRECISION,
    "co2" DOUBLE PRECISION,
    "co_value" DOUBLE PRECISION,
    "co" DOUBLE PRECISION,
    "no2_value" DOUBLE PRECISION,
    "no2" DOUBLE PRECISION,
    "ozone" DOUBLE PRECISION,
    "pm25_value" DOUBLE PRECISION,
    "pm25" DOUBLE PRECISION,
    "pm10_value" DOUBLE PRECISION,
    "pm10" DOUBLE PRECISION,
    "so2_value" DOUBLE PRECISION,
    "so2" DOUBLE PRECISION,
    "rain_int" DOUBLE PRECISION,
    "runoff_avoided_value" DOUBLE PRECISION,
    "runoff_avoided" DOUBLE PRECISION,
    "total_ecosystem_service_value" DOUBLE PRECISION,

    CONSTRAINT "iTree_pkey" PRIMARY KEY ("fips")
);

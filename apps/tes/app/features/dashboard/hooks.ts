import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { sumBy } from "lodash"
import {
  cubicMetersToGallons,
  cubicMetersToLiters,
  gallonsToMillonGallons,
  gallonsToSwimmingPools,
  kgsToMetricTons,
  litersToRainBarrels,
  metricTonsCO2ToUSCars,
  metricTonsCO2ToCACars,
  metricTonsCO2ToUSHomes,
  metricTonsToPounds,
  metricTonsToTons,
  poundsPM25ToUSCars,
  kgsPM25ToCACars,
  poundsToTons,
  carbonToCO2,
  metricTonsCO2ToCAHomes,
} from "app/utils/conversion_utils"
import { getBenefit, formatBenefitValue, getPercentTreeCanopyAdded } from "./utils"
import type { BenefitsPanelData } from "ui"
import type { City } from "app/features/regional-map/regional-map.types"
import { TopStatsData, TopStatsProps } from "./dashboard.types"
import { acresToSquareKilometers, formatNumber, squareKilometersToAcres } from "utils"
import { JOBS_PER_TREE } from "app/constants"
import { LOCALITY_REPORT_TYPE } from "../report-finder/constants"

type MetricUnits = {
  tonnes: string
  kgs: string
  million_litres: string
  litres: string
}

type ImperialUnits = {
  tons: string
  lbs: string
  million_gallons: string
  gallons: string
}
type Units = MetricUnits | ImperialUnits

const getLocalizedI18nUnitStrings = (locale: City["locale"]): Units => {
  if (locale === "en-CA") {
    return {
      tonnes: "common:units.tonnes",
      kgs: "common:units.kgs",
      million_litres: "common:units.million_litres",
      litres: "common:units.litres",
    }
  }
  return {
    tons: "common:units.tons",
    lbs: "common:units.lbs",
    million_gallons: "common:units.million_gallons",
    gallons: "common:units.gallons",
  }
}

export const useBenefitsPanelData = (
  benefits: Map<string, number> | undefined,
  city?: City
): BenefitsPanelData | null => {
  const { t } = useTranslation(["common", "location-insights"])
  const [benefitsPanelData, setBenefitsPanelData] = useState<BenefitsPanelData | null>(null)
  useEffect(() => {
    if (benefits) {
      const isMetricUnits = city?.locale === "en-CA"
      const units = getLocalizedI18nUnitStrings(city?.locale)

      // Calculate water values
      const stormwater_prevented = isMetricUnits
        ? cubicMetersToLiters(getBenefit("runoff_avoided", benefits))
        : cubicMetersToGallons(getBenefit("runoff_avoided", benefits))
      const rainfall_intercepted = isMetricUnits
        ? cubicMetersToLiters(getBenefit("rain_int", benefits))
        : cubicMetersToGallons(getBenefit("rain_int", benefits))

      // Calculate air quality values
      const carbon_removed_kgs = getBenefit("co2", benefits)
      const carbon_removed_metric_tons = kgsToMetricTons(carbon_removed_kgs)

      // Air pollutants in metric or imperial
      const pm25_removed = isMetricUnits
        ? kgsToMetricTons(getBenefit("pm25", benefits))
        : metricTonsToPounds(getBenefit("pm25", benefits))
      const no2_removed = isMetricUnits
        ? kgsToMetricTons(getBenefit("no2", benefits))
        : metricTonsToPounds(getBenefit("no2", benefits))
      const so2_removed = isMetricUnits
        ? kgsToMetricTons(getBenefit("so2", benefits))
        : metricTonsToPounds(getBenefit("so2", benefits))
      const pm10_removed = isMetricUnits
        ? kgsToMetricTons(getBenefit("pm10", benefits))
        : metricTonsToPounds(getBenefit("pm10", benefits))
      const ozone_removed = isMetricUnits
        ? kgsToMetricTons(getBenefit("ozone", benefits))
        : metricTonsToPounds(getBenefit("ozone", benefits))

      setBenefitsPanelData({
        carbon: [
          {
            label: t("location-insights:benefits.co2.name"),
            unit: t(isMetricUnits ? (units as MetricUnits).tonnes : (units as ImperialUnits).tons),
            hint: t(
              isMetricUnits
                ? "location-insights:benefits.co2.torontoHint"
                : "location-insights:benefits.co2.hint"
            ),
            value: formatBenefitValue(
              isMetricUnits
                ? carbon_removed_metric_tons
                : metricTonsToTons(carbon_removed_metric_tons)
            ),
          },
          {
            label: t("location-insights:benefits.co2_car_offset.name"),
            unit: t("location-insights:benefits.co2_car_offset.unit"),
            hint: t(
              isMetricUnits
                ? "location-insights:benefits.co2_car_offset.torontoHint"
                : "location-insights:benefits.co2_car_offset.hint"
            ),
            value: formatBenefitValue(
              isMetricUnits
                ? metricTonsCO2ToCACars(carbonToCO2(carbon_removed_metric_tons))
                : metricTonsCO2ToUSCars(carbonToCO2(carbon_removed_metric_tons)),
              "offset"
            ),
          },
          {
            label: t("location-insights:benefits.co2_home_offset.name"),
            unit: t("location-insights:benefits.co2_home_offset.unit"),
            hint: t(
              isMetricUnits
                ? "location-insights:benefits.co2_home_offset.torontoHint"
                : "location-insights:benefits.co2_home_offset.hint"
            ),
            value: formatBenefitValue(
              isMetricUnits
                ? metricTonsCO2ToCAHomes(carbonToCO2(carbon_removed_metric_tons))
                : metricTonsCO2ToUSHomes(carbonToCO2(carbon_removed_metric_tons)),
              "offset"
            ),
          },
        ],
        water: [
          {
            label: t("location-insights:benefits.runoff_avoided.name"),
            hint: t(
              isMetricUnits
                ? "location-insights:benefits.runoff_avoided.torontoHint"
                : "location-insights:benefits.runoff_avoided.hint"
            ),
            unit: isMetricUnits
              ? t(
                  stormwater_prevented < 1000000
                    ? (units as MetricUnits).litres
                    : (units as MetricUnits).million_litres
                )
              : t(
                  stormwater_prevented < 1000000
                    ? (units as ImperialUnits).gallons
                    : (units as ImperialUnits).million_gallons
                ),
            value:
              stormwater_prevented < 1000000
                ? formatBenefitValue(stormwater_prevented, "liquid")
                : formatBenefitValue(
                    isMetricUnits
                      ? stormwater_prevented / 1000000
                      : gallonsToMillonGallons(stormwater_prevented)
                  ),
          },
          {
            label: t("location-insights:benefits.runoff_pools_avoided.name"),
            hint: t(
              isMetricUnits
                ? "location-insights:benefits.runoff_pools_avoided.torontoHint"
                : "location-insights:benefits.runoff_pools_avoided.hint"
            ),
            unit: isMetricUnits
              ? t("location-insights:benefits.runoff_pools_avoided.canadianUnit")
              : t("location-insights:benefits.runoff_pools_avoided.unit"),
            value: formatBenefitValue(
              isMetricUnits
                ? litersToRainBarrels(stormwater_prevented)
                : gallonsToSwimmingPools(stormwater_prevented),
              "offset"
            ),
          },
          {
            label: t("location-insights:benefits.rain_int.name"),
            hint: t("location-insights:benefits.rain_int.hint"),
            unit: isMetricUnits
              ? rainfall_intercepted < 1000000
                ? t((units as MetricUnits).litres)
                : t((units as MetricUnits).million_litres)
              : t(
                  rainfall_intercepted < 1000000
                    ? (units as ImperialUnits).gallons
                    : (units as ImperialUnits).million_gallons
                ),
            value:
              rainfall_intercepted < 1000000
                ? formatBenefitValue(rainfall_intercepted, "liquid")
                : formatBenefitValue(
                    isMetricUnits
                      ? rainfall_intercepted / 1000000
                      : gallonsToMillonGallons(rainfall_intercepted)
                  ),
          },
        ],
        air: [
          {
            label: t("location-insights:benefits.pm25.name"),
            hint: t(
              isMetricUnits
                ? "location-insights:benefits.pm25.torontoHint"
                : "location-insights:benefits.pm25.hint"
            ),
            unit: isMetricUnits
              ? t(pm25_removed < 1 ? (units as MetricUnits).kgs : (units as MetricUnits).tonnes)
              : t(
                  pm25_removed < 10000
                    ? (units as ImperialUnits).lbs
                    : (units as ImperialUnits).tons
                ),
            value: isMetricUnits
              ? pm25_removed < 1
                ? formatBenefitValue(pm25_removed * 1000)
                : formatBenefitValue(pm25_removed)
              : pm25_removed < 10000
              ? formatBenefitValue(pm25_removed)
              : formatBenefitValue(poundsToTons(pm25_removed)),
          },
          {
            label: t("location-insights:benefits.pm25_car_offset.name"),
            hint: t(
              isMetricUnits
                ? "location-insights:benefits.pm25_car_offset.torontoHint"
                : "location-insights:benefits.pm25_car_offset.hint"
            ),
            unit: t("location-insights:benefits.pm25_car_offset.unit"),
            value: formatBenefitValue(
              isMetricUnits
                ? kgsPM25ToCACars(pm25_removed * 1000)
                : poundsPM25ToUSCars(pm25_removed),
              "offset"
            ),
          },
          {
            label: t("location-insights:benefits.no2.name"),
            hint: t(
              isMetricUnits
                ? "location-insights:benefits.no2.torontoHint"
                : "location-insights:benefits.no2.hint"
            ),
            unit: isMetricUnits
              ? t(no2_removed < 1 ? (units as MetricUnits).kgs : (units as MetricUnits).tonnes)
              : t(
                  no2_removed < 10000 ? (units as ImperialUnits).lbs : (units as ImperialUnits).tons
                ),
            value: isMetricUnits
              ? no2_removed < 1
                ? formatBenefitValue(no2_removed * 1000)
                : formatBenefitValue(no2_removed)
              : no2_removed < 10000
              ? formatBenefitValue(no2_removed)
              : formatBenefitValue(poundsToTons(no2_removed)),
          },
          {
            label: t("location-insights:benefits.so2.name"),
            hint: t(
              isMetricUnits
                ? "location-insights:benefits.so2.torontoHint"
                : "location-insights:benefits.so2.hint"
            ),
            unit: isMetricUnits
              ? t(so2_removed < 1 ? (units as MetricUnits).kgs : (units as MetricUnits).tonnes)
              : t(
                  so2_removed < 10000 ? (units as ImperialUnits).lbs : (units as ImperialUnits).tons
                ),
            value: isMetricUnits
              ? so2_removed < 1
                ? formatBenefitValue(so2_removed * 1000)
                : formatBenefitValue(so2_removed)
              : so2_removed < 10000
              ? formatBenefitValue(so2_removed)
              : formatBenefitValue(poundsToTons(so2_removed)),
          },
          {
            label: t("location-insights:benefits.pm10.name"),
            hint: t("location-insights:benefits.pm10.hint"),
            unit: isMetricUnits
              ? t(pm10_removed < 1 ? (units as MetricUnits).kgs : (units as MetricUnits).tonnes)
              : t(
                  pm10_removed < 10000
                    ? (units as ImperialUnits).lbs
                    : (units as ImperialUnits).tons
                ),
            value: isMetricUnits
              ? pm10_removed < 1
                ? formatBenefitValue(pm10_removed * 1000)
                : formatBenefitValue(pm10_removed)
              : pm10_removed < 10000
              ? formatBenefitValue(pm10_removed)
              : formatBenefitValue(poundsToTons(pm10_removed)),
          },
          {
            label: t("location-insights:benefits.ozone.name"),
            hint: t(
              isMetricUnits
                ? "location-insights:benefits.ozone.torontoHint"
                : "location-insights:benefits.ozone.hint"
            ),
            unit: isMetricUnits
              ? t(ozone_removed < 1 ? (units as MetricUnits).kgs : (units as MetricUnits).tonnes)
              : t(
                  ozone_removed < 10000
                    ? (units as ImperialUnits).lbs
                    : (units as ImperialUnits).tons
                ),
            value: isMetricUnits
              ? ozone_removed < 1
                ? formatBenefitValue(ozone_removed * 1000)
                : formatBenefitValue(ozone_removed)
              : ozone_removed < 10000
              ? formatBenefitValue(ozone_removed)
              : formatBenefitValue(poundsToTons(ozone_removed)),
          },
        ],
      })
    }
  }, [benefits, t, city])
  return benefitsPanelData
}

export const useTopStatsData = ({
  blockgroups,
  canopyAcresNeeded,
  totalEcosystemServiceValue,
  treesNeeded,
  existingTrees,
  reportType,
  newCompositeLocalityScore,
  numberLocalitiesImpacted,
  planningTab,
  totalPopulation,
}: TopStatsProps): TopStatsData => {
  const { t } = useTranslation(["location-insights"])
  const [topStatsData, setTopStatsData] = useState<TopStatsData | undefined>(undefined)
  const existingCanopyAcres = sumBy(
    blockgroups,
    (bg) => bg.tree_canopy * squareKilometersToAcres(bg.area_sqkm!)
  )
  const newStats = {
    title: t("location-insights:top-stats.new_canopy"),
    items: [
      {
        label: t("location-insights:top-stats.new_canopy_added.title"),
        value:
          formatNumber(
            getPercentTreeCanopyAdded(blockgroups, acresToSquareKilometers(canopyAcresNeeded)),
            1,
            "en-us"
          ) + "%",
        hint: t("location-insights:top-stats.new_canopy_added.hint"),
      },
      {
        label: t("location-insights:top-stats.annual_ecosystem_service_value.title"),
        value: `$${formatNumber(totalEcosystemServiceValue, 0, "en-us")}`,
        hint: t("location-insights:top-stats.annual_ecosystem_service_value.hint"),
      },
      {
        label: t("location-insights:top-stats.jobs_supported.title"),
        value: `${Math.floor(treesNeeded * JOBS_PER_TREE)}`,
        hint: t("location-insights:top-stats.jobs_supported.hint"),
      },
      {
        label:
          reportType === LOCALITY_REPORT_TYPE
            ? t("location-insights:top-stats.composite_score.title")
            : t("location-insights:top-stats.localities_impacted.title"),
        value:
          reportType === LOCALITY_REPORT_TYPE
            ? `${formatNumber(newCompositeLocalityScore, 0, "en-us")}`
            : `${numberLocalitiesImpacted}`,
        hint:
          reportType === LOCALITY_REPORT_TYPE
            ? t("location-insights:top-stats.composite_score.hint")
            : t("location-insights:top-stats.localities_impacted.hint"),
      },
    ],
  }
  const existingCanopyStats = {
    title: t("location-insights:top-stats.existing_canopy"),
    items: [
      {
        label: t("location-insights:top-stats.total_canopy.title"),
        value:
          formatNumber(
            getPercentTreeCanopyAdded(
              blockgroups,
              acresToSquareKilometers(canopyAcresNeeded + existingCanopyAcres)
            ),
            1,
            "en-us"
          ) + "%",
        hint: t("location-insights:top-stats.total_canopy.hint"),
      },
      {
        label: t("location-insights:top-stats.ecosystem_value.title"),
        value: `$${formatNumber(totalEcosystemServiceValue, 0, "en-us")}`,
        hint: t("location-insights:top-stats.ecosystem_value.hint"),
      },
      {
        label: t("location-insights:top-stats.trees_per_person.title"),
        value: `${formatNumber((existingTrees + treesNeeded) / totalPopulation, 1, "en-us")}`,
        hint: t("location-insights:top-stats.trees_per_person.hint"),
      },
      {
        label:
          reportType === LOCALITY_REPORT_TYPE
            ? t("location-insights:top-stats.composite_score.title")
            : t("location-insights:top-stats.localities_impacted.title"),
        value:
          reportType === LOCALITY_REPORT_TYPE
            ? `${formatNumber(newCompositeLocalityScore, 0, "en-us")}`
            : `${numberLocalitiesImpacted}`,
        hint:
          reportType === LOCALITY_REPORT_TYPE
            ? t("location-insights:top-stats.composite_score.hint")
            : t("location-insights:top-stats.localities_impacted.hint"),
      },
    ],
  }

  useEffect(() => {
    if (planningTab === "new") {
      setTopStatsData(newStats)
    } else {
      setTopStatsData(existingCanopyStats)
    }
  }, [
    blockgroups,
    canopyAcresNeeded,
    totalEcosystemServiceValue,
    treesNeeded,
    reportType,
    newCompositeLocalityScore,
    numberLocalitiesImpacted,
    planningTab,
  ])

  return topStatsData as TopStatsData
}

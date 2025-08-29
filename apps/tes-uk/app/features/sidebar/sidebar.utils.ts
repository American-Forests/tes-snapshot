import { FEATURE_COUNTRY_MAX_RANKS } from "app/features/facets/facets.utils"
import { NeighborhoodLike } from "db"
import { locale } from "utils"

export const getPriorityLabel = (tes: number) => {
  if (tes === 100) return "NONE"
  else if (tes < 100 && tes >= 90) return "LOW"
  else if (tes < 90 && tes >= 80) return "MODERATE"
  else if (tes < 80 && tes >= 70) return "HIGH"
  return "HIGHEST"
}

export const percentage = (val: number) => `${Math.floor(val * 100)}%`

export const getRadarChartData = (featureData: NeighborhoodLike) => {
  const {
    income_rank,
    income_normalized,
    employment_rank,
    employment_normalized,
    temperature_difference,
    temperature_difference_normalized,
    health_rank,
    health_normalized,
    dependent_proportion,
    dependent_ratio_normalized,
    country_id,
    pm25_average,
    no2_average,
    air_pollution,
  } = featureData
  return [
    {
      label: "Heat disparity",
      valueLabel: `${temperature_difference}° C`,
      value: temperature_difference_normalized,
    },
    {
      label: "Children & older people",
      valueLabel: `${Number(dependent_proportion).toLocaleString("en-GB", {
        style: "percent",
      })}`,
      value: dependent_ratio_normalized,
    },
    {
      label: "Employment\nRanking (IMD)",
      valueLabel: `${employment_rank.toLocaleString("en-GB")} out of ${locale(
        FEATURE_COUNTRY_MAX_RANKS[country_id]
      )}`,
      value: employment_normalized,
    },
    {
      label: "Health Ranking (IMD)",
      valueLabel: `${health_rank.toLocaleString("en-GB")} out of ${locale(
        FEATURE_COUNTRY_MAX_RANKS[country_id]
      )}`,
      value: health_normalized,
    },
    {
      label: "Income Ranking (IMD)",
      valueLabel: `${income_rank.toLocaleString("en-GB")} out of ${locale(
        FEATURE_COUNTRY_MAX_RANKS[country_id]
      )}`,
      value: income_normalized,
    },
    {
      label: "Air pollution: PM2.5, NO2",
      valueLabel: `${pm25_average?.toLocaleString("en-GB", {
        maximumFractionDigits: 1,
      })} µg/m3, ${no2_average?.toLocaleString("en-GB", { maximumFractionDigits: 1 })} µg/m3`,
      value: air_pollution,
    },
  ]
}

import { locale } from "utils"
import type { Facet } from "tes-types"
import type { MapboxGeoJSONFeature } from "mapbox-gl"

// eslint-disable-next-line @typescript-eslint/ban-types
export const round100 = (f: Function) => (n: number) =>
  f(n * 100 < 1 ? n * 100 : Math.ceil(n * 100))
export const toFixed =
  (nth = 1) =>
  (n: number) =>
    n.toFixed(nth)

export const nth = (number: number) => {
  if (typeof number !== "number" || isNaN(number)) return number
  const suffixes = ["th", "st", "nd", "rd"]
  const lastDigit = number % 10
  // special case for 11, 12, and 13
  const specialCase = number % 100 >= 11 && number % 100 <= 13
  const suffix = specialCase ? suffixes[0] : suffixes[lastDigit]

  return number + (suffix ?? "th")
}

export const FEATURE_COUNTRY_MAX_RANKS: Record<string, number> = {
  england: 32844,
  northern_ireland: 890,
  scotland: 6976,
  wales: 1909,
}

export const airPollutionTooltip = (facet: Facet, feature: MapboxGeoJSONFeature) => {
  const value =
    facet.tooltipFormatter &&
    facet.tooltipFormatter(feature.properties![facet.tooltipAttribute || facet.attr] ?? 0)
  const label = facet.tooltipName ?? facet.name
  return `<div class='flex flex-col items-center rounded-md px-2'>
    ${
      value
        ? `<div class="text-3xl font-black text-brand-green-dark text-center">${value} µg/m3</div>`
        : ``
    }
    ${
      label
        ? `<div class="text-md text-brand-green-dark font-semibold pt-1 leading-tight text-center">${label}</div>`
        : ``
    }
    </div>`
}

export const imdTooltip = (facet: Facet, feature: MapboxGeoJSONFeature) => {
  const value =
    facet.tooltipFormatter && facet.tooltipFormatter(feature.properties![facet.tooltipAttribute!])
  const countryId = feature.properties!.country_id // TODO retrieve form db or feature
  const countryMaxRank = FEATURE_COUNTRY_MAX_RANKS[countryId]
  const label = locale(countryMaxRank, "en-GB")
  const label_name = facet?.layerName
  const caption = feature.properties![facet.attr]

  return `<div class='flex flex-col items-center rounded-md px-2'>
  ${
    label_name
      ? `<div class="text-xs text-brand-green-dark font-semibold pt-1 text-center">${label_name}</div>`
      : ``
  }
  ${
    value ? `<div class="text-4xl font-black text-brand-green-dark text-center">${value}</div>` : ``
  }
  ${label ? `<div class="text-xs text-gray-400 font-medium text-center">out of ${label}</div>` : ``}
  ${
    caption
      ? `<div class="text-annotation text-brand-green-dark font-bold leading-tight pt-1 uppercase text-center">${nth(
          caption
        )} decile</div>`
      : ``
  }
  
  </div>`
}

/**
 * Convert display percentage to decimal equivalent (divide by 100). Implementes FacetData.filterMapper
 * @param v
 * @returns
 */
export const filterMapper = (v: number[] | string): number[] | number =>
  Array.isArray(v) ? v.map((v: number) => v / 100) : parseFloat(v) / 100

/**
 * Convert decimal percent value to display equivalent (multiply by 100). Matches FacetData.filterUnmapper
 * @param v
 * @returns
 */
export const filterUnmapper = (v: number[] | number | undefined): number[] | undefined | string => {
  if (v === undefined) {
    return undefined
  } else if (Array.isArray(v)) {
    return v.map((v: number) => Math.round(v * 100))
  } else {
    return Math.round(v * 100).toString()
  }
}

export const binaryToString = (
  value: number | number[] | undefined
): number[] | undefined | string => (value === 1 ? "yes" : value === 0 ? "no" : "any")

export const stringToBinary = (value: number[] | string): number | number[] =>
  value === "yes" ? 1 : value === "no" ? 0 : [0, 1]

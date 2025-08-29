import { squareKilometersToAcres } from "utils"

export function squareFeetToAcres(x: number): number {
  return x / 43560
}

export function squareFeetToSquareMeters(x: number): number {
  return x * 0.09290304
}

export function acresToSquareFeet(x: number): number {
  return x * 43560
}

export function squareKilometersToSquareFeet(x: number): number {
  return acresToSquareFeet(squareKilometersToAcres(x))
}

export function acresToSquareMiles(x: number): number {
  return x / 640
}

export function acresToSquareMeters(x: number): number {
  return squareFeetToSquareMeters(acresToSquareFeet(x))
}

export function metricTonsToPounds(x: number): number {
  return x * 2204.62
}

export function poundsToMetricTons(x: number): number {
  return x / 2204.62
}

export function poundsToTons(x: number): number {
  return x / 2000
}

export function tonsToPounds(x: number): number {
  return x * 2000
}

export function cubicMetersToGallons(x: number): number {
  return x * 219.969
}

export function gallonsToSwimmingPools(x: number): number {
  return x / 20000
}

export function litersToRainBarrels(x: number): number {
  return x / 200
}

export function gallonsToMillonGallons(x: number): number {
  return x / 1000000
}

export function metricTonsToTons(x: number): number {
  return poundsToTons(metricTonsToPounds(x))
}

export function metricTonsCO2ToUSCars(x: number): number {
  return x / 4.64
}

export function metricTonsCO2ToCACars(x: number): number {
  return x / 3.26
}

export function metricTonsCO2ToUSHomes(x: number): number {
  return x / 7.94
}

export function metricTonsCO2ToCAHomes(x: number): number {
  return x / 4.27
}

export function poundsPM25ToUSCars(x: number): number {
  return x / 2.17
}

export function kgsPM25ToCACars(x: number): number {
  return x / 0.194958
}

export function cubicMetersToLiters(x: number): number {
  return x * 1000
}

export function metricTonsToKilograms(x: number): number {
  return x * 1000
}

export function kgsToMetricTons(x: number): number {
  return x / 1000
}

export function kgsToPounds(x: number): number {
  return x * 2.20462
}

export function getValueFromLocale(
  locale: "en-US" | "en-CA" | undefined,
  defaultValue: number,
  convertedValue: number,
) {
  if (!locale || locale === "en-US") {
    return defaultValue
  } else {
    return convertedValue
  }
}

export function getUnitFromLocale(
  locale: "en-US" | "en-CA" | undefined,
  defaultUnit: string,
  convertedUnit: string,
) {
  if (!locale || locale === "en-US") {
    return defaultUnit
  } else {
    return convertedUnit
  }
}

export function carbonToCO2(x: number): number {
  return x * 3.67
}

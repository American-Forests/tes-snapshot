export type FormatterOptions = {
  lower: Boolean
}

/**
 * Formats a numerical value with specified decimal places and locale-specific thousand separators.
 *
 * @param {number} number - The numerical value to be formatted.
 * @param {number} decimalPlaces - The number of decimal places to format the number to.
 * @param {string} locale - The locale to be used for formatting (e.g., 'en-GB' for UK, 'en-US' for US).
 * @returns {string} A localized string representation of the input value with specified decimal places and locale-specific thousand separators.
 */
export const formatNumber = (
  number: number,
  decimalPlaces: number,
  locale: string
): string => {
  return Number(number.toFixed(decimalPlaces)).toLocaleString(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })
}

/**
 * Formats a numerical value as a localized string with one decimal place.
 *
 * @param {number} value - The numerical value to be formatted.
 * @returns {string} A localized string representation of the input value with one decimal place.
 */
export const localeWithDecimals = (value: number, decimals = 1): string => {
  return value.toLocaleString("en", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * Formats a numerical value as its ordinal.
 *
 * @param {number} value - The numerical value to be formatted.
 * @returns {string} ordinal representation of the value.
 */
export const getOrdinal = (value: number): string => {
  const enOrdinalRules = new Intl.PluralRules("en-GB", { type: "ordinal" })
  const suffixes = {
    zero: "th",
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
    many: "th",
  }
  const category = enOrdinalRules.select(value)
  const suffix = suffixes[category]
  return value + suffix
}
/**
 * Formats a numerical value as a localized string
 *
 * @param {number} value - The numerical value to be formatted.
 * @returns {string} A localized string representation of the input value.
 */
export const locale = (value: number, localeString = "en"): string => {
  return value.toLocaleString(localeString)
}

/**
 * Formats a numerical value as a percentage by rounding it down to the nearest integer and appending '%'.
 *
 * @param {number} val - The numerical value to be formatted as a percentage.
 * @returns {string} A string representation of the input value as a percentage (e.g., '42%').
 */
export const percentage = (val: number) => `${Math.floor(val)}%`

/**
 * Converts a floating-point number to a formatted percentage by rounding it to two decimal places and appending '%'.
 *
 * @param {number} val - The floating-point number to be converted to a percentage.
 * @returns {string} A string representation of the input value as a percentage (e.g., '42.12%').
 */
export const floatToPercentage = (val: number) => `${Math.floor(val * 100)}%`

/**
 * Converts a numerical value to a formatted proportion by rounding it to two decimal places.
 *
 * @param {number} val - The numerical value to be formatted as a proportion.
 * @returns {string} A string representation of the input value as a proportion with two decimal places.
 */
export const proportion = (val: number) => `${Math.floor(val * 100) / 100}`

/**
 * Multiplies a numerical value by 100 and rounds it down to the nearest integer.
 *
 * @param {number} val - The numerical value to be multiplied by 100 and rounded down.
 * @returns {string} A string representation of the input value multiplied by 100 and rounded down to the nearest integer.
 */
export const x100 = (val: number) => `${Math.floor(val * 100)}`

/**
 * Rounds a numerical value down to the nearest integer using the Math.floor method.
 *
 * @param {number} val - The numerical value to be rounded down to the nearest integer.
 * @returns {string} A string representation of the input value rounded down to the nearest integer.
 */
export const floor = (val: number) => `${Math.floor(val)}`

/**
 * Formats a numerical value as a temperature by rounding it down to the nearest integer and appending the degree symbol '°'.
 *
 * @param {number} val - The numerical value to be formatted as a temperature.
 * @returns {string} A string representation of the input value as a temperature (e.g., '42°').
 */
export const tempFloor = (val: number) => `${Math.floor(val)}°`

/**
 * Formats a temperature difference value by rounding it to one decimal place and adding a '+' sign if it's positive.
 *
 * @param {number} val - The temperature difference value to be formatted.
 * @returns {string} A string representation of the temperature difference, rounded to one decimal place with an optional '+' sign (e.g., '+2.5°' or '-3.0°').
 */
export const tempDiff = (val: number) =>
  `${val > 0 ? "+" : ""}${Math.floor(val * 10) / 10}°`

/**
 * Returns a numerical value as a string without any formatting.
 *
 * @param {number} val - The numerical value to be converted to a string.
 * @returns {string} A string representation of the input numerical value.
 */
export const identity = (val: number) => `${val}`

/**
 * Generates a string representation of the decile for a given value, indicating whether it is the least or most deprived.
 *
 * @param {number} value - The numerical value for which the decile is being determined.
 * @param {FormatterOptions} options - The options object, which can include 'lower' (a boolean indicating whether to use 'least' or 'most').
 * @returns {string} A string describing the decile, including whether it is the least or most deprived.
 */
export const imdDeciles = (
  value: number,
  { lower }: FormatterOptions | undefined = { lower: false }
): string => `${value} ${lower ? "least" : "most"} deprived decile`

export function roundToNearestThousand(value: number): string {
  return (Math.round(value / 1000) * 1000).toLocaleString("en")
}
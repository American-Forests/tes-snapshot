import { group } from "../funcs"
import { quantile, ascending } from "d3-array"

/**
 * Groups items by quantiles.
 *
 * @template T
 * @param {Array<number>} quantiles - An array of values in the range [0, 1] where each value defines the inclusive, upper-bound of a quantile.
 * @param {Array<T>} items - The list of items to be divided into quantiles.
 * @param {(o: T) => number} getter - A function that extracts a numeric value from each item in the list.
 * @returns {Array<Array<T>>} An array of arrays, where each sub-array contains items falling within the corresponding quantile.
 */

export const groupByQuantiles = <T>(
  quantiles: Array<number>,
  items: Array<T>,
  getter: (o: T) => number
): Array<Array<T>> => {
  // map the quantiles to their corresponding value in the sorted array
  const quantileValues = quantiles.map((q) =>
    quantile(items, q, getter)
  ) as number[]
  return group(quantileValues, items, getter)
}

/**
 * Returns the percentage of values in data less than or equal to the value provided.
 *
 * @param data
 * @param value
 * @returns A number between 0 and 100
 */
export const percentLeq = (data: number[], value: number) => {
  let cf = 0
  data.forEach((d) => {
    if (d <= value) cf += 1
  })
  return (cf / data.length) * 100
}

/**
 * Returns the percentage of values in the data strictly less than the value provided.
 *
 * @param data
 * @param value
 * @returns A number between 0 and 100
 */
export const percentLess = (data: number[], value: number) => {
  let cf = 0
  data.forEach((d) => {
    if (d < value) cf += 1
  })
  return (cf / data.length) * 100
}

/**
 * Calculates the percentile rank of a value given a list of data.
 *
 * @param data
 * @param value
 * @returns A number between 0 and 100 representing the percentile rank of the value in the data.
 */
export const percentileRank = (data: number[], value: number) => {
  let cf = 0
  let f = 0
  data.forEach((d) => {
    if (d < value) cf += 1
    else if (d === value) f += 1
  })
  return ((cf + f / 2) / data.length) * 100
}

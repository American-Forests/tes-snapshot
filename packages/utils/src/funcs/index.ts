/**
 * Adds two numbers.
 *
 * @param {number} a - The first number to add.
 * @param {number} b - The second number to add.
 * @returns {number} The sum of the two numbers.
 */
export const add = (a: number, b: number) => a + b

/**
 * Picks a property from an object.
 *
 * @template T - The object type.
 * @template R - The type of the property to pick.
 * @param {keyof T} key - The key of the property to pick.
 * @returns {(obj: T) => R} A function that takes an object and returns the picked property.
 */
export const pick =
  <T, R>(key: keyof T) =>
  <O extends T>(obj: O): R =>
    obj[key] as unknown as R

/**
 * Sums up the selected property from an array of objects.
 *
 * @template T - The object type.
 * @template R - The type of the property to pick.
 * @param {keyof T} key - The key of the property to pick.
 * @returns {(list: T[]) => R} A function that takes an array of objects and returns the sum of the selected property.
 */
export const listAdd =
  <T, R extends number>(key: keyof T) =>
  (list: T[]): R =>
    list.map(pick<T, R>(key)).reduce(add, 0) as R

/**
 * Calculates the product of two picked properties from an object.
 *
 * @param {Function} pickA - A function that picks the first property.
 * @param {Function} pickB - A function that picks the second property.
 * @returns {Function} A function that calculates the product.
 */
// TODO: Fix the types
export const product = (pickA: any, pickB: any) => (obj: any) =>
  pickA(obj) * pickB(obj)

/**
 * Calculates the average of a the product of two properties from an array of objects.
 *
 * @template T - The object type.
 * @template R - The type of the property to pick.
 * @param {keyof T} avgKey - The key of the property to calculate the average.
 * @param {keyof T} key - The key of the property to pick.
 * @returns {(list: T[]) => R} A function that calculates the average.
 */
export const avgBy =
  <T, R extends number>(avgKey: keyof T) =>
  (key: keyof T) =>
  (list: T[]): R => {
    const productSum = list
      .map(product(pick<T, R>(key), pick<T, R>(avgKey)))
      .reduce(add, 0)
    const listSum = listAdd<T, R>(avgKey)(list)
    return ((productSum / listSum) * 100) as R
  }

/**
 * Calculate the average (mean) of an array of numbers.
 *
 * @param {number[]} list - An array of numbers to calculate the average from.
 * @returns {number} The average of the numbers in the array.
 */
export const avg = (list: number[]) => list.reduce(add, 0) / list.length

/**
 * Multiplies a value by a given multiplier.
 *
 * @param {number} m - The multiplier to be applied.
 * @returns {function(number): number} A function that takes a value and returns the result of multiplying it by the multiplier (m).
 */
export const mult = (m: number) => (v: number) => v * m

/**
 * Divides a value by a given divisor.
 *
 * @param {number} m - The divisor to be applied.
 * @returns {function(number): number} A function that takes a value and returns the result of dividing it by the divisor (m).
 */
export const div = (m: number) => (v: number) => v / m

/**
 * Groups items based on an array of threshold values.
 *
 * @template T
 * @param {Array<number>} thresholds - An array of values in ascending order that defines the inclusive, upper-bound of each group.
 * @param {Array<T>} items - The list of items to be divided into groups.
 * @param {(o: T) => number} getter - A function that extracts a numeric value from each item in the list.
 * @returns {Array<Array<T>>} An array of arrays, where each sub-array contains items falling within the corresponding group.
 */
export const group = <T>(
  thresholds: Array<number>,
  items: Array<T>,
  getter: (o: T) => number
): Array<Array<T>> => {
  // initialize the array to hold the split items
  let groups = thresholds.map(() => [] as T[])

  // iterate over each item and place them in correct group
  items.forEach((item) => {
    const binIndex = thresholds.findIndex(
      (threshold) => getter(item) <= threshold
    )
    binIndex >= 0 && groups[binIndex]!.push(item)
  })
  return groups
}

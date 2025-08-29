import { groupByQuantiles, percentLeq, percentLess, percentileRank } from "."

describe("groupByQuantiles", () => {
  test("should split items into correct quantiles", () => {
    const quantiles = [0.25, 0.5, 0.75, 1]
    const items = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 },
    ]
    const getter = (o: { value: number }) => o.value

    const result = groupByQuantiles(quantiles, items, getter)

    // Update the expected arrays to be arrays of objects with the value property
    expect(result.length).toEqual(quantiles.length)
    expect(result).toEqual([
      [{ value: 1 }, { value: 2 }, { value: 3 }], // First quantile (0-25%)
      [{ value: 4 }, { value: 5 }], // Second quantile (25-50%)
      [{ value: 6 }, { value: 7 }], // Third quantile (50-75%)
      [{ value: 8 }, { value: 9 }, { value: 10 }], // Fourth quantile (75-100%)
    ])
  })

  test("should handle empty items array", () => {
    const quantiles = [0.5, 1]
    const items: { value: number }[] = []
    const getter = (o: { value: number }) => o.value

    const result = groupByQuantiles(quantiles, items, getter)

    expect(result.length).toEqual(quantiles.length)
    expect(result).toEqual([[], []]) // Two empty quantiles
  })

  test("should correctly split items with negative values into quantiles", () => {
    const quantiles = [0.25, 0.5, 0.75, 1]
    const items = [
      { value: -10 },
      { value: -5 },
      { value: 0 },
      { value: 5 },
      { value: 10 },
      { value: 15 },
      { value: 20 },
      { value: 25 },
      { value: 30 },
      { value: 35 },
    ]
    const getter = (o: { value: number }) => o.value

    const result = groupByQuantiles(quantiles, items, getter)

    expect(result.length).toEqual(quantiles.length)
    expect(result).toEqual([
      [{ value: -10 }, { value: -5 }, { value: 0 }], // First quantile
      [{ value: 5 }, { value: 10 }], // Second quantile
      [{ value: 15 }, { value: 20 }], // Third quantile
      [{ value: 25 }, { value: 30 }, { value: 35 }], // Fourth quantile
    ])
  })
})

describe("percentLeq", () => {
  test("should correctly return the percentage of values less than or equal to the provided value", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(percentLeq(data, 1)).toBe(10)
    expect(percentLeq(data, 2)).toBe(20)
    expect(percentLeq(data, 3)).toBe(30)
    expect(percentLeq(data, 4)).toBe(40)
    expect(percentLeq(data, 5)).toBe(50)
    expect(percentLeq(data, 6)).toBe(60)
    expect(percentLeq(data, 7)).toBe(70)
    expect(percentLeq(data, 8)).toBe(80)
    expect(percentLeq(data, 9)).toBe(90)
    expect(percentLeq(data, 10)).toBe(100)
  })

  test("should return correct values when data is not sorted", () => {
    const data = [3, 2, 1, 4, 10, 9, 8, 7, 6, 5]
    expect(percentLeq(data, 1)).toBe(10)
    expect(percentLeq(data, 2)).toBe(20)
    expect(percentLeq(data, 3)).toBe(30)
    expect(percentLeq(data, 4)).toBe(40)
    expect(percentLeq(data, 5)).toBe(50)
    expect(percentLeq(data, 6)).toBe(60)
    expect(percentLeq(data, 7)).toBe(70)
    expect(percentLeq(data, 8)).toBe(80)
    expect(percentLeq(data, 9)).toBe(90)
    expect(percentLeq(data, 10)).toBe(100)
  })

  test("should correctly return the percentage of values less than or equal to the provided value when it's duplicated and the minimum", () => {
    const data = [1, 1, 1, 4, 5, 6, 7, 8, 9, 10]
    expect(percentLeq(data, 1)).toBe(30)
  })

  test("should return 100% when all values are the same", () => {
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    expect(percentLeq(data, 1)).toBe(100)
  })

  test("should return a value even if the value isn't included in data", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(percentLeq(data, 0)).toBe(0)
    expect(percentLeq(data, 11)).toBe(100)
  })

  test("should return NaN if the data is empty", () => {
    const data: number[] = []
    expect(percentLeq(data, 1)).toBe(NaN)
  })
})

describe("percentLess", () => {
  test("should correctly return the percentage of values less than the provided value", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(percentLess(data, 1)).toBe(0)
    expect(percentLess(data, 2)).toBe(10)
    expect(percentLess(data, 3)).toBe(20)
    expect(percentLess(data, 4)).toBe(30)
    expect(percentLess(data, 5)).toBe(40)
    expect(percentLess(data, 6)).toBe(50)
    expect(percentLess(data, 7)).toBe(60)
    expect(percentLess(data, 8)).toBe(70)
    expect(percentLess(data, 9)).toBe(80)
    expect(percentLess(data, 10)).toBe(90)
  })

  test("should return correct values when data is not sorted", () => {
    const data = [3, 2, 1, 4, 10, 9, 8, 7, 6, 5]
    expect(percentLess(data, 1)).toBe(0)
    expect(percentLess(data, 2)).toBe(10)
    expect(percentLess(data, 3)).toBe(20)
    expect(percentLess(data, 4)).toBe(30)
    expect(percentLess(data, 5)).toBe(40)
    expect(percentLess(data, 6)).toBe(50)
    expect(percentLess(data, 7)).toBe(60)
    expect(percentLess(data, 8)).toBe(70)
    expect(percentLess(data, 9)).toBe(80)
    expect(percentLess(data, 10)).toBe(90)
  })

  test("should correctly return the percentage of values less than the provided value when it's duplicated and the minimum", () => {
    const data = [1, 1, 1, 4, 5, 6, 7, 8, 9, 10]
    expect(percentLess(data, 1)).toBe(0)
  })

  test("should return 0% when all values are the same", () => {
    const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    expect(percentLess(data, 1)).toBe(0)
  })

  test("should correctly return the percentage of values less than the provided value when it's duplicated", () => {
    const data = [1, 2, 3, 4, 5, 5, 5, 8, 9, 10]
    expect(percentLess(data, 5)).toBe(40)
  })

  test("should return a value even if the value isn't included in data", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(percentLess(data, 0)).toBe(0)
    expect(percentLess(data, 11)).toBe(100)
  })

  test("should return NaN if the data is empty", () => {
    const data: number[] = []
    expect(percentLess(data, 1)).toBe(NaN)
  })
})

describe("percentileRank", () => {
  test("should correctly return the percentile rank of the provided value", () => {
    const data = [7, 5, 5, 4, 4, 3, 3, 3, 2, 1]
    expect(percentileRank(data, 1)).toBe(5)
    expect(percentileRank(data, 2)).toBe(15)
    expect(percentileRank(data, 3)).toBe(35)
    expect(percentileRank(data, 4)).toBe(60)
    expect(percentileRank(data, 5)).toBe(80)
    expect(percentileRank(data, 7)).toBe(95)
  })

  test("should return the same results regardless of the order of the data", () => {
    const data = [1, 2, 4, 4, 3, 3, 3, 7, 5, 5]
    expect(percentileRank(data, 1)).toBe(5)
    expect(percentileRank(data, 2)).toBe(15)
    expect(percentileRank(data, 3)).toBe(35)
    expect(percentileRank(data, 4)).toBe(60)
    expect(percentileRank(data, 5)).toBe(80)
    expect(percentileRank(data, 7)).toBe(95)
  })

  test("should return a value even if the value isn't included in data", () => {
    const data = [1, 2, 4, 4, 3, 3, 3, 7, 5, 5]
    expect(percentileRank(data, 6)).toBe(90)
    expect(percentileRank(data, 0)).toBe(0)
    expect(percentileRank(data, 8)).toBe(100)
  })

  test("should return NaN if the data is empty", () => {
    const data: number[] = []
    expect(percentileRank(data, 1)).toBe(NaN)
  })
})

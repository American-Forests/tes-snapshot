import { add, pick, listAdd, product, avgBy, avg } from "./"

describe("add", () => {
  it("should add two numbers", () => {
    expect(add(3, 4)).toBe(7)
    expect(add(-1, 1)).toBe(0)
    expect(add(0, 0)).toBe(0)
  })
})

describe("pick", () => {
  it("should pick a property from an object", () => {
    const obj = { a: 10, b: 20, c: 30 }
    expect(pick("a")(obj)).toBe(10)
    expect(pick("b")(obj)).toBe(20)
    // @ts-ignore key does not exist
    expect(pick("x")(obj)).toBeFalsy() // Should fail
  })
})

describe("listAdd", () => {
  it("should sum up selected property from an array of objects", () => {
    const list = [{ x: 5 }, { x: 10 }, { x: 15 }]
    expect(listAdd("x")(list)).toBe(30)
  })
})

describe("product", () => {
  it("should calculate the product of two picked properties", () => {
    const obj = { a: 2, b: 3 }
    const pickA = pick("a")
    const pickB = pick("b")
    expect(product(pickA, pickB)(obj)).toBe(6)
  })
})

describe("avgBy", () => {
  it("should calculate the average of a property from an array of objects", () => {
    type ListItem = {
      x: number
      y: number
    }

    const list: ListItem[] = [
      { x: 10, y: 10 }, // 100
      { x: 20, y: 10 }, // 200
      { x: 30, y: 10 }, // 300
    ] // productSum = 600
    // xTotal = 60
    // 600 / 60 * 100 = 1000
    expect(avgBy<ListItem, number>("x")("y")(list)).toBe(1000)
  })
})

describe("avg", () => {
  it("calculates the average of an array of numbers", () => {
    const numbers = [1, 2, 3, 4, 5]
    expect(avg(numbers)).toBe(3)
  })

  it("returns NaN for an empty array", () => {
    const emptyArray: number[] = []
    expect(avg(emptyArray)).toBeNaN()
  })

  it("handles negative numbers correctly", () => {
    const negativeNumbers = [-1, -2, -3, -4, -5]
    expect(avg(negativeNumbers)).toBe(-3)
  })
})

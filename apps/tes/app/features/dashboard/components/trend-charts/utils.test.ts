// import { TREE_CANOPY_COVER, TREES_PER_PERSON } from "../../dashboard.constants"
// import { formatDiff } from "./utils"

// describe("formatDiff", () => {
//   test("TREE_CANOPY_COVER diff under 0", () => {
//     const type = TREE_CANOPY_COVER
//     const diff = 0.5
//     expect(formatDiff(diff, type)).toEqual("1% more tree canopy")
//   })
//   test("TREE_CANOPY_COVER diff above 0", () => {
//     const type = TREE_CANOPY_COVER
//     const diff = 10
//     expect(formatDiff(diff, type)).toEqual("10% more tree canopy")
//   })
//   test("TREE_CANOPY_COVER diff above 100", () => {
//     const type = TREE_CANOPY_COVER
//     const diff = 101
//     expect(formatDiff(diff, type)).toEqual("2.0 times more tree canopy")
//   })

//   test("TREES_PER_PERSON diff under 0", () => {
//     const type = TREES_PER_PERSON
//     const diff = 0.5
//     expect(formatDiff(diff, type)).toEqual("0.5 additional trees per person")
//   })
//   test("TREES_PER_PERSON diff above 0", () => {
//     const type = TREES_PER_PERSON
//     const diff = 10
//     expect(formatDiff(diff, type)).toEqual("10.0 additional trees per person")
//   })
//   test("TREES_PER_PERSON diff above 100", () => {
//     const type = TREES_PER_PERSON
//     const diff = 101
//     expect(formatDiff(diff, type)).toEqual("101.0 additional trees per person")
//   })
// })

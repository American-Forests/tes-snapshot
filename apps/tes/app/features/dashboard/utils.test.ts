// import { getBinnedBlockgroups } from "./utils"
// import { Blockgroup } from "db"

// describe("getBinnedBlockgroups", () => {
//   it("sorts thresholds in ascending order", () => {
//     const data: Partial<Blockgroup>[] = [
//       { id: "1", tree_equity_score: 80 },
//       { id: "2", tree_equity_score: 75 },
//       { id: "3", tree_equity_score: 70 },
//     ]
//     const thresholds = [75, 70, 80] // Unsorted thresholds
//     const attribute: keyof Blockgroup = "tree_equity_score"

//     const result = getBinnedBlockgroups({ data, thresholds, attribute })

//     // Check if the thresholds are sorted in ascending order
//     expect(result[0].map((obj) => obj.tree_equity_score)).toEqual([70])
//     expect(result[1].map((obj) => obj.tree_equity_score)).toEqual([75])
//     expect(result[2].map((obj) => obj.tree_equity_score)).toEqual([80])
//     expect(result[3].map((obj) => obj.tree_equity_score)).toEqual([])
//   })

//   test("getBinnedBlockgroups with empty data array", () => {
//     const data: Partial<Blockgroup>[] = []
//     const thresholds = [69, 74, 79, 84, 89, 94, 99]
//     const attribute: keyof Blockgroup = "tree_equity_score"

//     const result = getBinnedBlockgroups({ data, thresholds, attribute })

//     expect(result).toEqual([[], [], [], [], [], [], [], []])
//   })

//   test("getBinnedBlockgroups with data array containing objects with attribute values equal to the thresholds", () => {
//     const data: Partial<Blockgroup>[] = [
//       {
//         tree_equity_score: 69,
//       },
//       {
//         tree_equity_score: 74,
//       },
//       {
//         tree_equity_score: 99,
//       },
//     ]
//     const thresholds = [69, 74, 79, 84, 89, 94, 99]
//     const attribute: keyof Blockgroup = "tree_equity_score"

//     const result = getBinnedBlockgroups({ data, thresholds, attribute })

//     expect(result).toEqual([[data[0]], [data[1]], [], [], [], [], [data[2]], []])
//   })
// })

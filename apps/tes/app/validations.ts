import { z } from "zod"

export const CreateScenario = z.object({
  name: z.string().nonempty().max(512),
  city: z.string().nonempty().max(512),
})

export const RenameScenario = z.object({
  name: z.string().nonempty().max(512),
})

const TreesBase = z.object({
  treesSmall: z.number().int(),
  treesMedium: z.number().int(),
  treesLarge: z.number().int(),
})

export const UpdateAreaOnScenario = TreesBase.extend({
  name: z.string().nullable(),
  scenarioId: z.number().int(),
  areaId: z.string(),
})

export const CreateAreaOnScenario = TreesBase.extend({
  scenarioId: z.number().int(),
  areaId: z.string(),
})

export const DeleteAreaOnScenario = z.object({
  scenarioId: z.number().int(),
  areaId: z.string(),
})

export const UpdateBlockgroupOnScenario = z.object({
  name: z.string(),
  treeEquityScoreTarget: z.number(),
  scenarioId: z.number().int(),
  blockgroupId: z.string(),
  targetArea: z.number(),
  trees: z.number().int().optional(),
})

export const RenameScenarioBlockgroup = z.object({
  name: z.string(),
  treeEquityScoreTarget: z.number(),
  scenarioId: z.number().int(),
  blockgroupId: z.string(),
  targetArea: z.number(),
})

export const DeleteBlockgroupOnScenario = z.object({
  scenarioId: z.number().int(),
  blockgroupId: z.string(),
})

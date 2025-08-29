import { Area, AreaOnScenario, Blockgroup, BlockgroupOnScenario } from "db"

export type ScenarioArea = AreaOnScenario & { area: Area }
export type ScenarioBlockgroup = BlockgroupOnScenario & { blockgroup: Blockgroup }

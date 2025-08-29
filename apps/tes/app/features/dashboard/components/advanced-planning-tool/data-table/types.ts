import type { Blockgroup } from "db"
export type BlockgroupWithType = Blockgroup & { type: string }
export type BlockgroupWithDerivedData = BlockgroupWithType & {
  delta_score: number
  canopy_target: number
  planting_need: number
}
export type ColumnsConfig = {
  accessorKey: string
  header: string
  toolTipContent?: string
  cellFormatter?: (
    row: BlockgroupWithDerivedData,
    accessorKey: string,
  ) => JSX.Element | string | number
}[]

export enum BlockgroupTableIds {
  Id = "id",
  TreeEquityScore = "tree_equity_score",
  DeltaScore = "delta_score",
  TreeCanopy = "tree_canopy",
  TreeCanopyGain = "tree_canopy_gain",
  PlantingNeed = "planting_need",
  TotalPopulation = "total_population",
  PovertyPercent = "poverty_percent",
  PocPercent = "poc_percent",
  UnemploymentRate = "unemployment_rate",
  Age = "dependent_ratio",
  Lang = "linguistic_isolation",
  HealthRisk = "health_normalized",
  Temperature = "temperature",
  BlockGroups = "block_groups",
  Municipality = "municipality_slug",
  Center = "center"
}

export type BlockgroupTableRowData = {
  [BlockgroupTableIds.Id]: string;
  [BlockgroupTableIds.TreeEquityScore]: number;
  [BlockgroupTableIds.TreeCanopy]: number;
  [BlockgroupTableIds.TreeCanopyGain]: number;
  [BlockgroupTableIds.PlantingNeed]: number;
  [BlockgroupTableIds.TotalPopulation]: number;
  [BlockgroupTableIds.PovertyPercent]: number;
  [BlockgroupTableIds.PocPercent]: number;
  [BlockgroupTableIds.UnemploymentRate]: number;
  [BlockgroupTableIds.Age]: number;
  [BlockgroupTableIds.Lang]: number;
  [BlockgroupTableIds.HealthRisk]: number;
  [BlockgroupTableIds.Temperature]: number;
  [BlockgroupTableIds.BlockGroups]: number;
  [BlockgroupTableIds.Municipality]: string;
  [BlockgroupTableIds.Center]: [number, number];
};

export enum LocalityTableIds {
  Id = "id",
  LocalityName = "locality_name",
  CompositeScore = "composite_score",
  DeltaScore = "delta_score",
  TreeCanopy = "tree_canopy",
  TreeCanopyGain = "tree_canopy_gain",
  TreesNeeded = "trees_needed",
  TargetedBlockgroups = "targeted_blockgroups",
  TotalPopulation = "total_population",
  PovertyPercent = "poverty_percent",
  PocPercent = "poc_percent",
  UnemploymentRate = "unemployment_rate",
  Age = "senior_percent",
  Lang = "linguistic_isolation",
  Area = "area",
  HealthRisk = "health_normalized",
  BlockgroupCount = "blockgroup_count",
  Municipality = "municipality_slug",
  Center = "center"
}

export type LocalityTableRowData = {
  [LocalityTableIds.Id]: string;
  [LocalityTableIds.LocalityName]: string;
  [LocalityTableIds.CompositeScore]: number;
  [LocalityTableIds.DeltaScore]: number;
  [LocalityTableIds.TreeCanopy]: number;
  [LocalityTableIds.TreeCanopyGain]: number;
  [LocalityTableIds.TreesNeeded]: number;
  [LocalityTableIds.TargetedBlockgroups]: number;
  [LocalityTableIds.TotalPopulation]: number;
  [LocalityTableIds.PovertyPercent]: number;
  [LocalityTableIds.PocPercent]: number;
  [LocalityTableIds.UnemploymentRate]: number;
  [LocalityTableIds.Age]: number;
  [LocalityTableIds.Lang]: number;
  [LocalityTableIds.Area]: number;
  [LocalityTableIds.HealthRisk]: number;
  [LocalityTableIds.BlockgroupCount]: number;
  [LocalityTableIds.Municipality]: string;
  [LocalityTableIds.Center]: [number, number];
}

export const LOCALITY_PLANNING_TOOL_TYPE = "LOCALITY"
export const BLOCKGROUP_PLANNING_TOOL_TYPE = "BLOCKGROUP"
export type AdvancedPlanningToolType =
  | typeof BLOCKGROUP_PLANNING_TOOL_TYPE
  | typeof LOCALITY_PLANNING_TOOL_TYPE

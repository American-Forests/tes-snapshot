import {
  NeighbourhoodLikeScoreHeader,
  TesGainCell,
  NeighbourhoodLikeNameCell,
  TargetScoreBar,
} from "ui"

import type { ColumnDef, Cell, Table } from "@tanstack/react-table"

import { BlockgroupTableRowData, BlockgroupTableIds } from "../types"
import { calculateDeltaScore } from "app/features/dashboard/utils"
import { formatNumber } from "utils"
import { BLOCKGROUP_TABLE_HEADERS_DICTIONARY } from "app/features/dashboard/dashboard.constants"
import { useTranslation } from "react-i18next"
import { TranslatedTableHeader } from "../../translated-table-header"

const hintsNamespace = "location-insights:advanced_planning_tools.table_hints"
const headersNamespace = "location-insights:advanced_planning_tools.table_headers"

const DefaultCell = ({ cell }: { cell: Cell<BlockgroupTableRowData, string | number | null> }) => (
  <>{`${Math.round(100 * Number(cell.getValue()))}%`}</>
)

const HealthCell = ({ cell }: { cell: Cell<BlockgroupTableRowData, string | number | null> }) => (
  <>{`${Math.round(100 * Number(cell.getValue()))}`}</>
)

const HeatCell = ({ cell }: { cell: Cell<BlockgroupTableRowData, string | number | null> }) => (
  <>{`${Number(cell.getValue()) > 0 ? "+" : ""}${formatNumber(
    Number(cell.getValue()),
    1,
    "en-us"
  )}°F`}</>
)

function TranslatedNeighbourhoodLikeScoreHeader <TData>({
  table
}: {
  table: Table<TData>
}) {
  const {t} = useTranslation(["location-insights"])
  return <NeighbourhoodLikeScoreHeader table={table} title={t("location-insights:advanced_planning_tools.target_score")} blockgroupsTitle={t("location-insights:advanced_planning_tools.target_blockgroups")} />
}

export const blockgroupTableColumns: Array<
  ColumnDef<BlockgroupTableRowData, number | string | null> & {
    accessorKey: BlockgroupTableIds
  }
> = [
  {
    accessorKey: BlockgroupTableIds.Id,
    header: ({ table }) => <TranslatedNeighbourhoodLikeScoreHeader table={table} />,
    cell: ({ cell }) => {
      return <NeighbourhoodLikeNameCell cell={cell} />
    },
  },
  {
    accessorKey: BlockgroupTableIds.TreeEquityScore,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.TreeEquityScore]}`}
        toolTipContent={`${hintsNamespace}.tree_equity_score`}
        className="w-5 ml-5"
      />
    ),
    cell: ({ table, cell }) => {
      const score = Number(cell.getValue())
      const targetScore = table.options.meta?.targetScore
      const deltaScore = calculateDeltaScore(score, targetScore)
      return <TargetScoreBar score={score} deltaScore={deltaScore} />
    },
  },
  {
    accessorKey: BlockgroupTableIds.DeltaScore,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.DeltaScore]}`}
        toolTipContent={`${hintsNamespace}.delta_score`}
      />
    ),
    cell: ({ table, row, cell }) => {
      const currentScore = row.getValue(BlockgroupTableIds.TreeEquityScore) as number
      const targetScore = table.options.meta?.targetScore
      const deltaScore = calculateDeltaScore(currentScore, targetScore)
      return <TesGainCell cell={cell} deltaScore={deltaScore} />
    },
  },
  {
    accessorKey: BlockgroupTableIds.TreeCanopy,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.TreeCanopy]}`}
        toolTipContent={`${hintsNamespace}.tree_canopy`}
      />
    ),
    cell: ({ cell }) => <>{formatNumber(Number(cell.getValue()) * 100, 1, "en-us").concat("%")}</>,
  },
  {
    accessorKey: BlockgroupTableIds.TreeCanopyGain,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.TreeCanopyGain]}`}
        toolTipContent={`${hintsNamespace}.tree_canopy_gain`}
      />
    ),
    cell: ({ cell }) => <>{`+${formatNumber(Number(cell.getValue()) * 100, 1, "en-us")}%`}</>,
  },
  {
    accessorKey: BlockgroupTableIds.PlantingNeed,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.PlantingNeed]}`}
        toolTipContent={`${hintsNamespace}.trees_needed`}
      />
    ),
    cell: ({ cell }) => <>{String(formatNumber(Number(cell.getValue()), 0, "en-us"))}</>,
  },
  {
    accessorKey: BlockgroupTableIds.TotalPopulation,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.TotalPopulation]}`}
        toolTipContent={`${hintsNamespace}.total_population`}
      />
    ),
    cell: ({ cell }) => <>{String(formatNumber(Number(cell.getValue()), 0, "en-us"))}</>,
  },
  {
    accessorKey: BlockgroupTableIds.PovertyPercent,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.PovertyPercent]}`}
        toolTipContent={`${hintsNamespace}.poverty_percent`}
      />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: BlockgroupTableIds.PocPercent,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.PocPercent]}`}
        toolTipContent={`${hintsNamespace}.poc_percent`}
      />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: BlockgroupTableIds.UnemploymentRate,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.UnemploymentRate]}`}
        toolTipContent={`${hintsNamespace}.unemployment`}
      />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: BlockgroupTableIds.Age,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.Age]}`}
        toolTipContent={`${hintsNamespace}.age`}
      />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: BlockgroupTableIds.Lang,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.Lang]}`}
        toolTipContent={`${hintsNamespace}.linguistic_isolation`}
      />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: BlockgroupTableIds.HealthRisk,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.HealthRisk]}`}
        toolTipContent={`${hintsNamespace}.health_burden`}
      />
    ),
    cell: HealthCell,
  },
  {
    accessorKey: BlockgroupTableIds.Temperature,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${BLOCKGROUP_TABLE_HEADERS_DICTIONARY[BlockgroupTableIds.Temperature]}`}
        toolTipContent={`${hintsNamespace}.heat_disparity`}
      />
    ),
    cell: HeatCell,
  },
]

import { TesGainCell, HigherAdminCell, TargetScoreHeader, TargetScoreBar } from "ui"
import type { ColumnDef, Cell } from "@tanstack/react-table"
import { LocalityTableRowData, LocalityTableIds } from "../types"
import { formatNumber } from "utils"
import { LOCALITY_TABLE_HEADERS_DICTIONARY } from "app/features/dashboard/dashboard.constants"
import { TranslatedTableHeader } from "../../translated-table-header"
import { useTranslation } from "react-i18next"
const hintsNamespace = "location-insights:advanced_planning_tools.table_hints"
const headersNamespace = "location-insights:advanced_planning_tools.table_headers"
const PercentCell = ({ cell }: { cell: Cell<LocalityTableRowData, number | string | null> }) => (
  <>{`${formatNumber(Number(cell.getValue()), 0, "en-us")}%`}</>
)

const DefaultCell = ({ cell }: { cell: Cell<LocalityTableRowData, string | number | null> }) => (
  <>{`${formatNumber(Number(cell.getValue()), 0, "en-us")}`}</>
)

function TranslatedLocalityLikeScoreHeader ({
  targetScore,
}: {
  targetScore?: number
}) {
  const {t} = useTranslation(["location-insights"])
  return <TargetScoreHeader targetScore={targetScore} title={t("location-insights:advanced_planning_tools.target_score")} />
}

export const localityTableColumns: Array<
  ColumnDef<LocalityTableRowData, number | string | null> & {
    accessorKey: LocalityTableIds
  }
> = [
  {
    accessorKey: LocalityTableIds.LocalityName,
    header: ({ table }) => <TranslatedLocalityLikeScoreHeader targetScore={table.options.meta?.targetScore}/>,
    cell: ({ cell, table }) => {
      const localityId = table.options.data.find((row) => row.locality_name === cell.getValue())?.id
      const href = localityId ? `../place/${localityId}` : undefined
      return <HigherAdminCell cell={cell} href={href} />
    },
  },
  {
    accessorKey: LocalityTableIds.CompositeScore,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.CompositeScore]}`}
        toolTipContent={`${hintsNamespace}.locality_tree_composite_score`}
        className="w-5 ml-5"
      />
    ),
    // TODO: correctly calculate composite score
    cell: ({ cell, row }) => (
      <TargetScoreBar
        score={cell.getValue() as number}
        deltaScore={row.getValue(LocalityTableIds.DeltaScore)}
      />
    ),
  },
  {
    accessorKey: LocalityTableIds.DeltaScore,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.DeltaScore]}`}
        toolTipContent={`${hintsNamespace}.localty_delta_score`}
      />
    ),
    cell: ({ cell }) => <TesGainCell cell={cell} deltaScore={cell.getValue() as number} />,
  },
  {
    accessorKey: LocalityTableIds.TreeCanopy,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.TreeCanopy]}`}
        toolTipContent={`${hintsNamespace}.locality_tree_canopy`}
      />
    ),
    cell: PercentCell,
  },
  {
    accessorKey: LocalityTableIds.TreeCanopyGain,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.TreeCanopyGain]}`}
        toolTipContent={`${hintsNamespace}.locality_tree_canopy_gain`}
      />
    ),
    cell: ({ cell }) => <>{`+${formatNumber(Number(cell.getValue()), 1, "en-us")}%`}</>,
  },
  {
    accessorKey: LocalityTableIds.TreesNeeded,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.TreesNeeded]}`}
        toolTipContent={`${hintsNamespace}.locality_trees_needed`}
      />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: LocalityTableIds.TargetedBlockgroups,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.TargetedBlockgroups]}`}
        toolTipContent={`${hintsNamespace}.locality_targeted_blockgroups`}
      />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: LocalityTableIds.TotalPopulation,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.TotalPopulation]}`}
        toolTipContent={`${hintsNamespace}.locality_total_population`}
      />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: LocalityTableIds.PovertyPercent,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.PovertyPercent]}`}
        toolTipContent={`${hintsNamespace}.poverty_percent`}
      />
    ),
    cell: PercentCell,
  },
  {
    accessorKey: LocalityTableIds.PocPercent,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.PocPercent]}`}
        toolTipContent={`${hintsNamespace}.poc_percent`}
      />
    ),
    cell: PercentCell,
  },
  {
    accessorKey: LocalityTableIds.UnemploymentRate,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.UnemploymentRate]}`}
        toolTipContent={`${hintsNamespace}.unemployment`}
      />
    ),
    cell: PercentCell,
  },
  {
    accessorKey: LocalityTableIds.Age,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.Age]}`}
        toolTipContent={`${hintsNamespace}.age`}
      />
    ),
    cell: PercentCell,
  },
  {
    accessorKey: LocalityTableIds.Lang,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.Lang]}`}
        toolTipContent={`${hintsNamespace}.linguistic_isolation`}
      />
    ),
    cell: PercentCell,
  },
  {
    accessorKey: LocalityTableIds.HealthRisk,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.HealthRisk]}`}
        toolTipContent={`${hintsNamespace}.health_burden`}
      />
    ),
    cell: DefaultCell,
  },
  {
    accessorKey: LocalityTableIds.BlockgroupCount,
    header: () => (
      <TranslatedTableHeader
        header={`${headersNamespace}.${LOCALITY_TABLE_HEADERS_DICTIONARY[LocalityTableIds.BlockgroupCount]}`}
        toolTipContent={`${hintsNamespace}.locality_blockgroup_count`}
      />
    ),
    cell: DefaultCell,
  },
]

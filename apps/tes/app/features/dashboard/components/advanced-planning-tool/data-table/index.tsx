import { Table } from "ui"
import { useAtomValue, useSetAtom } from "jotai"
import { kebabCase } from "lodash"
import { blockgroupTableColumns } from "./columns/blockgroups"
import { localityTableColumns } from "./columns/localities"
import {
  hoveredRowAtom,
  selectedRowAtom,
  tableDataAtom,
  targetScoreDebouncedAtom,
} from "app/features/dashboard/dashboard.state"
import { BlockgroupTableIds, BlockgroupTableRowData, LocalityTableIds, LocalityTableRowData } from "./types"
import {
  BLOCKGROUP_PLANNING_TOOL_TYPE,
  BLOCKGROUP_TABLE_HEADERS_DICTIONARY,
  LOCALITY_PLANNING_TOOL_TYPE,
  LOCALITY_TABLE_HEADERS_DICTIONARY,
} from "app/features/dashboard/dashboard.constants"
import { getTableHeaders, sortTableDataByEquityScore } from "app/features/dashboard/utils"

type DataTableProps =
  | {
      type: typeof BLOCKGROUP_PLANNING_TOOL_TYPE
      title: string
    }
  | {
      type: typeof LOCALITY_PLANNING_TOOL_TYPE
      title: string
    }

export const DataTable = ({ type, title }: DataTableProps) => {
  const targetScore = useAtomValue(targetScoreDebouncedAtom)
  const setHoveredRow = useSetAtom(hoveredRowAtom)
  const setSelectedRow = useSetAtom(selectedRowAtom)
  const csvFileName = `${kebabCase(`${title}-${targetScore}`)}.csv`
  const tableData = useAtomValue(tableDataAtom)
  const csvHeaders =
    type === BLOCKGROUP_PLANNING_TOOL_TYPE
      ? getTableHeaders(BLOCKGROUP_TABLE_HEADERS_DICTIONARY)
      : getTableHeaders(LOCALITY_TABLE_HEADERS_DICTIONARY)
  if (type === BLOCKGROUP_PLANNING_TOOL_TYPE) {
    return (
      <Table
        columns={blockgroupTableColumns}
        data={tableData as BlockgroupTableRowData[]}
        csvHeaders={csvHeaders}
        csvFileName={csvFileName}
        csvSortingFunction={sortTableDataByEquityScore}
        targetScore={targetScore}
        setHoveredRow={setHoveredRow}
        setSelectedRow={setSelectedRow}
        sortOn={BlockgroupTableIds.TreeEquityScore}
      />
    )
  } else {
    return (
      <Table
        columns={localityTableColumns}
        data={tableData as LocalityTableRowData[]}
        csvHeaders={csvHeaders}
        csvFileName={csvFileName}
        csvSortingFunction={sortTableDataByEquityScore}
        targetScore={targetScore}
        setHoveredRow={setHoveredRow}
        setSelectedRow={setSelectedRow}
        sortOn={LocalityTableIds.CompositeScore}
      />
    )
  }
}

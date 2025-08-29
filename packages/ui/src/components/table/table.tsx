import { useState } from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  RowData,
} from "@tanstack/react-table"

import {
  Table as TablePrimitive,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/table-primitives"
import { Pagination } from "./components/pagination"
import DownloadCsvButton from "../download-csv"
import { Data } from "react-csv/lib/core"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  csvHeaders?: { label: string; key: string }[]
  csvFileName?: string
  csvSortingFunction?: (data: TData[]) => TData[]
  maxRowsPerPage?: number
  sortOn: keyof TData
  targetScore: number
  setHoveredRow: (row: TData | null) => void
  setSelectedRow: (row: TData | null) => void
}

/**
 * We need to declare the meta type here to avoid
 * typescript errors. See the docs (https://tanstack.com/table/v8/docs/api/core/table#meta) and
 * this example (https://tanstack.com/table/latest/docs/framework/react/examples/editable-data)
 * for more info.
 */
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    removeRow: (rowIndex: number) => void
    targetScore: number
    length: number
  }
}

export function Table<TData, TValue>({
  columns,
  data,
  csvHeaders,
  csvFileName,
  csvSortingFunction = (data) => data,
  maxRowsPerPage = 8,
  targetScore,
  setHoveredRow,
  setSelectedRow,
  sortOn,
}: DataTableProps<TData, TValue>) {
  // Auto sort by Tree Equity Score on load
  const [sorting, setSorting] = useState<SortingState>([
    { id: sortOn as string, desc: false },
  ])

  const table = useReactTable<TData>({
    data: data.length ? data : ([{}] as TData[]), // Provide a dummy row if data is empty
    columns,
    autoResetPageIndex: false, // to avoid resetting when deleting a row
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    autoResetExpanded: false,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: maxRowsPerPage,
        pageIndex: 0,
      },
      // We add the link to locality as a column so is available on every row
      // but we don't intend to show it.
      // columnVisibility: hiddenColumnsKey
      //   ? {
      //       [hiddenColumnsKey]: false,
      //     }
      //   : undefined,
    },
    meta: {
      // global object accessible in all cells
      removeRow: (rowIndex: number) => {
        console.log("row to be removed", rowIndex)
        console.log(data)
        // if (!setData) return;
        // const removeRowFilterFn = (old: TData[]) => {
        //   if (old.length === 1) return old; // To avoid removing the last row
        //   return old.filter((_row: TData, index: number) => index !== rowIndex);
        // };

        // setData(removeRowFilterFn);
      },
      targetScore,
      length: data.length,
    },
  })

  const pageCount = table.getPageCount()
  const { pageIndex } = table.getState().pagination
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)

  // If the user is on the last page and removes all rows,
  // go to the new last page.
  if (pageIndex > pageCount - 1) {
    table.setPageIndex(pageCount - 1)
  }

  const showPagination = data.length > maxRowsPerPage
  const csvData = csvSortingFunction(data)
  return (
    <div className="flex flex-col rounded-md text-[#005251] relative">
      <DownloadCsvButton
        data={csvData as unknown as Data}
        headers={csvHeaders}
        filename={csvFileName}
        className="absolute top-0 right-0"
      />
      <TablePrimitive>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {data.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${
                  selectedRowId
                    ? selectedRowId === row.id
                      ? "bg-gray-200 hover:bg-gray-200"
                      : "hover:bg-transparent"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  if (selectedRowId === row.id) {
                    setSelectedRowId(null)
                    setSelectedRow(null)
                  } else {
                    setSelectedRowId(row.id)
                    setSelectedRow(row.original)
                  }
                }}
                onMouseEnter={() => {
                  setHoveredRow(row.original)
                }}
                onMouseLeave={() => {
                  setHoveredRow(null)
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No block groups under this target score. Use the slider to set a
                higher target.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TablePrimitive>
      {showPagination ? <Pagination table={table} /> : null}
    </div>
  )
}

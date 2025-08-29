'use client'
import { twMerge } from "tailwind-merge"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

import { usePagination } from "react-hooks"

import type { Table } from "@tanstack/react-table"
import type { PageItem } from "react-hooks"

export function Pagination<TData>({ table }: { table: Table<TData> }) {
  const baseCX =
    "min-w-[1.95rem] min-h-[1.95rem] p-[6px] pl-[5px] rounded-full text-annotation font-bold"
  const btnCX = twMerge(
    baseCX,
    "transition-colors duration-150 ease-in-out hover:bg-brand-gray-pale disabled:hover:bg-transparent disabled:text-brand-gray-dark"
  )
  const activeCX =
    "bg-brand-green-dark text-sm text-white hover:bg-brand-green-dark"

  const pages = usePagination({
    handleClick: (
      event: React.MouseEvent<HTMLElement>,
      value: number | null
    ) => {
      value !== null && table.setPageIndex(value - 1)
    },
    page: table.getState().pagination.pageIndex + 1,
    count: table.getPageCount(),
  })

  return (
    <div className="flex items-center justify-center space-x-1 py-4">
      {pages.map((pageItem: PageItem) => {
        const { onClick, page, disabled, type, selected } = pageItem
        return (
          <>
            {type === "previous" && (
              <button
                className={twMerge(btnCX)}
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                <ChevronLeftIcon />
              </button>
            )}
            {type === "start-ellipsis" && (
              <span className={twMerge(baseCX)}>{"..."}</span>
            )}
            {type === "page" && (
              <button
                className={twMerge(btnCX, selected ? activeCX : "")}
                disabled={disabled}
                onClick={onClick}
              >
                {page}
              </button>
            )}
            {type === "end-ellipsis" && (
              <span className={twMerge(baseCX)}>{"..."}</span>
            )}
            {type === "next" && (
              <button
                className={twMerge(btnCX)}
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                <ChevronRightIcon />
              </button>
            )}
          </>
        )
      })}
    </div>
  )
}

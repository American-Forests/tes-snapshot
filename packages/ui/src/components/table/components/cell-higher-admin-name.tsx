'use client'
import { ExternalLinkIcon } from "@radix-ui/react-icons"
import type { Cell } from "@tanstack/react-table"

interface HigherAdminCellProps<TData, TValue> {
  cell: Cell<TData, TValue>
  href?: string
}

export const HigherAdminCell = <TData, TValue>({
  cell,
  href,
}: HigherAdminCellProps<TData, TValue>) => {
  return (
    <div className="flex min-w-60 items-center">
      {`${cell.getValue()}`}{" "}
      {href && (
        <a
          href={href}
          target="_blank"
          className="ml-2 size-4 text-brand-green transition-colors duration-200 ease-in-out hover:text-brand-green-dark"
        >
          <ExternalLinkIcon />
        </a>
      )}
    </div>
  )
}

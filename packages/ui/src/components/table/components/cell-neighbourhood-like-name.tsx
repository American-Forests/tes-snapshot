'use client'
import { TrashIcon } from "@radix-ui/react-icons"
import type { Cell } from "@tanstack/react-table"

interface NeighbourhoodLikeNameCellProps<TData, TValue> {
  cell: Cell<TData, TValue>
  removeRow?: (rowIndex: number) => void
}
export const NeighbourhoodLikeNameCell = <TData, TValue>({
  cell,
  removeRow,
}: NeighbourhoodLikeNameCellProps<TData, TValue>) => {
  return (
    <div className="flex min-w-60 items-center">
      {`BG ${cell.getValue()}`}{" "}
      {removeRow && (
        <TrashIcon
          className="ml-2 size-4 text-brand-green transition-colors duration-200 ease-in-out hover:text-brand-green-dark"
          onClick={() => removeRow(cell.row.index)}
        />
      )}
    </div>
  )
}

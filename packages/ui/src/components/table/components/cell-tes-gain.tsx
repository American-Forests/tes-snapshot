import type { Cell } from "@tanstack/react-table"
import { formatNumber } from "utils"

interface TesGainCellProps<TData, TValue> {
  cell: Cell<TData, TValue>
  deltaScore: number
}

export const TesGainCell = <TData, TValue>({
  cell,
  deltaScore,
}: TesGainCellProps<TData, TValue>) => {
  return (
    <>{`${deltaScore !== 0 ? "+" : ""}${formatNumber(
      deltaScore,
      0,
      "en-us"
    )}`}</>
  )
}

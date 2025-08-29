'use client'
import { DownloadIcon } from "@radix-ui/react-icons"
import { CSVLink } from "react-csv"
import type { Data, Headers } from "react-csv/lib/core"
import { twMerge } from "tailwind-merge"

export default function DownloadCsvButton({
  data,
  headers,
  filename = "tree_equity_score.csv",
  className,
}: {
  data: Data
  headers?: Headers
  filename?: string
  className?: string
}) {
  return (
    <CSVLink
      data={data as Data}
      separator={","}
      filename={filename}
      headers={headers}
      className={twMerge(
        "w-6 h-6 z-20 mr-3 flex size-6 items-center justify-center rounded-full bg-brand-green-dark mb-6 hover:bg-brand-green",
        className
      )}
    >
      <DownloadIcon className="size-4 text-white" />
    </CSVLink>
  )
}

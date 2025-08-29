'use client'
import { useState, Suspense } from "react"

import { Combobox } from "@headlessui/react"
import { MagnifyingGlassIcon, SymbolIcon } from "@radix-ui/react-icons"

import { SearchResult } from "./search-result"
import { ReportLink } from "./report-link"
import type {
  ReportAreasFromQueryQueryAndFormatter,
  Report,
  OpenSearchTabData,
} from "../types"

const ResultRow = ({
  items,
  linkFormat,
}: {
  items: Report[]
  linkFormat: ReportAreasFromQueryQueryAndFormatter[1]
}) => {
  return (
    <>
      {items?.map((item, i) => (
        <SearchResult value={item.id} key={i}>
          <ReportLink href={linkFormat(item)}>{item.displayName}</ReportLink>
        </SearchResult>
      ))}
    </>
  )
}

function SearchResults({
  searchQuery,
  data,
}: {
  searchQuery: string
  data: any
}) {
  const [items] = data.loadQuery(searchQuery)
  return (
    <div className="h-[350px] overflow-y-auto p-4">
      {!items ||
        (!Boolean(items.length) && (
          <p className="text-sm text-gray-700 pl-2">{data.description}</p>
        ))}
      {items && Boolean(items.length) && (
        <Combobox.Options className="grid grid-cols-2">
          <ResultRow items={items!} linkFormat={data.format} />
        </Combobox.Options>
      )}
    </div>
  )
}

export function OpenSearch({ data }: { data: OpenSearchTabData }) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  return (
    <div className="flex flex-col items-start h-full p-4 overflow-hidden">
      <Combobox value={null} onChange={() => null}>
        <div className="flex flex-row rounded-full border border-gray-400 justify-between bg-gray-100 items-center px-2 w-[300px]">
          <Combobox.Input
            onChange={(event) => {
              setSearchQuery(event.target.value)
            }}
            className="text-gray-800 block w-full text-md border-none focus:ring-0 rounded-full ring-0 bg-gray-100"
            placeholder={data.placeholder}
          />
          <MagnifyingGlassIcon className="w-6 h-6 text-gray-600 pointer-events-none" />
        </div>
        <div className="h-full max-h-full overflow-y-auto">
          <Suspense
            fallback={
              <div className="p-2 flex items-center justify-center gap-x-2 py-4 text-gray-500">
                <SymbolIcon />
                Loading…
              </div>
            }
          >
            <SearchResults searchQuery={searchQuery} data={data} />
          </Suspense>
        </div>
      </Combobox>
    </div>
  )
}

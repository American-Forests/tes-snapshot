'use client'
import { useState, Suspense } from "react"

import { ChevronDownIcon, SymbolIcon } from "@radix-ui/react-icons"
import { Combobox } from "@headlessui/react"

import { ReportLink } from "./report-link"
import type {
  ReportAreaFromRegionAndSubRegion,
  FilteredSearchTabData,
} from "../types"

function SearchResults({
  data,
  regionId,
  subRegionId,
}: {
  data: ReportAreaFromRegionAndSubRegion
  regionId: string
  subRegionId: string
}) {
  const { loadQuery, format } = data
  const [reportAreas] = loadQuery(regionId, subRegionId)

  return (
    <div className="flex flex-row flex-wrap overflow-auto">
      {reportAreas &&
        format.items(reportAreas).map((item) => {
          return (
            <ReportLink className="min-w-[80px]" href={format.href(item)}>
              {format.title(item)}
            </ReportLink>
          )
        })}
    </div>
  )
}

export function FilteredSearch({ data }: { data: FilteredSearchTabData }) {
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const [selectedSubregion, setSelectedSubregion] = useState<string>("")
  const [regionQuery, setRegionQuery] = useState<string>("")
  const [subregionQuery, setSubregionQuery] = useState<string>("")

  if (!data.queries) return null

  const regionData = data.queries.getRegions
  const subRegionData = data.queries.getSubRegions

  const [regions] = regionData.loadQuery()
  const [subRegion] = subRegionData.loadQuery(selectedRegion)

  const filteredRegions =
    Boolean(regionQuery) && regions
      ? regions.filter((c) => c.displayName === regionQuery)
      : regions

  const regionId =
    regions && regions.find((c) => c.displayName === selectedRegion)?.id

  const filteredSubregions = Boolean(subregionQuery)
    ? subRegion?.filter((l) => l.displayName === subregionQuery)
    : subRegion

  const subRegionId = subRegion?.find(
    (l) => l.displayName === selectedSubregion
  )?.id

  return (
    <div className="flex flex-col p-4 h-full">
      <p className="text-sm text-gray-700 pb-4">{data.description}</p>
      {/** search by state and city inputs */}
      <div className="flex flex-row justify-start mb-4">
        <Combobox value={selectedRegion} onChange={(value) => value && setSelectedRegion(value)}>
          <div className="relative">
            <p className="text-gray-600 font-semibold text-xs">
              {regionData.title}
            </p>
            <div className="relative mr-4">
              <Combobox.Input
                className="rounded-md py-1.5 border-gray-400 text-sm focus:ring-0 focus:border-gray-400"
                onChange={(event) => setRegionQuery(event.target.value)}
                placeholder={regionData.placeholder}
              ></Combobox.Input>
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>

            <Combobox.Options>
              <div className="w-[186px] h-fit max-h-[280px] overflow-auto rounded-md shadow-md border border-gray-300 absolute top-[54px] bg-white text-brand-green-dark text-sm -space-y-1">
                {filteredRegions &&
                  filteredRegions.map((region, i) => {
                    return (
                      <Combobox.Option
                        value={region.id}
                        key={i}
                        className="p-2 hover:bg-gray-100"
                      >
                        {region.displayName}
                      </Combobox.Option>
                    )
                  })}
              </div>
            </Combobox.Options>
          </div>
        </Combobox>
        <Combobox
          value={selectedSubregion}
          onChange={(value) => value && setSelectedSubregion(value)}
          disabled={!Boolean(selectedRegion.length)}
        >
          <div className="relative">
            <p className="text-gray-600 font-semibold text-xs">
              {subRegionData.title}
            </p>
            <div className="relative">
              <Combobox.Input
                className="rounded-md py-1.5 border-gray-400 text-sm focus:ring-0 focus:border-gray-400"
                onChange={(event) => setSubregionQuery(event.target.value)}
                placeholder={subRegionData.placeholder}
              ></Combobox.Input>
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <div className="absolute top-18">
              <Combobox.Options>
                <div className="h-fit max-h-[300px] overflow-auto rounded-md shadow-md border border-gray-300 bg-white text-brand-green-dark text-sm -space-y-1">
                  {filteredSubregions?.map((subRegion, i) => {
                    return (
                      <Combobox.Option
                        value={subRegion.id}
                        key={i}
                        className="p-2 hover:bg-gray-100"
                      >
                        {subRegion.displayName}
                      </Combobox.Option>
                    )
                  })}
                </div>
              </Combobox.Options>
            </div>
          </div>
        </Combobox>
      </div>

      {/** results */}
      <div className="flex flex-col justify-between h-[300px]">
        <Suspense
          fallback={
            <div className="p-2 flex items-center justify-center gap-x-2 py-4 text-gray-500">
              <SymbolIcon />
              Loading…
            </div>
          }
        >
          {Boolean(regionId) && Boolean(subRegionId) && (
            <SearchResults
              data={data.queries.getReportAreas}
              regionId={regionId!}
              subRegionId={subRegionId!}
            />
          )}
        </Suspense>
      </div>
    </div>
  )
}

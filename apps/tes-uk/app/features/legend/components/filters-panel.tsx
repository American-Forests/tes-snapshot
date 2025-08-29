import { useCallback, useEffect, useState } from "react"
import { useMapFilters } from "react-hooks"
import { useAtomValue, useAtom } from "jotai"

import { HelpTooltip } from "ui"
import { Slider } from "./slider"
import { Button } from "./button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

import { mapAtom } from "app/features/map/map.state"
import { filtersAtom } from "app/features/legend/legend.state"

import { FACETS } from "app/features/facets/facets.constants"
import { NEIGHBORHOOD_LIKE_LAYER } from "app/features/map/map.constants"

import type { Filter } from "react-hooks"
import type { NeighborhoodLike } from "db"
import type { Dispatch, SetStateAction } from "react"
import type { Facet } from "app/features/facets/facets.constants"

export function FilterRangeSlider({
  facet,
  setFilters,
  filters = [],
}: {
  facet: Facet
  setFilters: Dispatch<SetStateAction<Filter[]>>
  filters: Filter[] | null
}) {
  const { data, attr } = facet
  const { type, filterValues } = data
  const currentFacetFilter: Filter | undefined = filters?.find((f) => f.property === attr)
  const otherFilters: Filter[] | [] = filters
    ? filters.filter((f) => (f.property as keyof NeighborhoodLike) !== attr)
    : []
  const minMax: number[] = [
    filterValues![0] as number,
    filterValues![filterValues!.length - 1] as number,
  ]
  const [value, setValue] = useState(minMax)
  useEffect(() => {
    setValue(
      (((facet.data.filterUnmapper &&
        facet.data.filterUnmapper(currentFacetFilter?.value as number[])) as number[]) ||
        (currentFacetFilter?.value as number[])) ??
        minMax
    )
  }, [])
  const onChangeHandle = useCallback(
    (_: React.ChangeEvent<object>, newValue: number | number[]) => {
      setValue(newValue as number[])
    },
    [setValue]
  )
  const onChangeCommittedHandle = useCallback(
    (_: React.ChangeEvent<object>, newValue: number | number[]) => {
      setFilters([
        ...otherFilters,
        {
          type,
          property: attr,
          value: facet.data.filterMapper ? facet.data.filterMapper(newValue as number[]) : newValue,
        },
      ])
    },
    [setFilters, otherFilters, attr, type]
  )
  return (
    <div key={facet.attr} className="flex items-center justify-between pb-3">
      <div>
        <p className="text-xs font-medium mr-2 leading-tight">
          {facet.name}
          <HelpTooltip className="ml-1">
            <p className="text-left">{facet.explanation}</p>
            {facet.source && (
              <p className="text-gray-400 text-xs pt-2">{`[Data Source: ${facet.source}]`}</p>
            )}
          </HelpTooltip>
        </p>
      </div>
      <div className="px-1 flex flex-row">
        <Slider
          key={facet.attr}
          value={filters ? value : minMax}
          min={minMax[0]}
          max={minMax[1]}
          step={data.step!}
          valueLabelDisplay="off"
          valueLabelFormat={(val) => val}
          onChange={onChangeHandle}
          onChangeCommitted={onChangeCommittedHandle}
        />
      </div>
    </div>
  )
}

const FilterBooleanSelector = ({
  facet,
  filters,
  setFilters,
}: {
  facet: Facet
  setFilters: Dispatch<SetStateAction<Filter[]>>
  filters: Filter[] | null
}) => {
  const { data, attr } = facet
  const { type, filterMapper, filterUnmapper } = data
  const currentFacetFilter: Filter | undefined = filters?.find((f) => f.property === attr)
  const otherFilters: Filter[] | [] = filters
    ? filters.filter((f) => (f.property as keyof NeighborhoodLike) !== attr)
    : []
  return (
    <div key={attr} className="flex items-center justify-between">
      <div>
        <span className="text-xs mr-2">{facet.name}</span>
        <HelpTooltip>
          <p className="text-left">{facet.explanation}</p>
          {facet.source && (
            <p className="text-gray-400 text-xs pt-2">{`[Data Source: ${facet.source}]`}</p>
          )}
        </HelpTooltip>
      </div>
      <div className="px-1">
        <select
          className="text-sm rounded py-1 w-24 border-gray-400 focus:border-gray-400 focus:ring-0"
          value={filterUnmapper && (filterUnmapper(currentFacetFilter?.value) as string)}
          onChange={(e) => {
            setFilters([
              ...otherFilters,
              {
                type,
                property: attr,
                value: filterMapper ? (filterMapper(e.target.value) as number[]) : [],
              },
            ])
          }}
        >
          <option value={"any"}>Any</option>
          {facet.data.values.map((val) => (
            <option key={val} value={filterUnmapper && (filterUnmapper(val) as string)}>
              {filterUnmapper && filterUnmapper(val)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export const FiltersPanel = ({ handleClose }: { handleClose: () => void }) => {
  const layer = NEIGHBORHOOD_LIKE_LAYER
  const map = useAtomValue(mapAtom) as mapboxgl.Map
  const [filters, setFilters] = useAtom(filtersAtom)
  const resetFilters = () => setFilters(null)
  useMapFilters({ map, layer, filters })

  return (
    <div className="w-full pt-2">
      <div className="w-full flex flex-row justify-between items-center pb-2 border-b-slate-300 border-b">
        <span className="pl-4 font-medium">Filters</span>
        <div className="pr-4">
          <Button className="mr-2" Icon={ChevronLeftIcon} label="reset" onClick={resetFilters} />
          <Button Icon={ChevronLeftIcon} label="close" onClick={handleClose} />
        </div>
      </div>
      <div className="px-4 pt-3">
        {FACETS.filter((facet) => facet.isFilter && facet.layer === layer).map((facet, i) =>
          facet.data.type === "boolean" ? (
            <FilterBooleanSelector
              facet={facet}
              filters={filters}
              setFilters={setFilters as Dispatch<SetStateAction<Filter[]>>}
              key={i}
            />
          ) : (
            <FilterRangeSlider
              facet={facet}
              key={facet.attr}
              filters={filters}
              setFilters={setFilters as Dispatch<SetStateAction<Filter[]>>}
            />
          )
        )}
      </div>
    </div>
  )
}

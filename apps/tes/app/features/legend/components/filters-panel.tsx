import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { filtersAtom } from "app/state"
import { TSlider } from "components/slider"
import { useAtomValue, useSetAtom } from "jotai"
import type { Filter } from "types/filter"
import { Facet, range } from "data/facets"
import { LegendBackHeader } from "./legend-back-header"
import { LevelName } from "app/constants"
import { FacetTooltip } from "./facet-tooltip"
import { FacetName } from "./facet-name"
import { City } from "@prisma/client"
import { FACET_VALUES_TO_DISPLAY_NAME_DICTIONARY } from "../legend.constants"
type Either = "either" | "yes" | "no"

function FilterUI({ facet, filter, city }: { facet: Facet; filter: Filter; city?: City }) {
  const setFilters = useSetAtom(filtersAtom)
  const { t } = useTranslation(["facets"])
  const [selectedSublayer, setSelectedSublayer] = useState<Facet>()
  useEffect(() => {
    if (facet.sublayers) {
      setSelectedSublayer(facet.sublayers[0])
    }
  }, [facet])
  if (facet.sublayers) {
    return (
      <div key={facet.field.field} className="flex justify-between">
        <div className="flex items-center justify-between mb-2">
          {facet.title === "merged_shade_facet" && (
            <div className="text-xs pr-1">{t("facets:merged_shade_facet.name")}</div>
          )}
          <div className="px-1">
            <select
              className="text-sm rounded py-1 border-gray-400 focus:border-gray-400 focus:ring-0 w-20 pl-[5px] pr-[2px]"
              value={selectedSublayer?.title}
              onChange={(e) => {
                const newSublayer = facet.sublayers!.find((s) => s.title === e.target.value)!
                const sublayerData = newSublayer.data as range
                setSelectedSublayer(newSublayer)
                // Remove previous sublayer filter
                setFilters((filters) => {
                  const newFilters = new Map(filters)
                  newFilters.set(facet, {
                    type: "range",
                    sublayer: newSublayer.field.field,
                    value: sublayerData.value,
                    active: false,
                  })
                  return newFilters
                })
              }}
            >
              {facet.sublayers.map((sublayer) => (
                <option key={sublayer.title} value={sublayer.title}>
                  <FacetName facetKey={sublayer.field.field} />
                </option>
              ))}
            </select>
          </div>
          <FacetTooltip facetKey={facet.title} city={city} />
        </div>
        {selectedSublayer?.data?.type === "range" && (
          <div className="px-1 w-[57%]">
            <TSlider
              showInputs
              min={selectedSublayer.data.formatter!.dataToLabel(selectedSublayer.data.value[0])}
              max={selectedSublayer.data.formatter!.dataToLabel(selectedSublayer.data.value[1])}
              step={selectedSublayer.data.formatter!.dataToLabel(selectedSublayer.data.step)}
              valueLabelDisplay="off"
              valueLabelFormat={selectedSublayer.formatter}
              onChange={(_event, val) => {
                const value = val as [number, number]
                const facetData = selectedSublayer.data as range
                setFilters((filters) => {
                  const newFilters = new Map(filters)
                  const formattedEndRange = [
                    facetData.formatter!.dataToLabel(facetData.value[0]),
                    facetData.formatter!.dataToLabel(facetData.value[1]),
                  ]

                  const active = !(
                    formattedEndRange[0] === value[0] && formattedEndRange[1] === value[1]
                  )
                  const formattedValue = facetData.formatter
                    ? [
                        facetData.formatter.labelToData(value[0]),
                        facetData.formatter.labelToData(value[1]),
                      ]
                    : value
                  newFilters.set(facet, {
                    type: "range",
                    sublayer: selectedSublayer.field.field,
                    value: formattedValue as [number, number],
                    active,
                  })
                  return newFilters
                })
              }}
              value={
                selectedSublayer.data.formatter
                  ? [
                      selectedSublayer.data.formatter.dataToLabel(
                        (filter.value || selectedSublayer.data.value)[0] as number
                      ),
                      selectedSublayer.data.formatter.dataToLabel(
                        (filter.value || selectedSublayer.data.value)[1] as number
                      ),
                    ]
                  : ((filter.value || selectedSublayer.data.value) as [number, number])
              }
            />
          </div>
        )}
      </div>
    )
  }
  if (facet.data.type === "rangeChoice") {
    return (
      <div key={facet.field.field} className="flex items-center justify-between">
        <div>
          <FacetName facetKey={facet?.field?.field} />
          <FacetTooltip facetKey={facet?.field?.field} city={city} />
        </div>
        <div className="px-1 flex flex-row">
          {facet.data.value.map((val) => (
            <button
              key={val.label}
              className={`
                  h-8 p-1 ml-1 flex justify-center items-center border rounded text-xs border-brand-green
                  ${
                    filter.value === val.range
                      ? "text-white bg-brand-green"
                      : "text-brand-green hover:border-brand-green-dark hover:text-brand-green-dark"
                  }`}
              onClick={() => {
                setFilters((filters) => {
                  const newFilters = new Map(filters)
                  newFilters.set(facet, {
                    type: "range",
                    value: val.range as [number, number],
                    active: true,
                  })
                  return newFilters
                })
              }}
            >
              {val.label}
            </button>
          ))}
        </div>
      </div>
    )
  }
  if (facet.data.type === "boolean") {
    return (
      <div key={facet.field.field} className="flex items-center justify-between">
        <div>
          <FacetName facetKey={facet.field.field} isFilter={true} />
          <FacetTooltip facetKey={facet.field.field} city={city} />
        </div>
        <div className="px-1">
          <select
            className="text-sm rounded py-1 border-gray-400 focus:border-gray-400 focus:ring-0"
            value={(filter.value || "either") as Either}
            onChange={(e) => {
              setFilters((filters) => {
                const newFilters = new Map(filters)
                newFilters.set(facet, {
                  type: "switch",
                  value: e.target.value as Either,
                  active: e.target.value !== "either",
                })
                return newFilters
              })
            }}
          >
            <option value="either">Any</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    )
  }
  if (facet.data.type === "enum") {
    const dictionary = city && FACET_VALUES_TO_DISPLAY_NAME_DICTIONARY[city]?.[facet.field.field]
    return (
      <div key={facet.field.field} className="flex items-center justify-between">
        <div>
          <FacetName facetKey={facet.field.field} isFilter={true} />
          <FacetTooltip facetKey={facet.field.field} city={city} />
        </div>
        <div className="px-1">
          <select
            className="text-sm rounded py-1 w-24 border-gray-400 focus:border-gray-400 focus:ring-0"
            value={(dictionary ? dictionary[filter.value as keyof typeof dictionary] : filter.value || "either") as Either}
            onChange={(e) => {
              setFilters((filters) => {
                const newFilters = new Map(filters)
                newFilters.set(facet, {
                  type: "enum",
                  value: e.target.value && dictionary ? dictionary[e.target.value as keyof typeof dictionary] : e.target.value ? e.target.value : null,
                  active: e.target.value ? true : false,
                })
                return newFilters
              })
            }}
          >
            <option value="">Any</option>
            {facet.data.values.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }

  return (
    <div
      key={facet.field.field}
      className="grid items-center"
      style={{
        gridTemplateColumns: "1fr 200px",
      }}
    >
      <div>
        <FacetName facetKey={facet.field.field} isFilter={true} />
        <FacetTooltip facetKey={facet.field.field} city={city} />
      </div>
      <div className="pl-3">
        <TSlider
          showInputs
          min={
            facet.data.type == "range" && facet.data.formatter
              ? facet.data.formatter.dataToLabel(facet.data.value[0])
              : facet.data.value[0]
          }
          max={
            facet.data.type == "range" && facet.data.formatter
              ? facet.data.formatter.dataToLabel(facet.data.value[1])
              : facet.data.value[1]
          }
          step={
            facet.data.type == "range" && facet.data.formatter
              ? facet.data.formatter.dataToLabel(facet.data.step)
              : facet.data.step
          }
          valueLabelDisplay="off"
          valueLabelFormat={(val) => {
            return facet.formatter ? facet.formatter(val) : val
          }}
          onChange={(_event, val) => {
            const value = val as [number, number]
            setFilters((filters) => {
              const newFilters = new Map(filters)
              let formattedEndRange!: [number, number]
              if (facet.data.type === "range") {
                if (facet.data.formatter) {
                  formattedEndRange = [
                    facet.data.formatter.dataToLabel(facet.data.value[0]),
                    facet.data.formatter.dataToLabel(facet.data.value[1]),
                  ]
                } else {
                  formattedEndRange = facet.data.value
                }
              }
              const active =
                facet.data.type == "range" &&
                !(formattedEndRange[0] === value[0] && formattedEndRange[1] === value[1])
              const formattedValue =
                facet.data.type == "range" && facet.data.formatter
                  ? [
                      facet.data.formatter.labelToData(value[0]),
                      facet.data.formatter.labelToData(value[1]),
                    ]
                  : value
              newFilters.set(facet, {
                type: "range",
                value: formattedValue as [number, number],
                active,
              })
              return newFilters
            })
          }}
          value={
            facet.data.type == "range" && facet.data.formatter
              ? [
                  facet.data.formatter.dataToLabel((filter.value as [number, number])[0]),
                  facet.data.formatter.dataToLabel((filter.value as [number, number])[1]),
                ]
              : (filter.value as [number, number])
          }
        />
      </div>
    </div>
  )
}

export const FiltersPanel = ({
  currentLevel,
  onModeChange,
  city,
}: {
  currentLevel: LevelName
  onModeChange: React.Dispatch<React.SetStateAction<"facets" | "filters" | null>>
  city?: City
}) => {
  const {t} = useTranslation(["common"])
  const filters = useAtomValue(filtersAtom)
  return (
    <div className="w-full">
      <div>
        <LegendBackHeader title={t("common:filters")} onClick={() => onModeChange(null)} />
        <div className="p-3 space-y-2">
          {Array.from(filters.entries())
            .filter(
              ([facet]) =>
                facet.field?.type === (currentLevel == "Parcel" ? "Area" : currentLevel) &&
                !facet.hideFromFilters
            )
            .map(([facet, filter], i) => {
              return <FilterUI key={i} facet={facet} filter={filter} city={city} />
            })}
        </div>
      </div>
    </div>
  )
}

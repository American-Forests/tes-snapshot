import { useContext, useState, useEffect, useRef } from "react"
import { XCircleIcon } from "@heroicons/react/24/solid"
import getScenarioNoAuth from "app/scenarios/queries/getScenarioNoAuth"
import { useQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { styledButton2 } from "../../../components/elements"
import Logo from "public/tree-equity-score-analyzer.png"
import { format } from "d3"
import { Pencil1Icon } from "@radix-ui/react-icons"
import getBlockgroupGeometry from "app/blockgroups/queries/getBlockgroupGeometry"
import getAreaGeometry from "app/areas/queries/getAreaGeometry"
import { Blockgroup, BlockgroupOnScenario, AreaOnScenario, Area, Scenario } from "db"
import {
  getMinimapImageSrc,
  getAreasOnBlockgroup,
  getScenarioProposedTrees,
  getBlockgroupProposedTrees,
  getDemographicPercentageSum,
  parcelCanopyIncreaseProposed,
  calculateTreeEquityScoreIncrease,
  calculateScenarioTotalTreeCanopySqft,
  getExistingTreeCanopyAcres,
  approxTreeCount,
  getTotalTargetTreesFromTargetAreas,
  getCanopyProposed,
  getScenarioTotalProposedTreeCount,
  getSimplifiedGeojsonAndBbox,
} from "app/utils/scenario_utils"
import {
  getBenefit,
  getFipsList,
  getExistingTreeCanopyAcresByFips,
  sumTreeCanopyAcresProposedByFips,
  sumTargetTreeCanopyAcresByFips,
  getEcosystemBenefits,
} from "app/utils/report_utils"
import {
  dollarFormat,
  mFormat,
  squareFeetFormat,
  formatNumber,
  localeWithDecimals,
  squareMetersFormat,
} from "app/utils/formatting_utils"
import {
  squareFeetToAcres,
  acresToSquareFeet,
  squareFeetToSquareMeters,
  squareKilometersToSquareFeet,
} from "app/utils/conversion_utils"
import { ScenarioMap } from "../../../components/scenario_map"
import { City } from "app/features/regional-map/regional-map.types"
import { CityContext } from "app/features/regional-map/regional-map.state"
import Tooltip from "components/tooltip"
import {
  JOBS_PER_TREE,
  BENEFITS_SECTIONS,
  ECOSYSTEM_BENEFITS_LIST,
  BENEFITS_TOOLTIPS,
  TORONTO_BENEFITS_PANEL_TOOLTIPS,
} from "app/constants"
import getITree from "app/itree/queries/getITree"
import Help from "../../../components/help"
import { GeoJSONSource } from "mapbox-gl"
import { BenefitsPanel as UIBenefitsPanel, BenefitsStyles } from "ui"
import { QueryGeomEnvelope } from "tes-types"
import { ScenarioArea, ScenarioBlockgroup } from "types/data"
import getExtent from "app/blockgroups/queries/getExtent"
import type { JsonValue } from "type-fest"
import getBlockgroupWithSupplemental from "app/blockgroups/queries/getBlockgroupWithSupplemental"
import { squareKilometersToSquareMeters } from "utils"
import { TOOLTIP_CONTENT } from "app/features/dashboard/dashboard.constants"
import { useBenefitsPanelData } from "../dashboard/hooks"

type GetScenarioNoAuth = Awaited<ReturnType<typeof getScenarioNoAuth>>

export default function Benefit({
  label,
  value,
  unit,
  light,
  hint,
}: {
  label: string
  value: number
  unit?: "tons" | "m3" | "kg" | "$" | "%" | "ac" | "deg"
  light?: boolean
  hint?: string
}) {
  return (
    <div className={`${light ? "" : "bg-brand-green bg-opacity-40 rounded-md"} p-3`}>
      <div className="text-sm font-bold text-center">
        <span>{hint ? label + " " : label}</span>
        {hint ? (
          <Help className="text-gray-400 hover:text-black">
            <span>{hint}</span>
          </Help>
        ) : (
          ""
        )}
      </div>
      <div
        className={`${light ? "text-brand-green-dark font-bold" : ""} text-center pt-3 text-3xl`}
      >
        {unit === "$" ? <span>$</span> : null}
        {unit === "$"
          ? dollarFormat(value)
          : unit === "m3"
          ? mFormat(value)
          : localeWithDecimals(value)}
        {unit === "tons" ? (
          <span className="ml-1">ton{value === 1 ? "" : "s"}</span>
        ) : unit === "kg" ? (
          <span className="ml-1">kg</span>
        ) : unit === "%" ? (
          <span className="ml-1">%</span>
        ) : unit === "ac" ? (
          <span className="ml-1">ac</span>
        ) : unit === "deg" ? (
          <span className="ml-1">°F</span>
        ) : null}
      </div>
    </div>
  )
}

export function AdjustTrigger() {
  return (
    <button
      className="ml-4 inline-flex text-xs
        bg-white border
        border-brand-green-dark text-brand-green-dark
        transition-all
        shadow hover:shadow-md
        rounded-md
        px-2 py-0.5
        gap-x-1 items-center"
    >
      <div>Adjust</div>
      <Pencil1Icon />
    </button>
  )
}

function FilterableInfo({ label, val }: { label: string; val: string | boolean | null }) {
  if (val === null) return null
  let value = val
  if (label === "Ownership") {
    value = val ? "public" : "private"
  } else if (typeof val === "boolean") {
    value = val ? "yes" : "no"
  }
  return (
    <div className="flex pb-1 justify-between">
      <p className="text-gray-500 text-caption w-2/5">{label}</p>
      <p className="text-brand-mint-green text-body text-right">{value}</p>
    </div>
  )
}

type areaValue = string | boolean | null | number | JsonValue
type suppDictionary<T> = { [key: string]: T }

// Create a list of supplemental facets by filtering out excluded keys
const excludedKeys = [
  "gid",
  "id",
  "blockgroupId",
  "type",
  "city",
  "address",
  "area",
  "water",
  "tree_canopy",
  "potential_tree_canopy",
  "potential_vegetation",
  "potential_paved",
  "unsuitable_surface",
  "impervious_surface",
  "extent",
]

const facetLabel = (facet: string) => {
  return facet
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function GetAreaSupplemental({ area }: { area: suppDictionary<areaValue> }) {
  // first get list of all keys of area
  const facets: string[] = Object.keys(area)

  const includedFacets = facets.filter((facet) => !excludedKeys.includes(facet))
  // then identify all facets that are not null and not numbers (for simplicity)
  const supplementalFacets = includedFacets.filter(
    (facet) => area[facet] !== null && typeof area[facet] !== "number"
  )

  return (
    <>
      {supplementalFacets.map((facet) => {
        const value = area[facet]
        // Ensure type passed to FilterableInfo to avoid error
        const checkValue: string | boolean | null =
          typeof value === "string" || typeof value === "boolean" ? value : null

        return <FilterableInfo key={facet} label={facetLabel(facet)} val={checkValue} />
      })}
    </>
  )
}

function OverviewDataList(props: {
  labels: string[]
  values: number[]
  units: ("%" | "number")[]
  compact?: boolean
}) {
  const { labels, values, units, compact } = props

  function formatValue(value: number, unit: "%" | "number"): string {
    if (unit === "%") return format(",.0%")(value)
    else return formatNumber(value)
  }

  if (compact)
    return (
      <div className="grid grid-cols-3 gap-x-10 gap-y-2">
        {values.map((value, i) => {
          const unit = units[i]!
          const label = labels[i]!

          return (
            <div key={i} className="flex flex-col items-center">
              <p className="text-brand-green font-bold text-title text-center">
                {formatValue(value, unit)}
              </p>
              <p className="text-gray-500 text-body text-center first-letter:capitalize">{label}</p>
            </div>
          )
        })}
      </div>
    )

  return (
    <div className="flex flex-row justify-start pl-2">
      {/* values */}
      <div className="flex flex-col text-title text-brand-green font-bold pr-4">
        {values.map((value, i) => {
          const unit = units[i]!
          return <p key={i}>{formatValue(value, unit)}</p>
        })}
      </div>
      {/* labels */}
      <div className="flex flex-col justify-around text-subtitle text-gray-500">
        {labels.map((label, i) => (
          <p key={i} className="relative first-letter:capitalize">
            {label}
          </p>
        ))}
      </div>
    </div>
  )
}

function TreesDetailList(props: { smallTrees: number; mediumTrees: number; largeTrees: number }) {
  const { smallTrees, mediumTrees, largeTrees } = props

  return (
    <div className="flex flex-row justify-start">
      {/* values */}
      <div className="flex flex-col text-brand-green font-bold pr-4">
        <p>{formatNumber(smallTrees)}</p>
        <p>{formatNumber(mediumTrees)}</p>
        <p>{formatNumber(largeTrees)}</p>
      </div>
      {/* labels */}
      <div className="flex flex-col justify-around text-gray-500 text-caption">
        <p className="relative first-letter:capitalize">small trees</p>
        <p className="relative first-letter:capitalize">medium trees</p>
        <p className="relative first-letter:capitalize">large trees</p>
      </div>
    </div>
  )
}

function DetailDataList(props: {
  values: number[]
  labels: string[]
  units: ("%" | "number" | "deg")[]
  grayScale?: boolean
  darkGreen?: boolean
}) {
  const { values, labels, units, grayScale, darkGreen } = props

  function formatValue(value: number, unit: "%" | "number" | "deg"): string {
    if (unit === "%") return format(",.0%")(value)
    if (unit === "deg") return `${formatNumber(value)}°F`
    else return formatNumber(value)
  }

  function getValueJSX(value: string) {
    return (
      <p
        className={`font-bold ${
          grayScale ? "text-gray-500" : darkGreen ? "text-brand-green-dark" : "text-brand-green"
        }`}
      >
        {value}
      </p>
    )
  }

  function getLabelJSX(label: string) {
    return (
      <p className="text-gray-500 first-letter:capitalize col-span-3 text-caption pt-[1px]">
        {label}
      </p>
    )
  }

  function getValueLabelsJSX() {
    const valueLabels: JSX.Element[] = []
    values.forEach((val, i) => {
      const label = labels[i]!
      const unit = units[i]!

      valueLabels.push(getValueJSX(formatValue(val, unit)))
      valueLabels.push(getLabelJSX(label))
    })
    return valueLabels
  }

  return (
    <div className={`grid grid-cols-4 grid-rows-${values.length} gap-y-1 items-start`}>
      {getValueLabelsJSX()}
    </div>
  )
}

function DetailData({
  label,
  value,
  unit,
  className,
  highlight,
  grayScale,
  darkGreen,
  increase,
}: {
  label: string
  value: number
  unit?: "%" | "deg"
  className?: string
  highlight?: boolean
  grayScale?: boolean
  darkGreen?: boolean
  increase?: boolean
}) {
  function formatValue(value: number, unit: "%" | "deg" | undefined): string {
    if (unit === "%") return format(",.0%")(value)
    else if (unit === "deg") return `${formatNumber(value)}°F`
    else if (unit === "TES") return `+${value}`
    else return formatNumber(value)
  }

  return (
    <div className={`flex flex-row ${className} items-center`}>
      <p
        className={`font-bold pr-4 ${highlight ? "text-title" : "text-subtitle"} ${
          darkGreen ? "text-brand-green-dark" : grayScale ? "text-gray-500" : "text-brand-green"
        }`}
      >
        {increase && <span>+</span>}
        {formatValue(value, unit)}
      </p>
      <p
        className={`first-letter:capitalize ${highlight ? "font-bold text-body" : "text-caption"} ${
          darkGreen ? "text-brand-green-dark" : "text-gray-500"
        }`}
      >
        {label}
      </p>
    </div>
  )
}

function BlockgroupSection({
  blockgroupOnScenario,
  scenario,
  handleScenarioFeaturesUpdate,
}: {
  scenario: GetScenarioNoAuth
  blockgroupOnScenario: BlockgroupOnScenario & { blockgroup: Blockgroup }
  handleScenarioFeaturesUpdate: (feature: GeoJSONSource, id: string) => void
}) {
  const { blockgroup: b, ...onScenario } = blockgroupOnScenario
  const [blockgroupWithSupplemental] = useQuery(getBlockgroupWithSupplemental, { id: b.id })
  const [feature] = useQuery(getBlockgroupGeometry, { id: b.id })
  const areas = getAreasOnBlockgroup(scenario, b)
  const totalTreeCanopyAdded = squareFeetToAcres(calculateScenarioTotalTreeCanopySqft(areas))
  const proposedTrees = getBlockgroupProposedTrees(areas)
  const proposedCanopy = getCanopyProposed(b, areas)
  const { geojson, bbox } = getSimplifiedGeojsonAndBbox(feature as QueryGeomEnvelope)
  const minimapSrc = getMinimapImageSrc(geojson, bbox)
  handleScenarioFeaturesUpdate(geojson, b.id)
  const city = useContext(CityContext)!

  return (
    blockgroupWithSupplemental && (
      <>
        <div
          key={b.id}
          className="rounded-xl bg-brand-gray bg-bran mb-1 mt-8 p-4 sm:grid grid-col-2 xl:grid-cols-9 gap-6 overflow-hidden"
        >
          <div className="col-span-2 md:col-start-1 md:col-end-2 md:row-start-1 xl:col-end-4 border-r-[2px] border-gray-300 border-opacity-25">
            <div className="text-2xl text-gray-600 font-bold capitalize pb-8">{`${blockgroupOnScenario.name} #${b.id}`}</div>
            <section className="flex pl-4 pr-4">
              <div className="w-9/12">
                <div>
                  <p className="text-gray-500 text-caption">Target Tree</p>
                  <p className="text-gray-500 text-caption">Equity Score</p>
                  <p className="text-brand-green-dark text-title font-bold">
                    {onScenario.treeEquityScoreTarget}
                  </p>
                </div>
                <div className="pt-4">
                  <p className="text-gray-500 text-caption">Target Trees</p>
                  <p className="text-brand-green-dark text-title font-bold">
                    {approxTreeCount(onScenario.targetArea).toLocaleString("en")}
                  </p>
                </div>
              </div>
              {blockgroupWithSupplemental.afternoon_air_average_temperature &&
              blockgroupWithSupplemental.evening_air_average_temperature ? (
                <DetailDataList
                  values={[
                    b.tree_equity_score,
                    b.tree_canopy,
                    blockgroupWithSupplemental.impervious_surface || 0,
                    blockgroupWithSupplemental.afternoon_air_average_temperature || 0,
                    blockgroupWithSupplemental.evening_air_average_temperature || 0,
                  ]}
                  labels={[
                    "starting Tree Equity Score",
                    "existing canopy",
                    "impervious cover",
                    "mean afternoon air temperature",
                    "mean evening air temperature",
                  ]}
                  units={["number", "%", "%", "deg", "deg"]}
                  grayScale
                />
              ) : (
                <DetailDataList
                  values={[
                    b.tree_equity_score,
                    b.tree_canopy,
                    blockgroupWithSupplemental.impervious_surface || 0,
                  ]}
                  labels={["starting Tree Equity Score", "existing canopy", "impervious cover"]}
                  units={["number", "%", "%"]}
                  grayScale
                />
              )}
            </section>
          </div>
          <div className="col-span-1 md:row-start-2 xl:col-start-4 xl:col-end-6 xl:row-start-1 border-r-[2px] border-gray-300 border-opacity-25">
            {areas.length ? (
              <>
                <div className="mb-3">
                  <p className="text-brand-mint-green text-lg font-bold pr-2 capitalize">
                    Site Planting summary
                  </p>
                  <p className="text-gray-500 text-annotation italic">
                    Trees proposed on parcels and rights-of-way
                  </p>
                </div>
                <DetailData
                  highlight
                  darkGreen
                  className="pb-2"
                  label="Improved Score"
                  value={calculateTreeEquityScoreIncrease(b, totalTreeCanopyAdded)}
                />
                <DetailData
                  darkGreen
                  increase
                  label="canopy proposed"
                  value={proposedCanopy}
                  unit="%"
                />
                {proposedTrees && (
                  <div className="ml-8 mt-4 pl-4 border-l-[2px] border-gray-300 border-opacity-25">
                    <TreesDetailList
                      smallTrees={proposedTrees.treesSmall}
                      mediumTrees={proposedTrees.treesMedium}
                      largeTrees={proposedTrees.treesLarge}
                    />
                  </div>
                )}
              </>
            ) : null}
          </div>
          <div className="col-span-1 md:row-start-2 xl:col-start-6 xl:col-end-8 xl:row-start-1">
            <p className="text-brand-mint-green text-lg font-bold mb-6">
              {city.locale && city.locale === "en-CA" ? "Census Tract" : "Block Group"} Demographics
            </p>
            <DetailData
              value={b.clipped_bg_population || b.total_population}
              label={"total residents"}
              highlight
              darkGreen
            />
            <div className="pl-10">
              <DetailDataList
                values={[
                  b.poc_percent,
                  b.poverty_percent,
                  b.unemployment_rate,
                  b.senior_percent,
                  b.child_percent,
                ]}
                labels={[
                  "people of color",
                  "people with incomes below 200% of the poverty line",
                  "unemployed",
                  "senior (65+)",
                  "children (0-17)",
                ]}
                units={["%", "%", "%", "%", "%"]}
              />
            </div>
          </div>
          <div className="col-span-2 md:col-start-2 md:col-end-3 md:row-start-1 xl:col-start-8 xl:col-end-10 flex justify-center xl:justify-end">
            <img
              src={minimapSrc}
              alt={`map preview from #${b.id}, ${blockgroupWithSupplemental.city}`}
              className="max-h-full object-contain object-center"
            />
          </div>
        </div>

        <div>
          {areas.map((areaOnScenario: AreaOnScenario & { area: Area }, i: number) => {
            return (
              <AreaSection
                areaOnScenario={areaOnScenario}
                key={i}
                handleScenarioFeaturesUpdate={handleScenarioFeaturesUpdate}
              />
            )
          })}
        </div>
      </>
    )
  )
}

function AreaSection({
  areaOnScenario,
  handleScenarioFeaturesUpdate,
}: {
  areaOnScenario: AreaOnScenario & { area: Area }
  handleScenarioFeaturesUpdate: (feature: GeoJSONSource, id: string) => void
}) {
  const { area: a, ...onBlockgroup } = areaOnScenario
  const [feature] = useQuery(getAreaGeometry, { id: a.id })
  const { geojson, bbox } = getSimplifiedGeojsonAndBbox(feature as QueryGeomEnvelope)
  const minimapSrc = getMinimapImageSrc(geojson, bbox)
  const canopyIncrease = parcelCanopyIncreaseProposed(areaOnScenario)
  handleScenarioFeaturesUpdate(geojson, a.id)
  const city = useContext(CityContext)!

  function getName(areaOnScenario: AreaOnScenario & { area: Area }) {
    if (areaOnScenario.name) return areaOnScenario.name
    else if (areaOnScenario.area.type === "PARCEL") return "parcel"
    else return "right-of-way"
  }
  return (
    <div
      key={a.id}
      className="rounded-xl bg-brand-gray p-4 w-[calc(100%-1rem)] ml-4 mb-[2px] sm:grid grid-col-2 xl:grid-cols-9 gap-6 overflow-hidden"
    >
      <section className="w-[calc(100%-0.6rem)] col-span-2 md:col-start-1 md:col-end-2 md:row-start-1 xl:col-end-4 border-r-[2px] border-gray-300 border-opacity-25">
        <div className="text-gray-600 font-semibold text-subtitle mb-4 capitalize">
          {`${getName(areaOnScenario)} ${a.address ? `| ${a.address}` : ""}`}
        </div>
        <section className="pl-4">
          <div className="text-gray-500 mb-4 flex max-w-[60%] items-center">
            <span className="text-subtitle text-gray-600 pr-6">Area:</span>
            <span className="font-bold text-brand-green-dark">
              {city.locale && city.locale === "en-CA"
                ? squareMetersFormat(squareKilometersToSquareMeters(a.area_sqkm))
                : squareFeetFormat(squareKilometersToSquareFeet(a.area_sqkm))}
            </span>
          </div>
          <div className="max-w-[60%]">
            <DetailDataList
              values={[a.tree_canopy, a.potential_tree_canopy]}
              labels={["existing tree canopy", "potential tree canopy"]}
              units={["%", "%"]}
              darkGreen
            />
            <div className="ml-4 my-2 pl-4 border-l-[2px] border-gray-300 border-opacity-25">
              <DetailDataList
                values={[a.potential_vegetation || 0, a.potential_paved || 0]}
                labels={["grass, shrubs, or bare", "paved"]}
                units={["%", "%"]}
                grayScale
              />
            </div>
            <DetailDataList
              values={[a.unsuitable_surface || 0]}
              labels={["unsuitable for tree planting (roads, structures, other)"]}
              units={["%"]}
              darkGreen
            />
          </div>
        </section>
      </section>
      <section className="w-[calc(100%-0.6rem)] col-span-1 md:row-start-2 xl:col-start-4 xl:col-end-6 xl:row-start-1 border-r-[2px] border-gray-300 border-opacity-25">
        <div className="flex items-center mb-3">
          <span className="text-brand-mint-green text-lg font-bold pr-2">Site Plan</span>
        </div>
        <DetailData label="Canopy proposed" value={canopyIncrease} unit="%" darkGreen increase />
        <div className="ml-6 mt-4 pl-4 border-l-[2px] border-gray-300 border-opacity-25">
          <TreesDetailList
            smallTrees={onBlockgroup.treesSmall}
            mediumTrees={onBlockgroup.treesMedium}
            largeTrees={onBlockgroup.treesLarge}
          />
        </div>
      </section>
      <section className="w-[calc(100%-0.6rem)] col-span-1 md:row-start-2 xl:col-start-6 xl:col-end-8 xl:row-start-1">
        <p className="text-brand-mint-green text-subtitle font-bold mb-3">Site Characteristics</p>
        <div>
          <GetAreaSupplemental area={a} />
        </div>
      </section>
      <div className="col-span-2 md:col-start-2 md:col-end-3 md:row-start-1 xl:col-start-8 xl:col-end-10 flex justify-center xl:justify-end">
        <img
          src={minimapSrc}
          alt={`map preview from #${a.id}`}
          className="max-h-full object-contain object-center"
        />
      </div>
    </div>
  )
}

function BenefitsText({
  section,
  proposedTrees,
  totalTargetTrees,
  existingTreeCanopySqFt,
  hint,
}: {
  section: string
  proposedTrees: number
  totalTargetTrees: number
  existingTreeCanopySqFt: number
  hint: string
}) {
  const { proposed, existing } = BENEFITS_SECTIONS
  const city = useContext(CityContext)!
  switch (section) {
    case proposed:
      return (
        <span className="text-brand-green text-subtitle">
          Total annual estimated benefits of the
          <span className="text-brand-green-dark font-bold">{` ${proposedTrees.toLocaleString(
            "en"
          )} trees `}</span>
          you proposed in parcels and rights-of-way.
        </span>
      )
    case existing:
      return (
        <>
          <span className="text-brand-green text-subtitle">
            Total annual estimated benefits of the existing{" "}
          </span>
          <span className="text-brand-green-dark font-bold text-subtitle">
            {city.locale && city.locale === "en-CA"
              ? squareMetersFormat(squareFeetToSquareMeters(existingTreeCanopySqFt))
              : squareFeetFormat(existingTreeCanopySqFt)}
          </span>
          <span className="text-brand-green-dark font-bold text-subtitle"> of tree canopy </span>
          <span className="text-brand-green text-subtitle">
            in the parcels and rights-of-way included in this scenario.
          </span>
        </>
      )
    default:
      return (
        <span className="text-brand-green text-subtitle">
          Total annual estimated benefits of the approx.
          <span className="text-brand-green-dark font-bold">{` ${totalTargetTrees.toLocaleString(
            "en"
          )} trees targeted that you would need to plant `}</span>
          to reach your combined{" "}
          {city && city.locale && city.locale === "en-CA" ? "census tract" : "block group"} Tree
          Equity Score targets.{" "}
          <Help className="text-gray-400 hover:text-black">
            <span>{hint}</span>
          </Help>
        </span>
      )
  }
}

function BenefitsPanel(props: {
  targetBenefits: Map<string, number> | undefined
  proposedBenefits: Map<string, number> | undefined
  existingBenefits: Map<string, number> | undefined
  scenario: Scenario & {
    areas: (AreaOnScenario & {
      area: Area
    })[]
    blockgroups: (BlockgroupOnScenario & {
      blockgroup: Blockgroup
    })[]
  }
  city?: City
}) {
  const { targetBenefits, proposedBenefits, existingBenefits, scenario, city } = props

  const totalTargetTrees = getTotalTargetTreesFromTargetAreas(scenario.blockgroups)
  const proposedTrees = getScenarioTotalProposedTreeCount(scenario.areas)
  const existingTreeCanopyAcres = getExistingTreeCanopyAcres(scenario.areas)
  const existingTreeCanopySqFt = acresToSquareFeet(existingTreeCanopyAcres)

  const { target, proposed, existing } = BENEFITS_SECTIONS
  const [selectedTab, setSelectedTab] = useState(target)
  const [benefits, setBenefits] = useState(targetBenefits)

  const treesToCareFor =
    selectedTab === target
      ? totalTargetTrees
      : selectedTab === proposed
      ? proposedTrees
      : approxTreeCount(existingTreeCanopyAcres)

  /**
   * Update benefits used in benefits panel when selected tab changes
   */
  useEffect(() => {
    if (selectedTab == target) setBenefits(targetBenefits)
    else if (selectedTab == proposed) setBenefits(proposedBenefits)
    else setBenefits(existingBenefits)
  }, [targetBenefits, proposedBenefits, existingBenefits, selectedTab])

  const benefitTooltipContent = TOOLTIP_CONTENT
  const benefitsPanelData = useBenefitsPanelData(benefits, city)

  const layout = new Map()
  layout.set("carbon", {
    grouped: 3,
    items: {
      border: [true, true],
    },
  })
  layout.set("water", {
    grouped: 2,
    items: {
      border: [true],
    },
  })
  layout.set("air", {
    grouped: 2,
    items: {
      border: [true],
    },
  })

  const classes: BenefitsStyles = {
    section: {
      carbon: "text-gray-800 md:col-span-2 xl:col-span-1 print:col-span-2",
      water: "text-gray-800 md:col-span-2 xl:col-span-1 print:col-span-2",
      air: "text-gray-800 md:col-span-4 xl:col-span-2 print:col-span-4 print:break-before-page",
    },
    sectionContainer: {
      carbon: "grid grid-rows-3 gap-y-4 bg-brand-gray-pale rounded-md xl:h-[450px] h-fit",
      water: "grid grid-rows-3 gap-4 xl:h-[450px] h-fit",
      air: "grid md:grid-cols-2 grid-rows-3 gap-4 xl:h-[450px] h-fit print:grid-cols-2",
    },
    sectionIntro: {
      carbon: "",
      water: "grid grid-rows-2 gap-y-4 bg-brand-blue-pale rounded-md row-span-2",
      air: "grid grid-rows-2 row-span-2 bg-brand-green-pale rounded-md gap-y-4",
    },
    block: {
      carbon: "",
      water: "bg-brand-blue-pale rounded-md",
      air: "bg-brand-green-pale rounded-md",
    },
  }

  return (
    <div>
      <h2 className="mb-8 text-headline">Scenario Benefits</h2>
      <div className="flex flex-row mb-6 gap-4 border-b-4 border-brand-green-dark">
        <button
          className={`py-2 px-12 rounded-t-lg text-body ${
            selectedTab === target
              ? "bg-brand-green-dark text-white font-bold"
              : "text-black bg-brand-green-pale"
          }`}
          onClick={() => setSelectedTab(target)}
        >
          {city && city.locale && city.locale === "en-CA" ? "Census Tracts" : "Block Groups"}
        </button>
        <Tooltip
          tooltipText={BENEFITS_TOOLTIPS[proposed] as string}
          className="bg-gray-50 text-gray-500 p-4 max-w-xs shadow-lg"
          enabled={scenario.areas.length === 0}
        >
          <button
            className={`py-2 px-12 rounded-t-lg text-body ${
              selectedTab === proposed
                ? "bg-brand-green-dark text-white font-bold"
                : scenario.areas.length === 0
                ? "cursor-not-allowed bg-brand-gray-pale"
                : "text-black bg-brand-green-pale"
            }`}
            onClick={() => scenario.areas.length && setSelectedTab(proposed)}
          >
            Parcels & Rights-of-Way
          </button>
        </Tooltip>
        <Tooltip
          tooltipText={BENEFITS_TOOLTIPS[existing] as string}
          className="bg-gray-50 text-gray-500 p-4 max-w-xs shadow-lg"
          enabled={scenario.areas.length === 0}
        >
          <button
            className={`py-2 px-12 rounded-t-lg text-body ${
              selectedTab === existing
                ? "bg-brand-green-dark text-white font-bold"
                : scenario.areas.length === 0
                ? "cursor-not-allowed bg-brand-gray-pale"
                : "text-black bg-brand-green-pale"
            }`}
            onClick={() => scenario.areas.length && setSelectedTab(existing)}
          >
            Existing Site Canopy
          </button>
        </Tooltip>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="md:w-1/3 md:pr-8">
          <BenefitsText
            section={selectedTab}
            totalTargetTrees={totalTargetTrees}
            proposedTrees={proposedTrees}
            existingTreeCanopySqFt={existingTreeCanopySqFt}
            hint={
              city && city.locale === "en-CA"
                ? TORONTO_BENEFITS_PANEL_TOOLTIPS.get(1) || ""
                : benefitTooltipContent.get(1) || ""
            }
          />
        </div>
        <div className="md:w-1/3 md:pr-8">
          <Benefit
            label="Annual Ecosystem Service Value"
            value={getBenefit("total_ecosystem_service_value", benefits)}
            unit="$"
            hint={
              city && city.locale === "en-CA"
                ? TORONTO_BENEFITS_PANEL_TOOLTIPS.get(2) || ""
                : benefitTooltipContent.get(2) || ""
            }
            light
          />
        </div>
        {city && city.locale && city.locale === "en-CA" ? null : (
          <div className="md:w-1/3 md:pr-8">
            <Benefit
              label="Jobs Supported"
              value={treesToCareFor * JOBS_PER_TREE}
              hint={benefitTooltipContent.get(3) || ""}
              light
            />
          </div>
        )}
      </div>

      {benefitsPanelData && (
        <UIBenefitsPanel data={benefitsPanelData} layout={layout} classes={classes} />
      )}

      <p className="text-annotation text-gray-500 float-right pt-4">
        Sources:{" "}
        {city && city.locale === "en-CA" ? "2018 Toronto Canopy Study" : "i-Tree Landscape"},
        American Forests.
      </p>
    </div>
  )
}

export function RegionalReport({ id }: { id: number }) {
  const city = useContext(CityContext)!
  const [scenarioProposedTrees, setScenarioProposedTrees] = useState({
    treesSmall: 0,
    treesMedium: 0,
    treesLarge: 0,
  })

  const [scenario] = useQuery(getScenarioNoAuth, {
    id,
  })

  const [scenarioBbox] = useQuery(getExtent, {
    blockgroupIds: scenario.blockgroups.map((b: ScenarioBlockgroup) => b.blockgroup.id),
  })

  const [targetBenefits, setTargetBenefits] = useState<Map<string, number>>()
  const [proposedBenefits, setProposedBenefits] = useState<Map<string, number>>()
  const [existingBenefits, setExistingBenefits] = useState<Map<string, number>>()

  const fips_list = getFipsList(scenario.blockgroups.map((b: ScenarioBlockgroup) => b.blockgroup))
  const [iTreeData] = useQuery(getITree, { fips_list })
  const scenarioFeatures = useRef<object>({})
  const handleScenarioFeaturesUpdate = (feature: GeoJSONSource, id: string) => {
    if (scenarioFeatures.current) {
      scenarioFeatures.current = {
        ...scenarioFeatures.current,
        [id]: feature,
      }
    } else {
      scenarioFeatures.current = {
        [id]: feature,
      }
    }
  }

  useEffect(() => {
    if (scenario.areas) setScenarioProposedTrees(getScenarioProposedTrees(scenario.areas))
  }, [scenario.areas])

  useEffect(() => {
    if (scenario && iTreeData) {
      setTargetBenefits(
        getEcosystemBenefits({
          fipsToTreeCanopyAcresMap: sumTargetTreeCanopyAcresByFips(scenario),
          iTreeData: iTreeData,
          benefitsList: ECOSYSTEM_BENEFITS_LIST,
        })
      )

      setProposedBenefits(
        getEcosystemBenefits({
          fipsToTreeCanopyAcresMap: sumTreeCanopyAcresProposedByFips(scenario),
          iTreeData: iTreeData,
          benefitsList: ECOSYSTEM_BENEFITS_LIST,
        })
      )

      setExistingBenefits(
        getEcosystemBenefits({
          fipsToTreeCanopyAcresMap: getExistingTreeCanopyAcresByFips(scenario),
          iTreeData: iTreeData,
          benefitsList: ECOSYSTEM_BENEFITS_LIST,
        })
      )
    }
  }, [scenario, iTreeData])

  return (
    <div className="sm:grid grid-cols-12 gap-10 px-10 max-w-[1500px] m-auto mt-8">
      <main className="col-span-12">
        <section className="flex items-center justify-between">
          <img className="w-32 py-2" src={Logo.src} alt="Tree Equity Score Analyzer" />
          <div className="text-center">
            <div className="text-gray-500 text-sm uppercase font-bold">Scenario</div>
            <div className="text-brand-green text-xl font-bold">
              {city.shortTitle} Tree Equity Report
            </div>
          </div>
          <div className="self-start">
            <Link
              legacyBehavior
              href={Routes.Map({
                city: city.id,
              })}
            >
              <a className="text-gray-400 hover:text-black">
                <XCircleIcon className="w-6 h-6" />
              </a>
            </Link>
          </div>
        </section>
        <div className="pt-10">
          <h1 className="font-semibold text-4xl pb-8 uppercase">{scenario.name}</h1>
          <h2 className="mb-8 text-headline">Scenario Overview</h2>
          <main className="flex items-start gap-x-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              <div className="bg-brand-gray-pale p-8 rounded-xl ">
                <h3 className="font-semibold text-title text-brand-green pb-4">
                  Project Locations
                </h3>
                <OverviewDataList
                  values={[
                    scenario.blockgroups.length,
                    scenario.areas.filter((a: ScenarioArea) => a.area.type === "PARCEL").length,
                    scenario.areas.filter((a: ScenarioArea) => a.area.type === "RIGHT_OF_WAY")
                      .length,
                  ]}
                  labels={[
                    city.locale && city.locale === "en-CA" ? "census tracts" : "block groups",
                    "parcels",
                    "rights-of-way",
                  ]}
                  units={["number", "number", "number"]}
                />
              </div>
              <div className="bg-brand-gray-pale p-8 rounded-xl">
                <h3 className="font-semibold text-title text-brand-green pb-4 capitalize">
                  Site planting summary
                </h3>
                <OverviewDataList
                  values={[
                    scenarioProposedTrees.treesSmall,
                    scenarioProposedTrees.treesMedium,
                    scenarioProposedTrees.treesLarge,
                  ]}
                  labels={["small trees", "medium trees", "large trees"]}
                  units={["number", "number", "number"]}
                />
              </div>
              <div className="bg-brand-gray-pale p-8 rounded-xl md:col-span-2 lg:col-span-1">
                <h3 className="font-semibold text-title text-brand-green pb-4 capitalize">
                  Demographics summary
                </h3>
                <OverviewDataList
                  values={[
                    "total_population",
                    "poc_percent",
                    "unemployment_rate",
                    "poverty_percent",
                    "senior_percent",
                    "child_percent",
                  ].map((attr) => getDemographicPercentageSum(scenario.blockgroups, attr))}
                  labels={[
                    "population",
                    "people of color",
                    "unemployed",
                    "people in poverty",
                    "seniors",
                    "children",
                  ]}
                  units={["number", "%", "%", "%", "%", "%"]}
                  compact
                />
              </div>
            </div>
          </main>
        </div>
        <div className="pt-10">
          <BenefitsPanel
            scenario={scenario}
            targetBenefits={targetBenefits}
            proposedBenefits={proposedBenefits}
            existingBenefits={existingBenefits}
            city={city}
          />
        </div>
        <div className="pt-20">
          <h2 className="mb-8 font-semibold text-headline">Scenario Details</h2>
          {scenario.blockgroups.map(
            (
              blockgroupOnScenario: BlockgroupOnScenario & { blockgroup: Blockgroup },
              i: number
            ) => {
              return (
                <BlockgroupSection
                  key={i}
                  blockgroupOnScenario={blockgroupOnScenario}
                  scenario={scenario}
                  handleScenarioFeaturesUpdate={handleScenarioFeaturesUpdate}
                />
              )
            }
          )}
        </div>
        <div className="pt-10">
          <ScenarioMap
            className="h-[80vh]"
            scenarioBbox={scenarioBbox as [number, number, number, number]}
            scenarioFeatures={scenarioFeatures.current as GeoJSONSource}
          />
        </div>
        <div className="px-8 pt-20 mt-20 pb-20 print:hidden border-t border-gray-300">
          <div className="grid md:grid-cols-2 gap-y-10 gap-x-10">
            <div className="flex flex-col items-center">
              <div className="pb-2 text-xl font-bold text-center">Take action</div>
              <p className="mb-4 text-sm leading-relaxed text-center text-gray-800">
                Want to work with American Forests to calculate the Tree Equity Scores for your
                neighborhood?
              </p>
              <Link legacyBehavior href="/contact/">
                <a className={styledButton2({ variant: "primary" })}>Contact now</a>
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <div className="pb-2 text-xl font-bold text-center">Resources</div>
              <p className="mb-4 text-sm leading-relaxed text-center text-gray-800">
                Check out our regularly updated list of Tree Equity resources for guides, tools,
                case studies, and policy examples.
              </p>
              <Link legacyBehavior href="/resources/">
                <a className={styledButton2({ variant: "primary" })}>Learn more</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

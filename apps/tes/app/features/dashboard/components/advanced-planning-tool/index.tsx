import { useQuery } from "@blitzjs/rpc"
import { Suspense, useEffect, useRef, useState } from "react"
import { AdvancedPlanningToolType } from "./data-table/types"
import { TriangleUpIcon } from "@radix-ui/react-icons"
import { TableMap } from "./table-map"
import { DataTable } from "./data-table"
import { useAtom, useAtomValue } from "jotai"
import {
  selectedRowAtom,
  hoveredRowAtom,
  mapTableAtom,
  tableDataAtom,
  targetScoreDebouncedAtom,
} from "../../dashboard.state"
import { Blockgroup } from "db"
import { getBlockgroupTableData, getLocalityTableData } from "../../utils"
import {
  BLOCKGROUP_PLANNING_TOOL_TYPE,
  LOCALITY_PLANNING_TOOL_TYPE,
} from "../../dashboard.constants"
import { BLOCKGROUP_ZOOM, MUNICIPALITY_ZOOM } from "app/constants"
import type { BlockgroupWithCenter } from "app/constants"

import getMunicipalitiesFromSlugs from "app/municipalities/queries/getMunicipalitiesFromSlugs"
import { useTranslation } from "react-i18next"

export const AdvancedPlanningTools = ({
  title,
  planningToolType,
  blockgroups,
  extraBlockgroups,
  blockgroupsBelowTarget,
}: {
  title: string
  planningToolType: AdvancedPlanningToolType
  blockgroups: Blockgroup[] | BlockgroupWithCenter[]
  extraBlockgroups?: Blockgroup[]
  blockgroupsBelowTarget: Blockgroup[]
}) => {
  const { t } = useTranslation(["location-insights", "common"])
  const [isOpen, setIsOpen] = useState(false)
  const map = useAtomValue(mapTableAtom)
  const targetScore = useAtomValue(targetScoreDebouncedAtom)
  const hoveredRow = useAtomValue(hoveredRowAtom)
  const selectedRow = useAtomValue(selectedRowAtom)
  const [tableData, setTableData] = useAtom(tableDataAtom)

  const uniqueMunicipalitySlugs = Array.from(
    new Set(blockgroups.map((bg) => bg.municipality_slug)),
  ).filter(Boolean) as string[]

  const [municipalities] = useQuery(getMunicipalitiesFromSlugs, {
    slugs: uniqueMunicipalitySlugs,
  })

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (planningToolType === BLOCKGROUP_PLANNING_TOOL_TYPE) {
      setTableData(getBlockgroupTableData(blockgroups as BlockgroupWithCenter[], targetScore))
    } else {
      setTableData(getLocalityTableData(municipalities, blockgroups, targetScore, extraBlockgroups))
    }
  }, [map, blockgroups, targetScore, municipalities])

  const SOURCE_ID =
    planningToolType === BLOCKGROUP_PLANNING_TOOL_TYPE
      ? "national_blockgroup"
      : "national_municipality"
  const SOURCE_LAYER = "data"
  const ZOOM = SOURCE_ID === "national_blockgroup" ? BLOCKGROUP_ZOOM + 1 : MUNICIPALITY_ZOOM + 1.5
  const FLY_TO_DURATION = 1000

  /**
   * This useEffect updates the hover state of map features.
   * It resets the hover state of the previously hovered feature and sets the hover state of the currently hovered row.
   */
  const lastHoveredFeatureRef = useRef<string | null>(null)
  const lastSelectedFeatureRef = useRef<string | null>(null)

  useEffect(() => {
    if (!map || selectedRow) return
    if (hoveredRow) {
      lastHoveredFeatureRef.current = hoveredRow.id
      map.setFeatureState(
        { source: SOURCE_ID, sourceLayer: SOURCE_LAYER, id: hoveredRow.id },
        { hover: true },
      )
      map.flyTo({
        center: hoveredRow.center,
        zoom: ZOOM,
        duration: FLY_TO_DURATION,
      })
    }
    return function cleanUp() {
      if (!selectedRow) {
        if (lastHoveredFeatureRef.current) {
          map.setFeatureState(
            { source: SOURCE_ID, sourceLayer: SOURCE_LAYER, id: lastHoveredFeatureRef.current },
            { hover: false },
          )
        }
      }
    }
  }, [hoveredRow, selectedRow, map, planningToolType])

  useEffect(() => {
    if (!map) return
    if (selectedRow) {
      map.setFeatureState(
        { source: SOURCE_ID, sourceLayer: SOURCE_LAYER, id: selectedRow.id },
        { "external-selected": true },
      )
      if (lastSelectedFeatureRef.current) {
        map.setFeatureState(
          { source: SOURCE_ID, sourceLayer: SOURCE_LAYER, id: lastSelectedFeatureRef.current },
          { "external-selected": false },
        )
      }
      lastSelectedFeatureRef.current = selectedRow.id
      map.flyTo({
        center: selectedRow.center,
        zoom: ZOOM,
        duration: FLY_TO_DURATION,
      })
    }
  }, [selectedRow, map, planningToolType])

  return (
    <div className="bg-[#FBFDFD] pb-10">
      <div className="border-y border-gray-200 py-3 px-5 bg-gradient-to-t from-brand-green/[0.0] to-brand-green/[0.1] lg:w-11/12 w-full m-auto">
        <div className="md:flex justify-between items-center gap-2">
          <div className="md:max-w-[80%]">
            <div className="md:flex items-center md:space-x-2">
              <h2 className="text-base uppercase font-bold text-brand-green-darker mb-1">
                {t("location-insights:advanced_planning_tools.title")}
              </h2>
              <div className="flex items-center md:pb-0 pb-1">
                <p className="text-sm font-semibold rounded-full text-brand-green-dark px-2 bg-brand-green-light">
                  {tableData.length}{" "}
                  {planningToolType === BLOCKGROUP_PLANNING_TOOL_TYPE
                    ? t("common:blockgroups")
                    : t("common:localities")}
                </p>
              </div>
              {planningToolType !== BLOCKGROUP_PLANNING_TOOL_TYPE && (
                <div className="flex items-center md:pb-0 pb-1">
                  <p className="text-sm font-semibold rounded-full text-brand-green-dark px-2 bg-brand-green-light">
                    {`${blockgroupsBelowTarget.length} ${t("common:blockgroups")}`}
                  </p>
                </div>
              )}
            </div>
            <p className="text-sm font-medium pb-1">
              {t("location-insights:advanced_planning_tools.subtitle", {
                planningToolType: planningToolType === BLOCKGROUP_PLANNING_TOOL_TYPE ? t("common:blockgroups") : t("common:localities"),
              })}
            </p>
          </div>
          <button
            className="min-w-[200px] flex justify-between items-center px-3 py-1.5 bg-brand-green-dark text-white rounded-full shadow-md hover:bg-brand-green text-caption transition-colors duration-300"
            onClick={handleButtonClick}
          >
            {isOpen ? t("location-insights:advanced_planning_tools.hide") : t("location-insights:advanced_planning_tools.expand")}
            <TriangleUpIcon
              className={`h-6 w-6 transition-all ${isOpen ? "-rotate-90" : "rotate-180"}`}
            />
          </button>
        </div>
        {isOpen && (
          <Suspense fallback={null}>
            <div className="mt-4">
              <div className="mb-8 mt-4">
                <TableMap blockgroups={blockgroups} type={planningToolType} tableData={tableData} />
              </div>
              <DataTable
                title={title}
                type={
                  planningToolType === BLOCKGROUP_PLANNING_TOOL_TYPE
                    ? BLOCKGROUP_PLANNING_TOOL_TYPE
                    : LOCALITY_PLANNING_TOOL_TYPE
                }
              />
            </div>
          </Suspense>
        )}
      </div>
    </div>
  )
}

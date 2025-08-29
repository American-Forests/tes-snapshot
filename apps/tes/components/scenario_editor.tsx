import { useContext } from "react"
import { useQuery, useMutation, invalidateQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import Head from "next/head"
import { Crosshair2Icon, TrashIcon } from "@radix-ui/react-icons"
import getScenario from "app/scenarios/queries/getScenario"
import * as Collapsible from "@radix-ui/react-collapsible"
import { ScenarioName } from "./scenario_name"
import { ScenarioDelete } from "./scenario_delete"
import { formatNumber } from "app/utils/formatting_utils"
import { match } from "ts-pattern"
import { LngLatBoundsLike } from "mapbox-gl"
import { styledButton2 } from "./elements"
import deleteBlockgroupOnScenario from "app/blockgroup-on-scenarios/mutations/deleteBlockgroupOnScenario"
import deleteAreaOnScenario from "app/area-on-scenarios/mutations/deleteAreaOnScenario"
import { AdjustTrigger } from "app/features/legacy-reports/regional_report"
import { CityContext, MapContext } from "app/features/regional-map/regional-map.state"
import { getBbox, getTotalTargetTreesFromTargetAreas } from "app/utils/scenario_utils"
import { scenarioIdEncode } from "app/utils/formatting_utils"
import { ScenarioArea, ScenarioBlockgroup } from "types/data"
import getBlockgroupGeometry from "app/blockgroups/queries/getBlockgroupGeometry"
import getAreaGeometry from "app/areas/queries/getAreaGeometry"

type GetScenario = Awaited<ReturnType<typeof getScenario>>

function ScenarioItem({
  blockgroupOnScenario,
  scenario,
}: {
  blockgroupOnScenario: GetScenario["blockgroups"][0]
  scenario: GetScenario
}) {
  const [deleteBlockgroupOnScenarioMutation] = useMutation(deleteBlockgroupOnScenario)
  const [blockgroupGeometry] = useQuery(getBlockgroupGeometry, {
    id: blockgroupOnScenario.blockgroupId,
  })
  const map = useContext(MapContext)
  const city = useContext(CityContext)!
  const label = `${blockgroupOnScenario.name} #${blockgroupOnScenario.blockgroupId}`

  return (
    <div className="pl-3 pr-3 py-1 font-semibold flex justify-between text-sm group text-gray-500 hover:text-black hover:bg-brand-green hover:bg-opacity-20 gap-x-2">
      <Link
        legacyBehavior
        shallow
        href={Routes.Map({
          scenarioId: scenarioIdEncode(scenario.id),
          blockgroupId: blockgroupOnScenario.blockgroupId,
          city: city.id,
        })}
      >
        <a className="flex items-center flex-auto group">
          <div className="flex flex-auto items-center">
            <span>{label}</span>
          </div>
          <span className="transition-all group-hover:opacity-100 opacity-0">
            <AdjustTrigger />
          </span>
        </a>
      </Link>
      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-green-dark"
        type="button"
        title="Zoom to blockgroup"
        onClick={() => {
          map?.fitBounds(getBbox(blockgroupGeometry) as LngLatBoundsLike)
        }}
      >
        <Crosshair2Icon />
      </button>
      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-green-dark"
        type="button"
        title="Delete"
        onClick={async () => {
          if (confirm("Are you sure you want to remove this blockgroup from this scenario?")) {
            await deleteBlockgroupOnScenarioMutation({
              scenarioId: scenario.id,
              blockgroupId: blockgroupOnScenario.blockgroupId,
            })
            await invalidateQuery(getScenario, { id: scenario.id })
          }
        }}
      >
        <TrashIcon />
      </button>
    </div>
  )
}

function SubItem({
  areaOnScenario,
  scenario,
}: {
  areaOnScenario: GetScenario["areas"][0]
  scenario: GetScenario
}) {
  const [deleteAreaOnScenarioMutation] = useMutation(deleteAreaOnScenario)
  const [areaGeometry] = useQuery(getAreaGeometry, { id: areaOnScenario.areaId })
  const map = useContext(MapContext)
  const city = useContext(CityContext)!
  const label = match(areaOnScenario)
    .with(
      { area: { type: "RIGHT_OF_WAY" } },
      (areaOnScenario: ScenarioArea) =>
        `${areaOnScenario.name ? areaOnScenario.name : "Right-of-way"} ${
          areaOnScenario.area.address ? `| ${areaOnScenario.area.address.toLowerCase()}` : ""
        }`
    )
    .with(
      { area: { type: "PARCEL" } },
      (areaOnScenario: ScenarioArea) =>
        `${areaOnScenario.name ? areaOnScenario.name : "Parcel"} ${
          areaOnScenario.area.address ? `| ${areaOnScenario.area.address.toLowerCase()}` : ""
        }`
    )
    .exhaustive()
  return (
    <div className="pl-8 pr-3 py-0.5 flex justify-between text-sm group text-gray-700 hover:text-black gap-x-2 hover:bg-brand-green hover:bg-opacity-20">
      <Link
        legacyBehavior
        shallow
        href={Routes.Map({
          scenarioId: scenarioIdEncode(scenario.id),
          areaId: areaOnScenario.area.id,
          city: city.id,
        })}
      >
        <a className="flex items-center flex-auto group">
          <div className="flex-auto capitalize">{label}</div>
          <span className="transition-all group-hover:opacity-100 opacity-0">
            <AdjustTrigger />
          </span>
        </a>
      </Link>
      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-green-dark"
        type="button"
        title="Zoom to area"
        onClick={() => {
          map?.fitBounds(getBbox(areaGeometry) as LngLatBoundsLike)
        }}
      >
        <Crosshair2Icon />
      </button>
      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-green-dark"
        type="button"
        title="Delete"
        onClick={async () => {
          await deleteAreaOnScenarioMutation({
            scenarioId: scenario.id,
            areaId: areaOnScenario.areaId,
          })
          await invalidateQuery(getScenario, { id: scenario.id })
        }}
      >
        <TrashIcon />
      </button>
    </div>
  )
}

export function ScenarioEditor({ scenarioId }: { scenarioId: number }) {
  const city = useContext(CityContext)!
  const [scenario] = useQuery(getScenario, {
    id: scenarioId,
  })
  const targetTrees = getTotalTargetTreesFromTargetAreas(scenario.blockgroups)

  return (
    <>
      <Head>
        <title>{`TESA ${city?.shortTitle || ""} | ${scenario.name}`}</title>
      </Head>
      <div className="flex-auto">
        <Collapsible.Root defaultOpen>
          <div className="flex items-center justify-between">
            <ScenarioName scenario={scenario} />
            <ScenarioDelete id={scenario.id} />
          </div>
          <Collapsible.Content className="divide-y divide-gray-300">
            <div className="bg-gray-100">
              {scenario.blockgroups.length ? (
                <>
                  <div className="py-4 space-y-1">
                    {scenario.blockgroups.map(
                      (blockgroupOnScenario: ScenarioBlockgroup, i: number) => (
                        <div key={i}>
                          <ScenarioItem
                            blockgroupOnScenario={blockgroupOnScenario}
                            scenario={scenario}
                          />
                          {scenario.areas
                            .filter((area: ScenarioArea) => {
                              return area.area.blockgroupId === blockgroupOnScenario.blockgroupId
                            })
                            .map((areaOnScenario: ScenarioArea, i: number) => {
                              return (
                                <SubItem
                                  key={i}
                                  areaOnScenario={areaOnScenario}
                                  scenario={scenario}
                                />
                              )
                            })}
                        </div>
                      )
                    )}
                  </div>
                </>
              ) : (
                <div className="p-4 flex justify-center">
                  <div className="text-sm max-w-xs">
                    Click on an area on the map to start planting.
                  </div>
                </div>
              )}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
      <div className="p-4">
        <div className="flex divide-x divide-gray-200">
          <div className="py-2 pr-4 text-brand-green text-xs font-semibold">
            Project
            <br />
            Planting
            <br />
            Overview
          </div>
          <div className="px-4 py-2">
            <div className="text-xl font-bold text-brand-green">
              {targetTrees.toLocaleString("en")}
            </div>
            <div className="text-gray-500 text-xs">Trees Targeted</div>
          </div>
          <div className="px-4 py-2">
            <div className="text-xs text-gray-500">
              <span className="font-bold text-brand-green">
                {formatNumber(scenario.blockgroups.length)}
              </span>{" "}
              {city.locale && city.locale === "en-CA" ? "Census Tract" : "Block Group"}s
            </div>
            <div className="h-1" />
            <div className="text-xs text-gray-500">
              <span className="font-bold text-brand-green">
                {formatNumber(
                  scenario.areas.filter((area: ScenarioArea) => area.area.type === "PARCEL").length
                )}
              </span>{" "}
              Parcels
            </div>
            <div className="h-1" />
            <div className="text-xs text-gray-500">
              <span className="font-bold text-brand-green">
                {formatNumber(
                  scenario.areas.filter((area: ScenarioArea) => area.area.type === "RIGHT_OF_WAY")
                    .length
                )}
              </span>{" "}
              Rights-of-way
            </div>
          </div>
        </div>
        {scenario.blockgroups.length > 0 && (
          <div className="pb-2 pt-4 flex justify-center">
            <Link
              legacyBehavior
              href={Routes.ReportPage({ id: scenarioIdEncode(scenario.id), city: city.id })}
            >
              <a className={styledButton2({ variant: "orange", size: "sm" })}>
                View Project Impact Report
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

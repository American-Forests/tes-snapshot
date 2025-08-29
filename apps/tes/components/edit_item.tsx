import { Crosshair2Icon, TrashIcon } from "@radix-ui/react-icons"
import Form from "app/core/components/Form"
import { scenarioIdEncode } from "app/utils/formatting_utils"
import { AreaOnScenarioForm } from "app/area-on-scenarios/components/AreaOnScenarioForm"
import getAreaOnScenario from "app/area-on-scenarios/queries/getAreaOnScenario"
import deleteAreaOnScenario from "app/area-on-scenarios/mutations/deleteAreaOnScenario"
import updateAreaOnScenario from "app/area-on-scenarios/mutations/updateAreaOnScenario"
import getScenario from "app/scenarios/queries/getScenario"
import getScenarios from "app/scenarios/queries/getScenarios"
import { DeleteAreaOnScenario, UpdateAreaOnScenario } from "app/validations"
import { useQuery, useMutation, invalidateQuery } from "@blitzjs/rpc"
import Head from "next/head"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { LngLatBoundsLike } from "mapbox-gl"
import { EditableAreaOnScenarioName } from "components/editable_area_on_scenario_name"

import { selectedFeatureAtom } from "app/state"
import { useSetAtom } from "jotai"
import { CityContext, MapContext } from "app/features/regional-map/regional-map.state"
import getAreaGeometry from "app/areas/queries/getAreaGeometry"
import { getBbox } from "app/utils/scenario_utils"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export function EditItem({ scenarioId, areaId }: { scenarioId: number; areaId: string }) {
  const map = useContext(MapContext)
  const city = useContext(CityContext)!

  const [{ area, scenario, areaOnScenario }, { error }] = useQuery(getAreaOnScenario, {
    scenarioId,
    areaId,
  })

  if (error) {
    return (
      <div className="p-3 bg-white">
        <div className="flex items-center gap-2 text-red-600">
          <ExclamationTriangleIcon />
          <p>Error loading area data. Please try again later.</p>
        </div>
      </div>
    )
  }

  const router = useRouter()
  const setSelectedFeature = useSetAtom(selectedFeatureAtom)
  const [updateAreaOnScenarioMutation] = useMutation(updateAreaOnScenario)
  const [deleteAreaOnScenarioMutation] = useMutation(deleteAreaOnScenario)
  const [areaGeometry] = useQuery(getAreaGeometry, { id: areaId })

  return (
    <>
      <Head>
        <title>{`TESA ${city?.shortTitle || ""} | ${scenario.name}`}</title>
      </Head>
      <div className="p-3 bg-white flex flex-row justify-between items-center">
        <p className="text-brand-green">{scenario.name}</p>
      </div>
      <div className="flex justify-between gap-x-2 items-center p-3 bg-gray-100 border-b border-gray-300">
        <EditableAreaOnScenarioName areaOnScenario={areaOnScenario} area={area} />
        {areaOnScenario ? (
          <div className="flex flex-row p-2 rounded-sm bg-gray-200 w-14 justify-between items-center">
            <button
              className="group-hover:opacity-100 transition-opacity text-gray-400"
              type="button"
              title="Zoom to area"
              onClick={() => {
                map?.fitBounds(getBbox(areaGeometry) as LngLatBoundsLike)
              }}
            >
              <Crosshair2Icon />
            </button>
            <span className="text-red-500">
              <Form
                schema={DeleteAreaOnScenario}
                initialValues={{
                  scenarioId: areaOnScenario.scenarioId,
                  areaId: areaOnScenario.areaId,
                }}
                submitText={<TrashIcon />}
                variant="destructive-icon"
                size="icon"
                onSubmit={async (values) => {
                  await deleteAreaOnScenarioMutation(values)
                  await invalidateQuery(getScenario, { id: scenario.id })
                  router.push(
                    Routes.Map({ scenarioId: scenarioIdEncode(scenarioId), city: city.id })
                  )
                }}
              ></Form>
            </span>
          </div>
        ) : null}
      </div>
      <AreaOnScenarioForm
        submitText={"Update item"}
        schema={UpdateAreaOnScenario}
        areaOnScenario={areaOnScenario}
        scenario={scenario}
        area={area}
        onCancel={() => {
          setSelectedFeature(null)
          router.push(Routes.Map({ scenarioId: scenarioIdEncode(scenario.id), city: city.id }))
        }}
        onSubmit={async (values) => {
          await updateAreaOnScenarioMutation({
            ...values,
            name: areaOnScenario ? areaOnScenario.name : null,
          })
          await invalidateQuery(getScenarios)
          await invalidateQuery(getScenario, { id: scenario.id })
          await invalidateQuery(getAreaOnScenario, {
            scenarioId,
            areaId,
          })
          setSelectedFeature(null)
          router.push(Routes.Map({ scenarioId: scenarioIdEncode(scenario.id), city: city.id }))
        }}
      />
    </>
  )
}

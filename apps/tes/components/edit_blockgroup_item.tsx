import { Crosshair2Icon, TrashIcon } from "@radix-ui/react-icons"
import Form from "app/core/components/Form"
import { scenarioIdEncode } from "app/utils/formatting_utils"
import { BlockgroupOnScenarioForm } from "app/blockgroup-on-scenarios/components/BlockgroupOnScenarioForm"
import getBlockgroupOnScenario from "app/blockgroup-on-scenarios/queries/getBlockgroupOnScenario"
import deleteBlockgroupOnScenario from "app/blockgroup-on-scenarios/mutations/deleteBlockgroupOnScenario"
import updateBlockgroupOnScenario from "app/blockgroup-on-scenarios/mutations/updateBlockgroupOnScenario"
import getScenario from "app/scenarios/queries/getScenario"
import getScenarios from "app/scenarios/queries/getScenarios"
import { EditableBlockgroupOnScenarioName } from "./editable_blockgroup_on_scenario_name"
import { DeleteBlockgroupOnScenario, UpdateBlockgroupOnScenario } from "app/validations"
import { useQuery, useMutation, invalidateQuery } from "@blitzjs/rpc"
import Head from "next/head"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { LngLatBoundsLike } from "mapbox-gl"

import { selectedFeatureAtom } from "app/state"
import { useSetAtom } from "jotai"
import { CityContext, MapContext } from "app/features/regional-map/regional-map.state"
import getBlockgroupGeometry from "app/blockgroups/queries/getBlockgroupGeometry"
import { getBbox } from "app/utils/scenario_utils"

export function EditBlockgroupItem({
  scenarioId,
  blockgroupId,
}: {
  scenarioId: number
  blockgroupId: string
}) {
  const map = useContext(MapContext)
  const city = useContext(CityContext)!
  const [scenario] = useQuery(getScenario, { id: scenarioId })
  const [{ blockgroup, blockgroupOnScenario }] = useQuery(getBlockgroupOnScenario, {
    scenarioId,
    blockgroupId,
  })
  const [blockgroupGeometry] = useQuery(getBlockgroupGeometry, { id: blockgroupId })
  const setSelectedFeature = useSetAtom(selectedFeatureAtom)
  const router = useRouter()
  const [updateBlockgroupOnScenarioMutation] = useMutation(updateBlockgroupOnScenario)
  const [deleteBlockgroupOnScenarioMutation] = useMutation(deleteBlockgroupOnScenario)
  return (
    <>
      <Head>
        <title>{`TESA ${city?.shortTitle || ""} | ${scenario.name}`}</title>
      </Head>
      <div className="p-3 bg-white flex flex-row justify-between items-center">
        <p className="text-brand-green">{scenario.name}</p>
      </div>
      <div className="border-b border-gray-300 flex justify-between gap-x-2 items-center p-3 bg-gray-100">
        <div className="font-sm flex items-center gap-x-2 font-medium flex-auto">
          {blockgroupOnScenario ? (
            <EditableBlockgroupOnScenarioName blockgroupOnScenario={blockgroupOnScenario} />
          ) : (
            <div className="text-brand-green capitalize">
              <span>{city.locale && city.locale === "en-CA" ? "census tract" : "block group"}</span>
              <span>| {blockgroup.id}</span>
            </div>
          )}
        </div>
        <button
          className="opacity-70 hover:opacity-100 transition-opacity"
          type="button"
          title={`Zoom to ${
            city.locale && city.locale === "en-CA" ? "census tract" : "block group"
          }`}
          onClick={() => {
            map?.fitBounds(getBbox(blockgroupGeometry) as LngLatBoundsLike)
          }}
        >
          <Crosshair2Icon />
        </button>
        {blockgroupOnScenario ? (
          <span className="opacity-70 hover:opacity-100 transition-opacity">
            <Form
              schema={DeleteBlockgroupOnScenario}
              initialValues={{
                scenarioId: blockgroupOnScenario.scenarioId,
                blockgroupId: blockgroupOnScenario.blockgroupId,
              }}
              submitText={<TrashIcon />}
              variant="destructive-icon"
              size="icon"
              onSubmit={async (values) => {
                await deleteBlockgroupOnScenarioMutation(values)
                await invalidateQuery(getScenario, { id: scenario.id })
                router.push(Routes.Map({ scenarioId: scenarioIdEncode(scenarioId), city: city.id }))
              }}
            ></Form>
          </span>
        ) : null}
      </div>
      <BlockgroupOnScenarioForm
        submitText={blockgroupOnScenario ? "Update block group" : "Add to scenario"}
        schema={UpdateBlockgroupOnScenario}
        blockgroupOnScenario={blockgroupOnScenario}
        scenario={scenario}
        blockgroup={blockgroup}
        onCancel={() => {
          router.push(Routes.Map({ scenarioId: scenarioIdEncode(scenario.id), city: city.id }))
          setSelectedFeature(null)
        }}
        onSubmit={async (values) => {
          try {
            await updateBlockgroupOnScenarioMutation(values)
            await invalidateQuery(getScenarios)
            await invalidateQuery(getScenario, { id: scenario.id })
            await invalidateQuery(getBlockgroupOnScenario, {
              scenarioId,
              blockgroupId,
            })
            setSelectedFeature(null)
            router.push(Routes.Map({ scenarioId: scenarioIdEncode(scenario.id), city: city.id }))
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
          }
        }}
      />
    </>
  )
}

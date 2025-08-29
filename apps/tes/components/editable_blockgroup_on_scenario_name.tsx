import CompactForm from "app/core/components/CompactForm"
import { scenarioIdEncode } from "app/utils/formatting_utils"
import { UpdateBlockgroupOnScenario } from "app/validations"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Field } from "formik"
import React, { useState, useContext } from "react"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { BlockgroupOnScenario } from "db"
import updateBlockgroupOnScenario from "app/blockgroup-on-scenarios/mutations/updateBlockgroupOnScenario"

import { CityContext } from "app/features/regional-map/regional-map.state"
export function EditableBlockgroupOnScenarioName({
  blockgroupOnScenario,
}: {
  blockgroupOnScenario: BlockgroupOnScenario
}) {
  const city = useContext(CityContext)!
  const router = useRouter()
  const [renaming, setRenaming] = useState<boolean>(false)
  const [updateBlockgroupOnScenarioMutation] = useMutation(updateBlockgroupOnScenario)

  if (renaming) {
    return (
      <div className="p-3">
        <CompactForm
          initialValues={blockgroupOnScenario}
          schema={UpdateBlockgroupOnScenario}
          submitText="Rename block group"
          onSubmit={async (values) => {
            await updateBlockgroupOnScenarioMutation({
              name: values.name,
              treeEquityScoreTarget: blockgroupOnScenario.treeEquityScoreTarget,
              scenarioId: blockgroupOnScenario.scenarioId,
              blockgroupId: blockgroupOnScenario.blockgroupId,
              targetArea: values.targetArea,
            })
            router.push(
              Routes.Map({
                id: scenarioIdEncode(blockgroupOnScenario.scenarioId),
                city: city.id,
              }),
            )
            setRenaming(false)
          }}
        >
          <Field
            type="text"
            className="h-8 rounded-r-none bg-gray-50 text-brand-green-dark font-medium border rounded-md border-gray-300 px-2 border-r-0 flex-auto py-0.5"
            name="name"
          />
        </CompactForm>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-x-2">
      <div className="font-medium text-brand-green capitalize">{blockgroupOnScenario.name}</div>
      <button
        className="text-black opacity-30 transition-opacity hover:opacity-100"
        onClick={() => setRenaming(true)}
      >
        <Pencil1Icon />
      </button>

      <span className="text-brand-green">| {blockgroupOnScenario.blockgroupId}</span>
    </div>
  )
}

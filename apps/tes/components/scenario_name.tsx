import CompactForm from "app/core/components/CompactForm"
import getScenario from "app/scenarios/queries/getScenario"
import { RenameScenario } from "app/validations"
import updateScenario from "app/scenarios/mutations/updateScenario"
import { useMutation, invalidateQuery } from "@blitzjs/rpc"
import { Field } from "formik"
import React, { useState } from "react"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { Scenario } from "db"

export function ScenarioName({ scenario }: { scenario: Scenario }) {
  const [renaming, setRenaming] = useState<boolean>(false)
  const [updateScenarioMutation] = useMutation(updateScenario)

  if (renaming) {
    return (
      <div className="p-3">
        <CompactForm
          initialValues={{
            name: scenario.name,
          }}
          schema={RenameScenario}
          submitText="Rename scenario"
          onSubmit={async (values) => {
            await updateScenarioMutation({
              name: values.name,
              id: scenario.id,
            })
            await invalidateQuery(getScenario, { id: scenario.id })
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
    <div className="p-3 flex items-center gap-x-2">
      <div className="font-medium text-brand-green">{scenario.name}</div>
      <button
        className="text-black opacity-30 transition-opacity hover:opacity-100"
        onClick={() => setRenaming(true)}
      >
        <Pencil1Icon />
      </button>
    </div>
  )
}

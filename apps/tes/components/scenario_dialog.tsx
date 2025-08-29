import { FORM_ERROR, ScenarioForm } from "app/scenarios/components/ScenarioForm"
import createScenario from "app/scenarios/mutations/createScenario"
import { useMutation, invalidateQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import * as Dialog from "@radix-ui/react-dialog"
import * as Portal from "@radix-ui/react-portal"
import React, { useContext } from "react"
import getScenarios from "app/scenarios/queries/getScenarios"
import { CreateScenario } from "app/validations"
import { CityContext } from "app/features/regional-map/regional-map.state"
import toast from "react-hot-toast"
import { scenarioIdEncode } from "app/utils/formatting_utils"
import { ErrorWithCode } from "tes-types"

export function ScenarioDialog({ close }: { close: () => void }) {
  const city = useContext(CityContext)!
  const router = useRouter()
  const [createScenarioMutation] = useMutation(createScenario)

  return (
    <Portal.Root>
      <Dialog.Overlay className="inset-0 fixed bg-black bg-opacity-50 z-10 transition-all" />
      <Dialog.Content className="text-left w-96 z-10 fixed left-1/2 -mx-48 top-20 p-6 bg-white rounded-md shadow-lg">
        <div className="flex justify-between pb-2">
          <div className="text-lg font-semibold text-brand-green-dark">Create scenario</div>
        </div>
        <div>
          <ScenarioForm
            submitText="Create scenario"
            schema={CreateScenario}
            initialValues={{
              name: "",
              city: city.id.toUpperCase(),
            }}
            onSubmit={async (values) => {
              toast.dismiss()
              try {
                const scenario = await createScenarioMutation(values)
                await invalidateQuery(getScenarios)
                await router.push(
                  Routes.Map({ scenarioId: scenarioIdEncode(scenario.id), city: city.id })
                )
                close()
              } catch (error) {
                if (error && (error as ErrorWithCode)?.code === "P2002") {
                  return {
                    [FORM_ERROR]: `The name of this scenario conflicts with an existing scenario.`,
                  }
                }
                return {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  [FORM_ERROR]: (error as any)?.toString(),
                }
              }
            }}
          />
        </div>
      </Dialog.Content>
    </Portal.Root>
  )
}

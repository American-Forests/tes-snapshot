import { CardStackMinusIcon, Cross1Icon, TrashIcon } from "@radix-ui/react-icons"
import { useMutation, invalidateQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import * as Collapsible from "@radix-ui/react-collapsible"
import getScenarios from "app/scenarios/queries/getScenarios"
import deleteScenario from "app/scenarios/mutations/deleteScenario"
import { CityContext } from "app/features/regional-map/regional-map.state"
import { useContext } from "react"

export function ScenarioDelete({ id }: { id: number }) {
  const router = useRouter()
  const city = useContext(CityContext)!
  const [deleteScenarioMutation] = useMutation(deleteScenario)
  return (
    <div className="flex justify-between py-2 px-3">
      <div className="flex items-center gap-x-2">
        <button
          className="text-red-500 opacity-50 hover:opacity-100 transition-opacity"
          onClick={async () => {
            await deleteScenarioMutation({ id })
            await invalidateQuery(getScenarios)
            await router.push(Routes.Map({ city: city.id }))
          }}
        >
          <TrashIcon />
        </button>
        <Collapsible.Trigger className="opacity-50 hover:opacity-100 transition-opacity">
          <CardStackMinusIcon />
        </Collapsible.Trigger>
        <Link legacyBehavior href={Routes.Map({ city: city.id })}>
          <a title="Close" className="opacity-50 hover:opacity-100">
            <Cross1Icon />
          </a>
        </Link>
      </div>
    </div>
  )
}

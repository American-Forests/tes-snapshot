import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { A, StyledDropdownMenuContent, StyledDropdownMenuTrigger } from "components/elements"
import React, { useContext } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { PlusIcon } from "@radix-ui/react-icons"
import getScenarios from "app/scenarios/queries/getScenarios"
import { ScenarioDialog } from "./scenario_dialog"
import { CityContext } from "app/features/regional-map/regional-map.state"
import { City, Scenario } from "db"
import toast from "react-hot-toast"
import { scenarioIdEncode } from "app/utils/formatting_utils"

const ITEMS_PER_PAGE = 100

export function ScenariosDropdown() {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const city = useContext(CityContext)!
  const [open, setOpen] = React.useState(false)
  const [menuOpen, menuSetOpen] = React.useState(false)
  const [{ scenarios }] = usePaginatedQuery(getScenarios, {
    where: { city: city.id.toUpperCase() as City },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Root open={menuOpen} onOpenChange={menuSetOpen}>
        <StyledDropdownMenuTrigger>Scenarios & reports</StyledDropdownMenuTrigger>
        <StyledDropdownMenuContent>
          <div className="divide-y divide-gray-200">
            {(scenarios as Scenario[]).length ? (
              (scenarios as Scenario[]).map((scenario: Scenario) => {
                return (
                  <DropdownMenu.Item className="py-2 px-2 text-sm" key={scenario.id}>
                    {scenario.name}
                    <div className="flex items-center gap-x-2">
                      <button
                        onClick={() =>
                          router.push(
                            Routes.Map({
                              scenarioId: scenarioIdEncode(scenario.id),
                              city: city.id,
                            })
                          )
                        }
                      >
                        <A
                          onClick={() => {
                            toast.dismiss()
                            menuSetOpen(false)
                          }}
                          variant="link-in-list"
                        >
                          Scenario
                        </A>
                      </button>
                      <span className="text-brand-green-dark">|</span>
                      <Link
                        legacyBehavior
                        href={Routes.ReportPage({
                          id: scenarioIdEncode(scenario.id),
                          city: city.id,
                        })}
                      >
                        <A
                          onClick={() => {
                            toast.dismiss()
                            menuSetOpen(false)
                          }}
                          variant="link-in-list"
                        >
                          Report
                        </A>
                      </Link>
                    </div>
                  </DropdownMenu.Item>
                )
              })
            ) : (
              <DropdownMenu.Label className="p-2 text-gray-500">
                No scenarios yet.
              </DropdownMenu.Label>
            )}
          </div>
          <DropdownMenu.Item asChild>
            <Dialog.Trigger className="mt-3 uppercase font-semibold text-xs text-gray-500 py-1 px-2 flex items-center gap-x-1 hover:outline-0 hover:bg-gray-100 cursor-pointer">
              <PlusIcon />
              Create scenario
            </Dialog.Trigger>
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="fill-current text-white" />
        </StyledDropdownMenuContent>

        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50" />
        <ScenarioDialog close={() => setOpen(false)} />
      </DropdownMenu.Root>
    </Dialog.Root>
  )
}

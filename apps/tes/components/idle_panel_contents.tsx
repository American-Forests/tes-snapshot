import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons"
import * as Dialog from "@radix-ui/react-dialog"
import React from "react"
import { styledButton2 } from "./elements"
import { ScenarioDialog } from "./scenario_dialog"
import Head from "next/head"
import { useContext } from "react"
import { CityContext } from "../app/features/regional-map/regional-map.state"

export function IdlePanelContents() {
  const [open, setOpen] = React.useState(false)
  const [hidden, setHidden] = React.useState(false)
  const city = useContext(CityContext)
  return (
    <>
      <Head>
        <title>{`TESA ${city?.shortTitle || ""}`}</title>
      </Head>
      {hidden ? null : (
        <div className="p-8 space-y-8 relative">
          <button
            title="Close"
            className="opacity-50 hover:opacity-100 absolute top-4 right-4"
            onClick={() => setHidden(true)}
          >
            <Cross1Icon />
          </button>
          <p className="text-gray-700 text-md">
            Welcome to the Tree Equity Score Analyzer. Browse the map to view scores, then create or
            choose a scenario to plan tree planting projects.
          </p>
          <div className="text-center">
            <Dialog.Root open={open} onOpenChange={(open) => setOpen(open)}>
              <Dialog.Trigger className={styledButton2({ variant: "primary" })}>
                <PlusIcon />
                Create scenario
              </Dialog.Trigger>
              <ScenarioDialog close={() => setOpen(false)} />
            </Dialog.Root>
          </div>
        </div>
      )}
    </>
  )
}

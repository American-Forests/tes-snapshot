import { useEffect, useState } from "react"
import { Area, AreaOnScenario } from "db"
import { useMutation, invalidateQuery } from "@blitzjs/rpc"
import updateAreaOnScenario from "app/area-on-scenarios/mutations/updateAreaOnScenario"
import CompactForm from "app/core/components/CompactForm"
import getAreaOnScenario from "app/area-on-scenarios/queries/getAreaOnScenario"
import { Field } from "formik"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { UpdateAreaOnScenario } from "app/validations"

export function EditableAreaOnScenarioName(props: {
  areaOnScenario: AreaOnScenario | null
  area: Area
}) {
  const { areaOnScenario, area } = props
  const [renaming, setRenaming] = useState<boolean>(false)
  const [updateAreaOnScenarioMutation] = useMutation(updateAreaOnScenario)

  function formatName(areaOnScenario: AreaOnScenario | null, area: Area): string {
    let name = ""
    if (areaOnScenario && areaOnScenario.name) name += areaOnScenario.name
    else if (area.type === "PARCEL") name += "Parcel"
    else if (area.type === "RIGHT_OF_WAY") name += "Right-of-way"
    return name
  }

  useEffect(() => {
    setRenaming(false)
  }, [areaOnScenario])

  if (renaming && areaOnScenario) {
    return (
      <div className="p-3">
        <CompactForm
          initialValues={{
            name: areaOnScenario.name,
            scenarioId: areaOnScenario.scenarioId,
            areaId: areaOnScenario.areaId,
            treesSmall: areaOnScenario.treesSmall,
            treesMedium: areaOnScenario.treesMedium,
            treesLarge: areaOnScenario.treesLarge,
          }}
          schema={UpdateAreaOnScenario}
          submitText="Rename parcel/right-of-way"
          onSubmit={async (values) => {
            await updateAreaOnScenarioMutation({
              name: values.name,
              scenarioId: areaOnScenario.scenarioId,
              areaId: areaOnScenario.areaId,
              treesSmall: areaOnScenario.treesSmall,
              treesMedium: areaOnScenario.treesMedium,
              treesLarge: areaOnScenario.treesLarge,
            })
            await invalidateQuery(getAreaOnScenario, {
              scenarioId: areaOnScenario.scenarioId,
              areaId: areaOnScenario.areaId,
            })
            setRenaming(false)
          }}
        >
          <Field
            type="text"
            className="h-8 rounded-r-none bg-gray-50 text-brand-green-dark font-medium border rounded-md border-gray-300 px-2 border-r-0 flex-auto py-0.5"
            name="name"
            defaultValue={formatName(areaOnScenario, area)}
          />
        </CompactForm>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-x-2 text-brand-green">
      <div className="font-medium  capitalize">{formatName(areaOnScenario, area)}</div>
      {areaOnScenario && (
        <button
          className="text-black opacity-30 transition-opacity hover:opacity-100"
          onClick={() => setRenaming(true)}
        >
          <Pencil1Icon />
        </button>
      )}
      {area.address ? <span>| {area.address}</span> : <></>}
    </div>
  )
}

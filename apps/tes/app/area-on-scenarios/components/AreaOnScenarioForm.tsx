import { useQuery, invalidateQuery, useMutation } from "@blitzjs/rpc"
import { TrashIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { FormProps } from "app/core/components/Form"
import getScenario from "app/scenarios/queries/getScenario"
import { Scenario, Area, AreaOnScenario } from "db"
import { Field, Form, Formik, useFormikContext } from "formik"
import updateBlockgroupOnScenario from "app/blockgroup-on-scenarios/mutations/updateBlockgroupOnScenario"
import getBlockgroupOnScenario from "app/blockgroup-on-scenarios/queries/getBlockgroupOnScenario"
import React, { useContext, useState } from "react"
import { z } from "zod"
import getScenarios from "app/scenarios/queries/getScenarios"
import {
  getAreaSum,
  getAcresNeeded,
  approxTreeCount,
  getAreasOnBlockgroup,
  calculateTreeEquityScoreIncrease,
  getScenarioTotalProposedTreeCount,
  calculateScenarioTotalTreeCanopySqft,
  totalTrees,
} from "app/utils/scenario_utils"
import {
  CreateAreaOnScenario,
  UpdateAreaOnScenario,
  UpdateBlockgroupOnScenario,
} from "app/validations"
import { styledButton2 } from "components/elements"
import Help from "components/help"
export { FORM_ERROR } from "app/core/components/Form"
import { TYPES, TREE_INFO, ZERO_TREES, DEFAULT_TARGET_INCREASE } from "app/constants"
import { formatNumber } from "app/utils/formatting_utils"
import {
  squareFeetToAcres,
  squareFeetToSquareMeters,
  squareKilometersToSquareFeet,
} from "app/utils/conversion_utils"
import { ScenarioBuilderSlider } from "components/scenario_builder_slider"
import { CityContext } from "app/features/regional-map/regional-map.state"
import { validateZodSchema } from "blitz"

type TypeKey = (typeof TYPES)[number]

function BlockGroupOverview({
  area,
  areaOnScenario,
  scenarioId,
  parentFormIsSubmitting,
  parentFormOnSubmit,
  parentFormValues,
  parentFormOnCancel,
}: FormProps<typeof CreateAreaOnScenario> & {
  area: Area
  areaOnScenario: AreaOnScenario | null
  scenarioId: number
  parentFormIsSubmitting: boolean
  parentFormOnSubmit: (values: {
    scenarioId: number
    treesLarge: number
    treesMedium: number
    treesSmall: number
    areaId: string
  }) => void
  parentFormValues: {
    scenarioId: number
    treesLarge: number
    treesMedium: number
    treesSmall: number
    areaId: string
  }
  onCancel: () => void
  onSubmit: (values: {
    name: string
    treeEquityScoreTarget: number
    scenarioId: number
    blockgroupId: number
  }) => void
  parentFormOnCancel: () => void
}) {
  const [scenario] = useQuery(getScenario, {
    id: scenarioId,
  })
  const [{ blockgroup, blockgroupOnScenario }] = useQuery(getBlockgroupOnScenario, {
    scenarioId: scenario.id,
    blockgroupId: area.blockgroupId,
  })
  const [updateBlockgroupOnScenarioMutation] = useMutation(updateBlockgroupOnScenario)

  if (!blockgroup) return null
  const areas = getAreasOnBlockgroup(scenario, blockgroup)
  const city = useContext(CityContext)!

  let improvedTarget = 0
  // canopy proposed in currently selected parcel/right-of-way

  const areaOnScenarioContext = useFormikContext<AreaOnScenario>()

  let plannedCanopy = usePlannedArea()
  let proposedTrees = totalTrees(areaOnScenarioContext.values)

  if (areas.length) {
    const selectedAreaId = areaOnScenarioContext.values.areaId
    // usePlannedArea() sums the canopy proposed in the currently selected area, filter the
    // selected area out so it's proposed canopy isn't double counted
    const otherAreas = areas.filter((area: AreaOnScenario) => area.areaId != selectedAreaId)
    plannedCanopy += calculateScenarioTotalTreeCanopySqft(otherAreas)
    proposedTrees += getScenarioTotalProposedTreeCount(otherAreas)
  }
  improvedTarget = calculateTreeEquityScoreIncrease(blockgroup, squareFeetToAcres(plannedCanopy))

  const [isSliderDisabled, setIsSliderDisabled] = useState(true)
  const toggleSliderState = () => setIsSliderDisabled(!isSliderDisabled)
  const schema = UpdateBlockgroupOnScenario

  return (
    <Formik<z.infer<typeof UpdateBlockgroupOnScenario>>
      enableReinitialize
      initialValues={
        blockgroupOnScenario || {
          name: city.locale && city.locale === "en-CA" ? "Census Tract" : "Block Group",
          treeEquityScoreTarget: Math.min(
            100,
            blockgroup.tree_equity_score + DEFAULT_TARGET_INCREASE
          ),
          scenarioId: scenario.id,
          blockgroupId: blockgroup.id,
          targetArea: getAcresNeeded(
            blockgroup,
            blockgroup.tree_equity_score + DEFAULT_TARGET_INCREASE
          ),
        }
      }
      validate={async (val) => {
        return await validateZodSchema(schema)(val)
      }}
      onSubmit={() => {}}
    >
      {(props) => {
        const { values } = props
        return (
          <>
            <div className="border-b-2">
              <p className="capitalize text-brand-green-dark p-4">{`${
                city.locale && city.locale === "en-CA" ? "Census tract" : "Block group"
              } overview | ${area.blockgroupId}`}</p>
              {!props.touched.treeEquityScoreTarget && !blockgroupOnScenario && (
                <div className="text-annotation text-gray-600 pl-2">
                  A default target of +5 has been set for this{" "}
                  {city.locale && city.locale === "en-CA" ? "census tract" : "block group"}'s Tree
                  Equity Score. Adjust it below if needed.
                </div>
              )}
              <div className="pt-10 flex flex-row px-4">
                <div className="mr-2">
                  <p className="uppercase text-[0.65rem] font-bold text-gray-500 text-center -mb-1">
                    starting
                  </p>
                  <p className="uppercase text-caption font-bold text-gray-500 text-center">
                    {blockgroup.tree_equity_score}
                  </p>
                </div>
                <Field
                  min={blockgroup.tree_equity_score}
                  max={100}
                  component={ScenarioBuilderSlider}
                  disabled={isSliderDisabled}
                  className="w-3/4"
                  name="treeEquityScoreTarget"
                  defaultValue={blockgroupOnScenario?.treeEquityScoreTarget}
                  improvedTarget={improvedTarget}
                />
                <div className="ml-2">
                  <p className="uppercase text-annotation font-bold text-gray-500 text-center -mb-1">
                    max
                  </p>
                  <p className="uppercase text-caption font-bold text-gray-500 text-center">100</p>
                </div>
              </div>
              <div className="flex flex-row items-center p-4 text-annotation mt-6">
                <div className="border-r-2 px-2">
                  <p className="text-brand-green font-bold">
                    {blockgroupOnScenario &&
                    values.treeEquityScoreTarget == blockgroupOnScenario.treeEquityScoreTarget
                      ? approxTreeCount(blockgroupOnScenario?.targetArea)
                      : approxTreeCount(getAcresNeeded(blockgroup, values.treeEquityScoreTarget))}
                  </p>
                  <p className="text-gray-500">approx. trees needed to reach the target</p>
                </div>
                <div className="border-r-2 px-2">
                  <p className="text-brand-green font-bold">{`${proposedTrees}`}</p>
                  <p className="text-gray-500">
                    trees planted in this{" "}
                    {city.locale && city.locale === "en-CA" ? "census tract" : "block group"}
                  </p>
                </div>
                {isSliderDisabled ? (
                  <div className="pl-1">
                    <button
                      className={styledButton2({ variant: "outline" })}
                      type="button"
                      onClick={toggleSliderState}
                    >
                      Adjust Target
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 pl-2">Update scenario below to save new target</p>
                )}
              </div>
            </div>
            <div className="p-4 flex justify-center gap-x-2">
              <button
                onClick={async () => {
                  try {
                    let updatedBlockgroupOnScenarioValues = props.values
                    if (!isSliderDisabled)
                      updatedBlockgroupOnScenarioValues = {
                        ...props.values,
                        targetArea: getAcresNeeded(blockgroup, values.treeEquityScoreTarget),
                      }
                    await updateBlockgroupOnScenarioMutation(updatedBlockgroupOnScenarioValues)
                    await invalidateQuery(getScenarios)
                    await invalidateQuery(getScenario, { id: scenario.id })
                    await invalidateQuery(getBlockgroupOnScenario, {
                      scenarioId: scenario.id,
                      blockgroupId: blockgroup.id,
                    })
                    parentFormOnSubmit(parentFormValues)
                  } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error(e)
                  }
                }}
                className={styledButton2({ variant: "primary" })}
                disabled={parentFormIsSubmitting}
              >
                {areaOnScenario
                  ? isSliderDisabled
                    ? "Update Planting"
                    : "Update Planting & Target"
                  : "Add To Scenario"}
              </button>
              <button
                className={styledButton2({ variant: "outline" })}
                type="button"
                onClick={parentFormOnCancel}
              >
                Cancel
              </button>
            </div>
          </>
        )
      }}
    </Formik>
  )
}

export function AreaOnScenarioForm({
  area,
  scenario,
  areaOnScenario,
  onSubmit,
  onCancel,
}: FormProps<typeof CreateAreaOnScenario> & {
  area: Area
  scenario: Scenario
  areaOnScenario: AreaOnScenario | null
  onCancel: () => void
}) {
  const schema = UpdateAreaOnScenario
  const [formError, setFormError] = useState<string | null>(null)
  const potential_tree_canopy_sqft = squareKilometersToSquareFeet(
    area.area_sqkm * area.potential_tree_canopy
  )
  const city = useContext(CityContext)!

  return (
    <Formik<z.infer<typeof UpdateAreaOnScenario>>
      enableReinitialize
      initialValues={
        areaOnScenario || {
          scenarioId: scenario.id,
          areaId: area.id,
          ...ZERO_TREES,
          name: area.type === "PARCEL" ? "Parcel" : "Right-of-way",
        }
      }
      validate={validateZodSchema(schema)}
      onSubmit={async (values, { setErrors }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}

        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
    >
      {({ setFieldValue, isSubmitting, values }) => {
        return (
          <Form>
            <div className="bg-gray-100">
              <div className="flex justify-center items-center pt-4">
                <span className="text-center font-bold text-caption pr-2">
                  How many trees do you want to plant
                </span>
                <Help>
                  <span>
                    Document a planting plan for this site by adding trees. Available planting space
                    is defined by barren soil, low vegetation, and paved surfaces that are not
                    roads. Roads, structures, water, and existing canopy are excluded. Toggle
                    satellite imagery in the legend to better understand the layout of this site.
                    Site assessment is recommended and you can refine and adjust your saved site
                    plan at any point.
                  </span>
                </Help>
              </div>
              <div className="px-3 py-6 bg-gray-100 space-y-4">
                <div className="text-sm pt-4 w-full">
                  <div className="flex justify-between w-full">
                    <p className="font-bold pb-1">Type</p>
                    <p className="font-bold pb-1">Trees</p>
                    <p className="font-bold pb-1 pr-6">
                      {city.locale && city.locale === "en-CA" ? "m²" : "ft²"}
                    </p>
                  </div>
                  <div className="">
                    {TYPES.map((type) => {
                      return (
                        <div key={type} className="flex justify-between w-full items-center">
                          <div className="w-1/5">{TREE_INFO[type].Type}</div>
                          <div className="p-1 w-2/5">
                            <Field
                              className="text-caption w-28 float-right border-gray-300 rounded-sm p-1 text-left tabular-nums"
                              name={type}
                              min="0"
                              type="number"
                            />
                          </div>
                          <div className="w-1/5">
                            <CalculatedArea type={type} locale={city.locale} />
                          </div>

                          <div>
                            <button
                              onClick={() => {
                                setFieldValue(type, 0)
                              }}
                              className="text-red-700 opacity-30 hover:opacity-100"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className=" py-4 px-3 border-t border-gray-300">
                <p className="capitalize text-brand-green-dark text-body pb-3">
                  Site planting overview
                </p>
                <div className="flex flex-row">
                  <div className="w-1/4">
                    <div className="text-subtitle text-brand-green-dark font-semibold">
                      {`${Math.floor(area.tree_canopy * 100)}%`}
                    </div>
                    <div className="text-sm text-gray-700 capitalize">existing canopy</div>
                  </div>
                  <div className="w-1/4">
                    <PlantingIncrease area={potential_tree_canopy_sqft} p={area} />
                    <div className="text-caption text-gray-700 capitalize">planned canopy</div>
                  </div>
                  <div className="flex flex-col w-2/4">
                    <PlantingProgressBar area={potential_tree_canopy_sqft} />
                    <div className="flex flex-row justify-between">
                      <div>
                        <PlannedArea
                          className="text-brand-green-dark text-caption"
                          locale={city.locale}
                        />
                        <p className="text-caption text-gray-700 text-center">proposed</p>
                      </div>
                      <div className="text-right">
                        <VersusArea
                          className="text-gray-700 text-caption"
                          area={potential_tree_canopy_sqft}
                          locale={city.locale}
                        />
                        <div className="text-caption text-gray-700 text-center">remaining</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <AreaWarning area={potential_tree_canopy_sqft} />
            </div>
            <BlockGroupOverview
              area={area}
              areaOnScenario={areaOnScenario}
              scenarioId={scenario.id}
              onSubmit={async () => undefined}
              onCancel={async () => undefined}
              parentFormIsSubmitting={isSubmitting}
              parentFormOnSubmit={onSubmit}
              parentFormOnCancel={onCancel}
              parentFormValues={values}
            />
            {formError && (
              <div role="alert" className="text-red-500 text-sm p-3">
                {formError}
              </div>
            )}
          </Form>
        )
      }}
    </Formik>
  )
}

/**
 *
 * @returns sum of tree canopy added
 */
function usePlannedArea(): number {
  const { values } = useFormikContext<AreaOnScenario>()
  return getAreaSum(values)
}

function PlannedArea({ className, locale }: { className?: string; locale?: string }) {
  const sum = usePlannedArea()
  return (
    <span className={className}>
      {formatNumber(locale && locale === "en-CA" ? squareFeetToSquareMeters(sum) : sum)}{" "}
      {locale && locale === "en-CA" ? "m" : "ft"}
      <sup>2</sup>
    </span>
  )
}

function PlantingIncrease({ area, p }: { area: number; p: Area }) {
  const sum = usePlannedArea()
  const diff = area - sum
  const increase = Math.round((sum / squareKilometersToSquareFeet(p.area_sqkm)) * 100)
  return (
    <p
      className={`text-subtitle  font-semibol ${
        diff < 0 ? "text-red-500" : "text-brand-green-dark"
      }`}
    >
      {`+${increase}%`}
    </p>
  )
}

function AreaWarning({ area }: { area: number }) {
  const sum = usePlannedArea()
  const diff = area - sum
  if (diff < 0) {
    return (
      <div className="text-red-500 py-2 px-4 flex items-center gap-x-2 text-annotation font-bold">
        <ExclamationTriangleIcon className="flex-none" />
        You can still add these trees to your scenario, but more trees have been added than we
        estimate can fit in the selected space.
      </div>
    )
  }
  return null
}

function VersusArea({
  area,
  className,
  locale,
}: {
  area: number
  className?: string
  locale?: string
}) {
  const sum = usePlannedArea()
  const diff = area - sum
  return (
    <span className={className}>
      {formatNumber(locale && locale === "en-CA" ? squareFeetToSquareMeters(diff) : diff)}{" "}
      {locale && locale === "en-CA" ? "m" : "ft"}
      <sup>2</sup>
    </span>
  )
}

function CalculatedArea({ type, locale }: { type: TypeKey; locale?: string }) {
  const { values } = useFormikContext<AreaOnScenario>()
  if (typeof values[type] !== "number") return <div></div>
  const areaSqFt = values[type] * TREE_INFO[type].AreaSF
  return (
    <div className="text-right tabular-nums whitespace-nowrap">
      {formatNumber(locale && locale === "en-CA" ? squareFeetToSquareMeters(areaSqFt) : areaSqFt)}
    </div>
  )
}

function PlantingProgressBar({ area }: { area: number }) {
  const sum = usePlannedArea()
  const percentage = Math.round((sum / area) * 100)
  const diff = area - sum
  return (
    <div className="relative w-full h-2 rounded-full bg-slate-300 overflow-hidden mt-2 mb-2">
      <div
        className={`absolute h-full ${diff < 0 ? "bg-red-500" : "bg-brand-green"} `}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

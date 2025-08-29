import { FormProps } from "app/core/components/Form"
import { Blockgroup, BlockgroupOnScenario } from "db"
import { Field, Form, Formik, useField, useFormikContext } from "formik"
import React, { useContext, useEffect, useState } from "react"
import { z } from "zod"
import { UpdateBlockgroupOnScenario } from "app/validations"
import { styledButton2 } from "components/elements"
export { FORM_ERROR } from "app/core/components/Form"
import Help from "components/help"
import getScenario from "app/scenarios/queries/getScenario"
import { ScenarioBuilderSlider } from "components/scenario_builder_slider"
import {
  getAcresNeeded,
  approxTreeCount,
  getAreasOnBlockgroup,
  calculateTreeEquityScoreIncrease,
  calculateScenarioTotalTreeCanopySqft,
  approxAcresFromTrees,
} from "app/utils/scenario_utils"
import { squareFeetToAcres } from "app/utils/conversion_utils"
import { DEFAULT_TARGET_INCREASE } from "app/constants"
import { TreesFieldProps } from "../types"
import { CityContext } from "app/features/regional-map/regional-map.state"
import { validateZodSchema } from "blitz"

type GetScenario = Awaited<ReturnType<typeof getScenario>>

export function BlockgroupOnScenarioForm({
  blockgroup,
  scenario,
  blockgroupOnScenario,
  onSubmit,
  onCancel,
}: FormProps<typeof UpdateBlockgroupOnScenario> & {
  blockgroup: Blockgroup
  scenario: GetScenario
  blockgroupOnScenario: BlockgroupOnScenario | null
  submitText: string
  onCancel: () => void
}) {
  const city = useContext(CityContext)!
  const schema = UpdateBlockgroupOnScenario
  const [formError, setFormError] = useState<string | null>(null)
  const [sliderLastTouched, setSliderLastTouched] = useState(false)
  const areas = getAreasOnBlockgroup(scenario, blockgroup)
  const totalTreeCanopyAdded: number = squareFeetToAcres(
    calculateScenarioTotalTreeCanopySqft(areas)
  )
  const maxTargetReached = blockgroup.tree_equity_score === 100
  const improvedTarget: number =
    areas.length && blockgroupOnScenario
      ? calculateTreeEquityScoreIncrease(blockgroup, totalTreeCanopyAdded)
      : 0

  const minTrees = 0
  const maxTrees = approxTreeCount(getAcresNeeded(blockgroup, 100))
  const defaultTrees = blockgroupOnScenario
    ? approxTreeCount(blockgroupOnScenario.targetArea)
    : approxTreeCount(
        getAcresNeeded(blockgroup, blockgroup.tree_equity_score + DEFAULT_TARGET_INCREASE)
      )

  const TreesField = (props: TreesFieldProps) => {
    const {
      values: { treeEquityScoreTarget },
      setFieldValue,
    } = useFormikContext<z.infer<typeof UpdateBlockgroupOnScenario>>()

    const [field] = useField(props)

    useEffect(() => {
      if (sliderLastTouched)
        setFieldValue(
          props.name,
          approxTreeCount(getAcresNeeded(blockgroup, treeEquityScoreTarget))
        )
      setSliderLastTouched(false)
    }, [treeEquityScoreTarget, sliderLastTouched, setFieldValue, props.name])

    return (
      <>
        <input {...props} {...field} />
      </>
    )
  }

  return (
    <Formik<z.infer<typeof UpdateBlockgroupOnScenario>>
      enableReinitialize
      initialValues={
        blockgroupOnScenario || {
          name: city.locale && city.locale === "en-CA" ? "Census Tract" : "Block Group",
          // default target should be +5, but should not exceed 100
          treeEquityScoreTarget: Math.min(
            100,
            blockgroup.tree_equity_score + DEFAULT_TARGET_INCREASE
          ),
          scenarioId: scenario.id,
          blockgroupId: blockgroup.id,
          trees: defaultTrees,
          targetArea: calculateTreeEquityScoreIncrease(
            blockgroup,
            approxAcresFromTrees(defaultTrees)
          ),
        }
      }
      validate={async (val) => {
        return await validateZodSchema(schema)(val)
      }}
      onSubmit={async (values, { setErrors }) => {
        values = {
          ...values,
          targetArea: getAcresNeeded(blockgroup, values.treeEquityScoreTarget),
        }
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}

        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
    >
      {(props) => {
        const { values, touched } = props
        return (
          <Form>
            <div>
              <div className="p-2 py-4 space-y-2 bg-gray-100">
                <div className="font-bold text-caption text-gray-700 text-center">
                  Choose a {city.locale && city.locale === "en-CA" ? "census tract" : "block group"}{" "}
                  Tree Equity Score target{" "}
                  <Help className="w-4 h-4 ml-2 text-brand-green inline-block">
                    <p>
                      Achieving a Tree Equity Score of 100 can be a multi-year project. Set an
                      interim Target Score that fits your needs. Make progress toward your target by
                      allocating trees at the parcel level--this will update your Improved Score.
                    </p>
                  </Help>
                </div>
                {!touched.treeEquityScoreTarget && !blockgroupOnScenario && !maxTargetReached && (
                  <div className="text-annotation text-gray-600 pl-2">
                    A default target of +5 has been set for this{" "}
                    {city.locale && city.locale === "en-CA" ? "census tract" : "block group"}'s Tree
                    Equity Score. Adjust it below if needed.
                  </div>
                )}
                <div className="pt-10 flex flex-row">
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
                    maxTargetReached={maxTargetReached}
                    component={ScenarioBuilderSlider}
                    className="w-3/4"
                    name="treeEquityScoreTarget"
                    defaultValue={blockgroup.tree_equity_score + DEFAULT_TARGET_INCREASE}
                    improvedTarget={improvedTarget}
                    trees={values.trees}
                    blockgroup={blockgroup}
                    setSliderLastTouched={setSliderLastTouched}
                  />
                  <div className="ml-2">
                    <p className="uppercase text-annotation font-bold text-gray-500 text-center -mb-1">
                      max
                    </p>
                    <p className="uppercase text-caption font-bold text-gray-500 text-center">
                      100
                    </p>
                  </div>
                </div>
                {blockgroup.tree_equity_score === 100 ? (
                  <div className="text-annotation text-red-500 pl-2 text-center w-3/4 max-w-[300px] m-auto">
                    <p className="font-bold">
                      This {city.locale && city.locale === "en-CA" ? "census tract" : "block group"}{" "}
                      already has a score of 100.
                    </p>
                    <p>
                      Try selecting a lower-scoring{" "}
                      {city.locale && city.locale === "en-CA" ? "census tract" : "block group"} with
                      greater need.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row items-center pt-6">
                    <p className="text-annotation text-gray-500 pl-2">
                      approx. number of trees targeted
                    </p>
                    <TreesField
                      className="text-annotation w-16 border-gray-300 rounded-sm p-1 text-right tabular-nums text-brand-green font-bold h-6"
                      name="trees"
                      min={minTrees}
                      max={maxTrees}
                      type="number"
                      defaultValue={defaultTrees}
                    />
                    <Help className="w-4 h-4 ml-2 text-brand-green block">
                      <p>
                        Setting a Tree Equity Score target approximates the minimum number of
                        medium-sized trees (
                        {city.locale && city.locale === "en-CA" ? "56sq-m" : "600sq-ft"}) needed to
                        shift the starting score to the target score. You can also customize the
                        number of trees when setting a{" "}
                        {city.locale && city.locale === "en-CA" ? "census tract" : "block group"}{" "}
                        target.
                      </p>
                    </Help>
                  </div>
                )}
              </div>
              <div className="p-4 flex justify-center gap-x-2">
                <button className={styledButton2({ variant: "primary" })} type="submit">
                  {blockgroupOnScenario ? "Save your updates" : "Add to scenario"}
                </button>
                <button
                  className={styledButton2({ variant: "outline" })}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
              {formError && (
                <div role="alert" className="text-red-500 text-sm p-3">
                  {formError}
                </div>
              )}
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

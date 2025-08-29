import {
  approxAcresFromTrees,
  approxTreeCount,
  calculateTreeEquityScoreIncrease,
  getAcresNeeded,
} from "app/utils/scenario_utils"
import { Blockgroup } from "db"
import { FieldProps } from "formik"
import React, { useState, useLayoutEffect, useRef, useEffect } from "react"

function getWidth({
  value,
  min,
  max,
  sliderWidth,
  thumbSize,
}: {
  value: number
  min: number
  max: number
  sliderWidth: number
  thumbSize: number
}) {
  if (min === max) return sliderWidth
  const ratio = (value - min) / (max - min)
  return ratio * sliderWidth - ratio * thumbSize + thumbSize / 2 + 1
}

export function ScenarioBuilderSlider(
  props: FieldProps & {
    min: number
    max: number
    defaultValue?: number
    increase: number
    improvedTarget: number
    disabled?: boolean
    maxTargetReached?: boolean
    trees?: number
    blockgroup?: Blockgroup
    setSliderLastTouched?: React.Dispatch<React.SetStateAction<boolean>>
  },
) {
  const {
    min,
    max,
    disabled,
    defaultValue,
    improvedTarget,
    maxTargetReached,
    trees,
    blockgroup,
    setSliderLastTouched,
  } = props

  useEffect(() => {
    if (trees && setSliderLastTouched && blockgroup) {
      const treesBasedOnCurrentTarget = approxTreeCount(
        getAcresNeeded(blockgroup, props.field.value),
      )
      if (treesBasedOnCurrentTarget != trees) {
        const targetTESBasedOnTrees = calculateTreeEquityScoreIncrease(
          blockgroup,
          approxAcresFromTrees(trees),
        )
        props.form.setFieldValue(props.field.name, targetTESBasedOnTrees)
      }
    }
  }, [trees, props.form.touched.trees])

  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const [sliderWidth, setSliderWidth] = useState(0)

  useLayoutEffect(() => {
    if (!sliderContainerRef.current) return
    setSliderWidth(sliderContainerRef.current.offsetWidth)
  }, [])

  const value = props.field.value || defaultValue
  const width = getWidth({ value, min, max, sliderWidth, thumbSize: 16 })
  const improvementWidth = getWidth({ value: improvedTarget, min, max, sliderWidth, thumbSize: 16 })

  const tesTargetOffset = value === 100 ? 14 : 9
  const tesImprovedOffset = improvedTarget === 100 ? 14 : 9
  return (
    <div className="relative h-4 w-full" ref={sliderContainerRef}>
      {!maxTargetReached && ( // do not display target text if TES === 100
        <>
          <div
            style={{ left: `${width - 20}px` }}
            className="absolute -top-8 text-brand-green text-annotation font-semibold uppercase"
          >
            target
          </div>
          <div
            style={{ left: `${width - tesTargetOffset}px` }}
            className="absolute -top-5  text-brand-green font-semibold"
          >
            {value}
          </div>
        </>
      )}
      <input
        type="range"
        name="range"
        min={min}
        max={max}
        disabled={maxTargetReached || disabled}
        className="w-full relative"
        onChange={(e) => {
          props.form.setFieldTouched(props.field.name)
          props.form.setFieldValue(props.field.name, parseInt(e.target.value))
          if (setSliderLastTouched) setSliderLastTouched(true)
        }}
        value={value}
      ></input>
      <div
        style={{ width: `${width}px` }}
        className={
          disabled
            ? "bg-brand-green absolute pointer-events-none left-0 top-[6px] h-[6px] rounded-l-xl after:bg-brand-green after:w-[2px] after:h-3 after:absolute after:right-0 after:bottom-0"
            : "bg-brand-green absolute pointer-events-none left-0 top-[6px] h-[6px] rounded-l-xl"
        }
      />
      {improvedTarget && improvedTarget != min ? (
        <>
          <div
            style={{ width: `${improvementWidth}px` }}
            className="bg-brand-green-dark pointer-events-none absolute left-0 w-6 top-[6px] h-[6px] rounded-l-xl after:bg-brand-green-dark after:w-[2px] after:h-3 after:absolute after:right-0"
          />
          <div
            style={{ left: `${improvementWidth - 24}px` }}
            className="absolute -bottom-5 text-brand-green-dark text-annotation font-semibold uppercase"
          >
            improved
          </div>
          <div
            style={{ left: `${improvementWidth - tesImprovedOffset}px` }}
            className="absolute -bottom-9  text-brand-green-dark font-semibold"
          >
            {improvedTarget}
          </div>
        </>
      ) : null}
    </div>
  )
}

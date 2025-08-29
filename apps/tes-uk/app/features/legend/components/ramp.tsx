import { ContinuousKey, DiscreteKey } from "ui"

import type { ContinuousKeyProps, DiscreteKeyProps } from "ui"
import type { FacetStyle, FacetData } from "tes-types"
import type { Facet } from "app/features/facets/facets.constants"
import { FormatterOptions } from "utils"

const getLengendRange = (data: FacetData): [number, number] => [
  data.style!.stops[0]!,
  data.style!.stops[data.style!.stops.length - 1]!,
]

const getContinuousGradient = (style: FacetStyle, data: FacetData) => {
  const [legendStart, legendEnd] = getLengendRange(data)
  const gradientStops = data
    .style!.stops.map((d, i) => {
      return `${style.fill[i]} ${((d - legendStart) / (legendEnd - legendStart)) * 100}%`
    })
    .join(",")
  return `linear-gradient(to right, ${gradientStops})`
}

const getStartLabel = (
  legendStart: number,
  formatter: (arg: number, options?: FormatterOptions) => string,
  activeFacet: Facet
) => {
  const startLabel = formatter ? formatter(legendStart) : "" + legendStart
  if (activeFacet.attr === "tree_equity_score") {
    return "<" + startLabel
  }
  if (activeFacet.attr === "temperature_difference") {
    return "<" + startLabel
  }
  return `${startLabel}`
}

const getEndLabel = (
  legendEnd: number,
  formatter: (arg: number, options?: FormatterOptions) => string,
  activeFacet: Facet
) => {
  const endLabel = formatter ? formatter(legendEnd) : "" + legendEnd
  if (activeFacet.attr === "tree_canopy") {
    return ">" + endLabel
  }
  if (activeFacet.attr === "tree_canopy_gap") {
    return ">" + endLabel
  }
  if (activeFacet.attr === "dependent_proportion") {
    return ">" + endLabel
  }
  if (activeFacet.attr === "temperature_difference") {
    return ">+" + endLabel
  }
  return `${endLabel}`
}

const RangeRamp = ({ activeFacet }: { activeFacet: Facet }) => {
  const { data } = activeFacet
  const { style, formatter } = data
  const [legendStart, legendEnd] = data.rampLabels!
  const continuousKeyProps: ContinuousKeyProps | undefined = style && {
    title: activeFacet.name,
    startLabel: getStartLabel(legendStart!, formatter!, activeFacet),
    endLabel: getEndLabel(legendEnd!, formatter!, activeFacet),
    gradient: getContinuousGradient(style, data),
  }
  return continuousKeyProps ? <ContinuousKey {...continuousKeyProps} /> : null
}

const EnumRamp = ({ activeFacet }: { activeFacet: Facet }) => {
  const { data } = activeFacet
  const { style, formatter, reversedRamp } = data
  const discreteKeyProps: DiscreteKeyProps | undefined = style && {
    title: activeFacet.name,
    type: activeFacet.data.type as DiscreteKeyProps["type"],
    labels: reversedRamp
      ? [...style.stops].reverse().map((d) => d + "")
      : style.stops.map((d) => d + ""),
    colors: reversedRamp ? [...style.fill].reverse() : style.fill,
    opacities: reversedRamp
      ? [...style.opacity!].reverse().map((opacity) => opacity * 0.75)
      : style.opacity?.map((opacity) => opacity * 0.75),
    initialLabel:
      formatter && data?.rampLabels![0]
        ? formatter(data.rampLabels[0]!, { lower: !!reversedRamp })
        : undefined,
    finalLabel:
      formatter && data?.rampLabels![0]
        ? formatter(data.rampLabels[1]!, { lower: !!!reversedRamp })
        : undefined,
  }
  return discreteKeyProps ? <DiscreteKey {...discreteKeyProps} /> : null
}

export const Ramp = ({ activeFacet }: { activeFacet: Facet }) =>
  activeFacet?.data?.style ? (
    activeFacet.data.type === "range" ? (
      <RangeRamp activeFacet={activeFacet} />
    ) : (
      <EnumRamp activeFacet={activeFacet} />
    )
  ) : null

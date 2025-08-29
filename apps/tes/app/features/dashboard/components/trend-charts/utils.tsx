import { Blockgroup } from "db"
import {
  HEAT_DISPARITY,
  TREES_PER_PERSON,
  TREE_CANOPY_COVER,
  TrendChartTemplate,
} from "../../dashboard.constants"
import { BarChartData } from "./bar-chart"
import { formatNumber, squareKilometersToAcres } from "utils"
import { approxTreeCount } from "app/utils/scenario_utils"
import { acresToSquareMiles } from "app/utils/conversion_utils"
import { clippedBlockgroupPopulation } from "../../utils"
import { Trans, useTranslation } from "react-i18next"

const formatValue = (value: number, type: string) => {
  return `${
    type === TREE_CANOPY_COVER
      ? value > 0
        ? "location-insights:charts.tooltip_more_percentages"
        : "location-insights:charts.tooltip_less_percentages"
      : value > 0
      ? "location-insights:charts.tooltip_more_trees_per_person"
      : "location-insights:charts.tooltip_less_trees_per_person"
  }`
}

const TemperatureTooltip = (
  { value,
    label,
    formattedValue,
    unitSign,
    unit,
    shortTitle,
    type
  }: {
    value: number,
    label: string,
    formattedValue: string,
    unitSign: string,
    unit: string,
    shortTitle: string,
    type: typeof TREE_CANOPY_COVER | typeof TREES_PER_PERSON
  }) => {
    const {t} = useTranslation(["location-insights", "facets"])
    const translatedLabel = t(label)
    const translatedValueExplanation = t(formatValue(value, type))
    const formattedDiff = formatNumber(Math.abs(value), 1, "en-us")
    return (
    <Trans i18nKey="location-insights:charts.temperature_tooltip"
      values={{label: translatedLabel, formattedValue, value, unitSign, unit, shortTitle, translatedValueExplanation, formattedDiff }}
      components={{ bold: <span className="font-semibold" /> }}
    />
  )
}

const DefaultTooltip = (
  { value,
    label,
    formattedValue,
    unitSign,
    unit,
    shortTitle,
    template,
    type
  }: {
    value: number,
    label: string,
    formattedValue: string,
    unitSign: string,
    unit: string,
    shortTitle: string,
    template: TrendChartTemplate,
    type: typeof TREE_CANOPY_COVER | typeof TREES_PER_PERSON
  }) => {
    const {t} = useTranslation(["location-insights", "facets"])
    const tooltipLabel = t(template.label)
    const translatedLabel = t(label)
    const translatedValueExplanation = t(formatValue(value, type))
    const formattedDiff = formatNumber(Math.abs(value), 1, "en-us")
    return (
      <div>
        <Trans i18nKey="location-insights:charts.default_tooltip"
          values={{label: translatedLabel, formattedValue, value, unitSign, unit, tooltipLabel, translatedValueExplanation, formattedDiff, shortTitle}}
          components={{
            bold: <span className="font-semibold" />,
          }}
         />
      </div>
    )
}

const getTooltip = ({
  rawValue,
  value,
  type,
  label,
  binSize,
  shortTitle,
  template,
  treeCanopyAcres,
}: {
  rawValue: number
  value: number
  type: typeof TREE_CANOPY_COVER | typeof TREES_PER_PERSON
  label: string
  binSize: number
  shortTitle: string
  template: TrendChartTemplate
  treeCanopyAcres: number
}) => {
  const unitSign = type === TREE_CANOPY_COVER ? "%" : ""
  const isTemperature = template?.attr === HEAT_DISPARITY
  const unit = type === TREE_CANOPY_COVER ? "tree canopy" : "trees per person"
  const sqMilesTreeCanopy = formatNumber(acresToSquareMiles(treeCanopyAcres), 1, "en-us")
  const treesCount = formatNumber(approxTreeCount(treeCanopyAcres), 0, "en-us")
  const formattedValue = formatNumber(Math.abs(rawValue), 1, "en-us")

  return (
    <div> 
      <p className="font-light">
        {isTemperature ?
          <TemperatureTooltip value={value} label={label} formattedValue={formattedValue} unitSign={unitSign} unit={unit} shortTitle={shortTitle} type={type} /> :
          <DefaultTooltip value={value} label={label} formattedValue={formattedValue} unitSign={unitSign} unit={unit} template={template} type={type} shortTitle={shortTitle} />}
      </p>
      <p className="mt-2 text-xs">
        <Trans i18nKey="location-insights:charts.tooltip_blockgroups"
          values={{
            binSize,
            sqMilesTreeCanopy,
            treesCount
            }}
        />
      </p>
    </div>
  )
}

export const getAxisLabelTooltip = ({min, max, label}: {min: number, max: number, label: string}) => {
    const values = `${formatNumber(min * 100, 1, "en-us")}-${formatNumber(max * 100,1,"en-us")}`
  return `${values}% ${label}`
}


export const getBarChartData = (
  shortTitle: string,
  blockgroups: Blockgroup[],
  template: TrendChartTemplate,
  type: typeof TREE_CANOPY_COVER | typeof TREES_PER_PERSON,
  average: number
) => {
  const { groupFunc, thresholds } = template.bars
  const groups: Blockgroup[][] = groupFunc(
    thresholds,
    blockgroups,
    (blockgroup: Blockgroup) => blockgroup[template.attr] as number
  )
  const data: BarChartData[] = groups.map((group, i) => {
    if (group.length > 0) {
      const value =
        type === TREE_CANOPY_COVER ? getTreeCanopyCover(group) : getTreesPerPerson(group)
      const attrs = group.map((bg) => bg[template.attr] as number)
      const min:number = Math.min(...attrs)
      const max:number = Math.max(...attrs)
      const diff = value - average
      const displayLabelTooltip = !template.label.includes("temperature")
      const treeCanopyAcres = group
        .map((bg) => bg.tree_canopy * squareKilometersToAcres(bg.area_sqkm!))
        .reduce((acc, curr) => acc + curr, 0)

      return {
        value,
        fill: template.bars.fill,
        tooltip: getTooltip({
          rawValue: value,
          value: diff,
          type,
          label: template.bars.labels[i],
          binSize: group.length,
          shortTitle,
          template,
          treeCanopyAcres,
        }),
        label: {
          min,
          max,
          value: template.bars.labels[i],
          facet: template.label,
          displayLabelTooltip,
        },
        binSize: group.length,
      }
    }

    return {
      value: 0,
      fill: template.bars.fill,
      label: { value: template.bars.labels[i], facet: template.label, displayLabelTooltip: false , min: 0, max: 0},
      binSize: 0,
    }
  })
  return data
}

export const getTreeCanopyCover = (blockgroups: Blockgroup[]) => {
  const treeCanopySqKm = blockgroups
    .map((bg) => bg.tree_canopy * bg.area_sqkm!)
    .reduce((acc, curr) => acc + curr, 0)
  const landAreaSqKm = blockgroups.map((bg) => bg.area_sqkm!).reduce((acc, curr) => acc + curr, 0)
  return (treeCanopySqKm / landAreaSqKm) * 100
}

export const getTreesPerPerson = (blockgroups: Blockgroup[]) => {
  const treeCanopyAcres = blockgroups
    .map((bg) => bg.tree_canopy * squareKilometersToAcres(bg.area_sqkm!))
    .reduce((acc, curr) => acc + curr, 0)
  const totalPopulation = clippedBlockgroupPopulation(blockgroups)
  return approxTreeCount(treeCanopyAcres) / totalPopulation
}

export const getTrendChartData = (
  place: string,
  shortTitle: string,
  blockgroups: Blockgroup[],
  template: TrendChartTemplate,
  type: typeof TREE_CANOPY_COVER | typeof TREES_PER_PERSON
) => {
  const yAvg =
    type === TREE_CANOPY_COVER ? getTreeCanopyCover(blockgroups) : getTreesPerPerson(blockgroups)
  const barChartData = getBarChartData(shortTitle, blockgroups, template, type, yAvg)
  const yMax = Math.max(...barChartData.map((d) => d.value))
  return {
    xLabel: template.label,
    yLabel: type === TREE_CANOPY_COVER ? "location-insights:charts.tree_canopy_cover" : "location-insights:charts.trees_per_person",
    data: barChartData,
    averageLabel: type === TREE_CANOPY_COVER ? "location-insights:charts.tree_canopy_cover" : "location-insights:charts.trees_per_person",
    averageValue: yAvg,
    formatAverageValue: (value: number) =>
      `${place}: ${value.toFixed(1)}${type === TREE_CANOPY_COVER ? "%" : ""}`,
    yDomain: [0, yMax] as [number, number],
    gridLines: true,
    isPrint: false,
    height: 400,
    chartClassName: "h-[400px] border-0",
    className: "",
  }
}

export const FormatedDiff = ({diff, type}: {diff: number, type: string}) => {
  const {t} = useTranslation(["location-insights"])
  const isTreeCanopyCover = type === TREE_CANOPY_COVER
  if (isTreeCanopyCover) {
    const roundedDiff = Math.round(diff * 10) / 10
    const formattedValue = formatNumber(roundedDiff, 1, "en-us")
    if (roundedDiff === 1) {
      return <span>{t("location-insights:charts.similar_tree_canopy")}</span>
    } else {
      return <span>{t("location-insights:charts.as_much_tree_canopy", {formattedValue})}</span>
    }
  }
  const absDiff = Math.abs(diff)
  const diffAbove0 = absDiff > 0
  const adv = diffAbove0 ? "additional" : "fewer"
  const formattedValue = formatNumber(absDiff, 1, "en-us")
  return <span>{t("location-insights:charts.fewer_additional_trees_per_person", {formattedValue, adv})}</span>
}
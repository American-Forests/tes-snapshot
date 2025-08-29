import { useState, useEffect } from "react"
import { max } from "d3"
import { twMerge } from "tailwind-merge"
import { bin } from "d3-array"
import type { NeighborhoodLike } from "@prisma/client"

import { BarChart, HelpTooltip } from "ui"
import type { BarChartData, BarChartProps } from "ui"
import { avg, formatNumber, pick } from "utils"

import {
  TES_CHART,
  PRINT_BLOCK,
  TREE_CANOPY_CHARTS,
  TREE_CANOPY_CHART_OPTIONS,
  SUMMARY_TOOLTIPS,
  REPORT_TYPES,
  COUNTRY_REPORT_TYPE,
} from "app/features/report/report.constants"

import type { TreeCanopyChartTemplate, TESChartRange } from "app/features/report/report.constants"
import {
  totalPopulation,
  avgDepProp,
  meanRange,
  treeCanopyPerCapita,
  avgByPop,
  treeCanopyPerCapitaByGroup,
} from "app/features/report/utils"

const AreaSummaryItem = ({
  label,
  value,
  tooltip,
}: {
  label: string
  value: string
  tooltip?: string
}) => {
  const cx = "flex flex-row justify-between text-gray-600"
  const labelCX = "mb-2"
  const tooltipCX = "ml-2"

  return (
    <div className={cx}>
      <p className={labelCX}>
        {label}
        {tooltip && (
          <HelpTooltip className={tooltipCX}>
            <span>{tooltip}</span>
          </HelpTooltip>
        )}
      </p>
      <p>{value}</p>
    </div>
  )
}

const getTESBins = bin().thresholds(TES_CHART.thresholds)

// enhances TES chart data with label element
const withTESLabel = (list: TESChartRange[]) =>
  list.map((d, i) => {
    const lastItem = TES_CHART.thresholds[i + 1]! - 1
    const firstItem = TES_CHART.thresholds[i]
    const range = [TES_CHART.thresholds[i], lastItem]
    const valueScore = firstItem === lastItem ? `${firstItem}` : range.join("-")
    const label = {
      ...d.label,
      value: valueScore,
      score: valueScore,
      element: (
        <ChartLabel
          priority={`${i === 0 ? "Priority: " : ""}${d.label.priority}`}
          score={`${i === 0 ? "Score: " : ""}${valueScore}`}
        />
      ),
    }

    return { ...d, label }
  })

// enhances TC chart data by formatting the tooltips
const withTCTooltip = ({
  groups,
  treeCanopyChartTemplate,
  neighborhoodLikeType,
  selectedChartOption,
  TCPCValues,
  averageTreeCanopy,
  locationName,
}: {
  groups: NeighborhoodLike[][]
  treeCanopyChartTemplate: TreeCanopyChartTemplate
  neighborhoodLikeType: string
  selectedChartOption: keyof NeighborhoodLike
  // eslint-disable-next-line
  TCPCValues: any[]
  averageTreeCanopy: number
  locationName: string
}) => {
  // calculate no2 and pm25 averages for each group if the selected chart option is air pollution
  let NO2Aves: number[] | undefined
  let PM25Aves: number[] | undefined
  if (selectedChartOption === "air_pollution") {
    NO2Aves = groups.map((group) => avg(group.map(pick<NeighborhoodLike, number>("no2_average"))))
    PM25Aves = groups.map((group) => avg(group.map(pick<NeighborhoodLike, number>("pm25_average"))))
  }

  const edgesLabelCX = "uppercase text-brand-green-dark whitespace-normal text-center text-xs"

  return TCPCValues.map((d, i) => {
    const isFirst = i === 0
    const isLast = i === TCPCValues.length - 1

    // the text label on the bar
    const barLabel = treeCanopyChartTemplate.bars.labels[i]
    const edgeLabels = treeCanopyChartTemplate.bars.edgeLabels

    // tc_bar = average tree canopy for the group
    const tcBar = d.value as number

    // difference between the average tree canopy for the report location and the group's tree canopy (bar)
    const tcDiff = ((tcBar - averageTreeCanopy) / averageTreeCanopy) * 100
    const moreLess = tcDiff < 0 ? "less" : "more"

    // the average NO2 raw value for each group
    const NO2Ave = NO2Aves && NO2Aves[i]

    // the average PM2.5 raw value for each group
    const PM25Ave = PM25Aves && PM25Aves[i]

    const tooltip = (
      <p>
        {neighborhoodLikeType}s{" "}
        {selectedChartOption === "temperature_difference" ? (
          <span>with {barLabel} heat disparity</span>
        ) : (
          <span> in the {barLabel} percentile</span>
        )}{" "}
        have {formatNumber(Math.abs(tcDiff), 1, "en-GB")}% {moreLess} tree canopy per person
        compared to the canopy average for {locationName}.
        {selectedChartOption === "air_pollution" && NO2Ave && PM25Ave && (
          <span>
            These {neighborhoodLikeType}s have a mean {formatNumber(NO2Ave, 1, "en-GB")} µg/m3 NO
            <sub>2</sub> and a mean {formatNumber(PM25Ave, 1, "en-GB")} µg/m3 PM2.5.
          </span>
        )}
      </p>
    )

    const getLabel = () => {
      const formattedBarLabel =
        isFirst && selectedChartOption !== "temperature_difference"
          ? `Percentile: ${barLabel}`
          : barLabel

      if (edgeLabels) {
        if (isFirst) {
          return (
            <div>
              {formattedBarLabel}
              {edgeLabels[0] && <p className={edgesLabelCX}>{edgeLabels[0]}</p>}
            </div>
          )
        }

        if (isLast) {
          return (
            <div>
              {formattedBarLabel}
              {edgeLabels[1] && <p className={edgesLabelCX}>{edgeLabels[1]}</p>}
            </div>
          )
        }
      }

      return formattedBarLabel
    }

    return {
      ...d,
      fill: treeCanopyChartTemplate.bars.fill,
      tooltip,
      label: {
        value: getLabel(),
      },
    }
  })
}

const ChartLabel = ({ priority, score }: { priority: string; score: string }) => {
  const cx = "flex flex-col items-center"
  const priorityCX = "uppercase text-brand-green-dark sm:text-caption text-[10px] font-semibold"
  const scoreCX = "sm:text-caption text-[10px] -mt-1"

  return (
    <div className={cx}>
      <p className={priorityCX}>{priority}</p>
      <p className={scoreCX}>{score}</p>
    </div>
  )
}

const ChartSelector = ({
  handleChartOptionChange,
  selectedChartOption,
  neighborhoodLikeType,
  ...props
}: {
  handleChartOptionChange: (value: keyof NeighborhoodLike) => void
  selectedChartOption: keyof NeighborhoodLike
  neighborhoodLikeType: string
}) => {
  const figuresCX = "text-xl text-gray-700 font-semibold h-[50px]"
  const selectCX = "focus:ring-0 focus:border-gray-400 border-gray-400 py-1 rounded-sm"
  const labelCX = "hidden"
  const selectPrintCX = "print:hidden"
  const labelPrintCX = "print:inline"

  return (
    <div className={figuresCX} {...props}>
      Tree canopy vs.{" "}
      <select
        onChange={(e) => handleChartOptionChange(e.target.value as keyof NeighborhoodLike)}
        className={twMerge(selectCX, selectPrintCX)}
      >
        {TREE_CANOPY_CHART_OPTIONS.map((option: keyof NeighborhoodLike, i) => (
          <option key={i} value={option} selected={option === selectedChartOption}>
            {TREE_CANOPY_CHARTS.get(option)!.label}
          </option>
        ))}
      </select>
      <span className={twMerge(labelCX, labelPrintCX)}>
        {TREE_CANOPY_CHARTS.get(selectedChartOption)!.label}
      </span>
      <HelpTooltip className="ml-2">
        <span>{TREE_CANOPY_CHARTS.get(selectedChartOption)!.help(neighborhoodLikeType)}</span>
      </HelpTooltip>
    </div>
  )
}

const Chart = ({  isPrint, chartProps, TitleComponent }: {  isPrint: boolean; chartProps: BarChartProps; TitleComponent: ({className}: {className: string}) => React.ReactNode }) => {
const styleProps = {
    height: isPrint ? 250 : 400,
    className: isPrint ? "hidden print:block" : "block print:hidden",
    chartClassName: isPrint ? "print:h-[250px]" : "h-[400px]"
  }
 
  const cx = "lg:mb-0 mb-8 lg:mr-8 flex-1"
  const printCX = "print:mb-8 print:mr-0 print:w-full"

  const titleCX = "text-xl text-gray-700 font-semibold h-[50px]"
  const barChartCX = "h-[100%] bg-white border border-gray-200 rounded-md"
  const { className, chartClassName, height } = styleProps
  return (
    <div className={twMerge(cx, printCX, className)}>
      <TitleComponent className={titleCX} />
      <div className={twMerge(barChartCX, chartClassName)}>
        {Boolean(chartProps?.data?.length) && Boolean(BarChart) && <BarChart {...chartProps } height={height}/>}
      </div>
    </div>
  )
}

const Charts = ({
  neighborhoods,
  locationName,
  reportType,
}: {
  neighborhoods: NeighborhoodLike[]
  locationName: string
  reportType: string
}) => {
  if (neighborhoods.length === 0) return null
  const [tesDistributionChartData, setTesDistributionChartData] = useState<BarChartData[]>([])
  const [selectedChartOption, setSelectedChartOption] = useState<keyof NeighborhoodLike>(
    TREE_CANOPY_CHART_OPTIONS[0]!
  )
  const [selectedChartData, setSelectedChartData] = useState<BarChartData[]>([])

  const [averageTreeCanopyPerCapita, setAverageTreeCanopyPerCapita] = useState<number | null>(null)
  const neighborhoodLikeType = neighborhoods[0]!.type

  useEffect(() => {
    const treeCanopyChartTemplate = TREE_CANOPY_CHARTS.get(selectedChartOption)!

    const { thresholds, groupFunc } = treeCanopyChartTemplate.bars
    const groups = groupFunc<NeighborhoodLike>(
      thresholds,
      neighborhoods,
      pick<NeighborhoodLike, number>(selectedChartOption)
    )

    // calculate tree canopy per capita (sq-m of tree canpy per ) for the quintiles
    const TCPC = treeCanopyPerCapitaByGroup(groups)
    const TCPCValues = TCPC.map((d) => ({
      value: d,
    }))

    const avgTCPC = avg(neighborhoods.map(treeCanopyPerCapita))
    setAverageTreeCanopyPerCapita(avgTCPC)
    setSelectedChartData(
      withTCTooltip({
        groups,
        treeCanopyChartTemplate,
        neighborhoodLikeType,
        selectedChartOption,
        TCPCValues,
        averageTreeCanopy: avgTCPC,
        locationName,
      })
    )
  }, [neighborhoods, selectedChartOption])

  /** get tree equity score distribution */
  useEffect(() => {
    if (!neighborhoods) return
    const treeEquityScores = neighborhoods.map((bg) => bg.tree_equity_score)

    // appending one value for each bin to make sure each bin is created! otherwise the thresholds function
    // won't create the bins we need, make sure to subract one from each bin count before displaying
    const bins = getTESBins([...treeEquityScores, ...TES_CHART.thresholds.slice(0, -1)])
    const data = withTESLabel(TES_CHART.ranges).map((d, i) => ({
      ...d,
      // subtracting one to remove the dummy data we added to make sure each bin is created
      value: bins[i]!.length - 1,
      // subtracting one to remove the dummy data we added to make sure each bin is created
      tooltip: `${bins[i]!.length - 1} ${neighborhoodLikeType}s have a score of ${d.label.value}`,
    }))

    setTesDistributionChartData(data)
  }, [neighborhoods])

  const SingleTitleComponent = ({className}: {className: string}) => <div className={className}>Distribution of Tree Equity Scores</div>
  const SelectorTitleComponent = () => (
    <ChartSelector
      neighborhoodLikeType={neighborhoodLikeType}
      selectedChartOption={selectedChartOption}
      handleChartOptionChange={setSelectedChartOption}
    />
  )
  const cx = "flex lg:flex-row flex-col justify-between mt-5 w-full"
  const printCX = "print:flex-col print:items-center print:m-0 print:pt-10 print:w-full"
  const firstChartProps = {
    data: tesDistributionChartData,
    xLabel: "Tree Equity Score",
    yDomain: [0, max(tesDistributionChartData, (d) => d.value)!] as [number, number],
  }

  const secondChartProps = {
    className: "lg:mr-0",
    data: selectedChartData,
    xLabel: TREE_CANOPY_CHARTS.get(selectedChartOption)!.label,
    yLabel: "Tree canopy per capita (sq-m/person)",
    averageLabel: "Tree canopy",
    averageValue: averageTreeCanopyPerCapita!,
    formatAverageValue: (value: number) => `${formatNumber(value, 0, "en-GB")} sq-m/person`,
    formatValue: (value: number) => `${value}`,
    yDomain: [0, max(selectedChartData!.map((d) => d.value))!] as [number, number],
    gridLines: true,
  }

  

  return (
    <div
      className={twMerge(cx, reportType !== REPORT_TYPES[COUNTRY_REPORT_TYPE] && "mt-20", printCX)}
    >
      {/* print */}
      <Chart chartProps={firstChartProps} TitleComponent={SingleTitleComponent} isPrint={true}/>
      <Chart chartProps={secondChartProps}  isPrint={true} TitleComponent={SelectorTitleComponent}/>
      {/* screen */}
      <Chart chartProps={firstChartProps} isPrint={false} TitleComponent={SingleTitleComponent} />
      <Chart chartProps={secondChartProps} isPrint={false} TitleComponent={SelectorTitleComponent}/>
    </div>
  )
}

const AreaSummary = ({
  neighborhoods = [],
  locationName,
}: {
  neighborhoods: NeighborhoodLike[]
  locationName: string
}) => {
  const cx = "flex flex-col sm:flex-row justify-around"
  const groupCX = "flex flex-col justify-between flex-1"
  const printCX = "print:flex-col print:break-after-page"

  return (
    <div className={twMerge(cx, printCX)}>
      <div className={twMerge(groupCX, "sm:mr-12", "print:mr-0")}>
        <AreaSummaryItem
          label="Population"
          value={totalPopulation(neighborhoods).toLocaleString("en")}
        />
        <AreaSummaryItem
          label="Income ranking (IMD)"
          value={`${meanRange<NeighborhoodLike>("income_rank", neighborhoods, (d) =>
            Math.ceil(d).toLocaleString("en-GB")
          )}`}
          tooltip={SUMMARY_TOOLTIPS.income_rank(locationName)}
        />
        <AreaSummaryItem
          label="Employment ranking (IMD)"
          value={`${meanRange<NeighborhoodLike>("employment_rank", neighborhoods, (d) =>
            Math.ceil(d).toLocaleString("en-GB")
          )}`}
          tooltip={SUMMARY_TOOLTIPS.employment_rank(locationName)}
        />
        <AreaSummaryItem
          label="Health ranking (IMD)"
          value={`${meanRange<NeighborhoodLike>("health_rank", neighborhoods, (d) =>
            Math.ceil(d).toLocaleString("en-GB")
          )}`}
          tooltip={SUMMARY_TOOLTIPS.health_rank(locationName)}
        />
      </div>
      <div className={twMerge(groupCX, "print:border-t print:pt-3 print:mt-3")}>
        <AreaSummaryItem
          label="People from minoritised ethnic groups"
          value={`${avgByPop("minority_ethnic_group_proportion")(neighborhoods).toFixed(1)}%`}
        />
        <AreaSummaryItem
          label="Children and older people"
          value={`${avgDepProp(neighborhoods).toFixed(1)}%`}
        />
        <AreaSummaryItem
          label="Average NO2 air pollution"
          value={`${avg(neighborhoods.map(pick<NeighborhoodLike, number>("no2_average"))).toFixed(
            1
          )} µg/m3`}
        />
        <AreaSummaryItem
          label="Average PM2.5 air pollution"
          value={`${avg(neighborhoods.map(pick<NeighborhoodLike, number>("pm25_average"))).toFixed(
            1
          )} µg/m3`}
        />
      </div>
    </div>
  )
}

export const Summary = ({
  locationName,
  neighborhoods,
  reportType,
}: {
  locationName: string
  neighborhoods: NeighborhoodLike[]
  reportType: string
}) => {
  const cx = "xl:w-4/5 w-full m-auto bg-gray-50 pt-6 px-2 sm:px-10 py-8"
  const printCX = twMerge(PRINT_BLOCK)
  const titleCX = "text-xl font-semibold text-gray-700 mb-2"
  const titlePrintCX = ""

  return (
    <section className={twMerge(cx, printCX)}>
      {reportType !== REPORT_TYPES[COUNTRY_REPORT_TYPE] && (
        <>
          <p className={twMerge(titleCX, titlePrintCX)}>Summary of {locationName} urban areas</p>
          <AreaSummary neighborhoods={neighborhoods} locationName={locationName} />
        </>
      )}
      <Charts neighborhoods={neighborhoods} locationName={locationName} reportType={reportType} />
    </section>
  )
}

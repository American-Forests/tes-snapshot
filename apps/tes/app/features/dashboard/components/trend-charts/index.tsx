import { Dispatch, SetStateAction, useEffect, useState } from "react"
import type { Blockgroup } from "db"
import { twMerge } from "tailwind-merge"
import { useTranslation } from "react-i18next"

import { pick } from "utils"
import { HelpTooltip } from "ui"

import {
  HEAT_DISPARITY,
  TREND_CHART_TEMPLATES,
  TREND_CHART_TEMPLATES_MAP,
  TrendChartData,
  TREND_CHART_X_OPTIONS,
  TREND_CHART_Y_OPTIONS,
  TREE_CANOPY_COVER,
  TREES_PER_PERSON,
} from "../../dashboard.constants"

import { getTrendChartData, FormatedDiff } from "./utils"
import { ChartOption, ChartSelector } from "./chart-helpers"
import { BarChart } from "./bar-chart"
import type { BarChartData, BarChartProps } from "./bar-chart"

const Chart = ({
  x,
  y,
  setX,
  setY,
  data,
  ...props
}: {
  className?: string
  chartClassName?: string
  x: ChartOption
  y: ChartOption
  setY: Dispatch<SetStateAction<ChartOption>>
  setX: Dispatch<SetStateAction<ChartOption>>
} & BarChartProps) => {
  const { t } = useTranslation(["location-insights"])
  const cx = "xl:mb-0 mb-8 h-full flex flex-col"
  const printCX = "print:mb-8 print:mr-0 print:w-full"

  const titleCX = "text-xl text-gray-700 font-semibold"
  const barChartCX = "h-full bg-white border border-gray-200 rounded-md mt-4"
  return Boolean(BarChart) ? (
    <div className={twMerge(cx, printCX, props.className)}>
      <div className={titleCX}>
        <ChartSelector
          selectedChartOption={y}
          setSelectedChartOption={setY}
          options={TREND_CHART_Y_OPTIONS}
          help={t("location-insights:charts.choose_canopy_hint")}
        />{" "}
        <span className="mx-4"> & </span>{" "}
        <ChartSelector
          selectedChartOption={x}
          setSelectedChartOption={setX}
          options={TREND_CHART_X_OPTIONS}
        />
      </div>
      <div className={twMerge(barChartCX, props.chartClassName)}>
        {Boolean(data) && <BarChart {...{ data, ...props }} />}
      </div>
    </div>
  ) : null
}

const QuintileCompareText = ({
  x,
  y,
  data,
}: {
  x: ChartOption
  y: ChartOption
  data: BarChartData[]
}) => {
  const { t } = useTranslation(["location-insights"])
  const quintile = data[0]
  const compareToQuintile = data[x.value === HEAT_DISPARITY ? data.length - 2 : data.length - 1]
  const cx = "text-xl mb-14"
  const emphasisCx = "text-brand-blue-dark font-medium"
  const zeroValues = data.map(pick("value")).every((d) => d === 0)

  if ((quintile.binSize <= 1 || compareToQuintile.binSize <= 1) && !zeroValues)
    return (
      <p className={twMerge(cx, emphasisCx, "text-sm mt-8 mb-32 py-2")}>
        {t("location-insights:charts.no_data_available")}{" "}
        <HelpTooltip className="cursor-pointer">
          <p className="text-left">
            {t("location-insights:charts.no_data_explanation")}
          </p>
        </HelpTooltip>
      </p>
    )

  if (data.map((d) => d.binSize).every((binSize) => binSize == 0))
    return <p className={twMerge(cx, emphasisCx, "text-sm")}>{t("location-insights:charts.data_unavailable")}</p>

  const diff =
    y.value === TREE_CANOPY_COVER
      ? quintile.value / compareToQuintile.value
      : quintile.value - compareToQuintile.value

  const prefix =
    x.value === HEAT_DISPARITY
      ? t("location-insights:charts.cooler_neighborhoods")
      : t("location-insights:charts.less_neighborhoods", { indicator: t(`facets:${x?.value}.name`)?.toLowerCase() })
  const suffix =
    x.value === HEAT_DISPARITY
      ? t("location-insights:charts.compared_to_hotter")
      : t("location-insights:charts.compared_to_more")
  const tooltip =
    y.value === TREE_CANOPY_COVER
      ? x.value === HEAT_DISPARITY
        ? t("location-insights:charts.tooltip_heat")
        : t("location-insights:charts.tooltip_percentile")
      : t("location-insights:charts.tooltip_difference")

  return (
    <p className={cx}>
      {prefix}{" "}
      <span className={emphasisCx}>
        <FormatedDiff diff={diff} type={y.value} />
        <HelpTooltip className="cursor-pointer">
          <p className="text-left">{tooltip}</p>
        </HelpTooltip>{" "}
      </span>{" "}
      {suffix}
    </p>
  )
}

export const Charts = ({
  title,
  shortTitle,
  blockgroups,
}: {
  title: string
  shortTitle: string
  blockgroups: Blockgroup[]
}) => {
  const { t } = useTranslation(["location-insights", "facets"])
  const flexCenterCX = "justify-center items-center"
  const [y, setY] = useState<ChartOption>(TREND_CHART_Y_OPTIONS[0])
  const [x, setX] = useState<ChartOption>(TREND_CHART_X_OPTIONS[0])

  /**
   * filter out blockgroups with low populations to avoid data issues, only applied
   * when doing a trees per person chart
   */
  let filteredBlockgroups: Blockgroup[]
  if (y.value === TREES_PER_PERSON) {
    const MIN_POPULATION = 150
    filteredBlockgroups = blockgroups.filter((bg) => bg.clipped_bg_population! > MIN_POPULATION)
  } else {
    filteredBlockgroups = blockgroups
  }

  const [trendChartData, setTrendChartData] = useState<TrendChartData>(
    getTrendChartData(
      title,
      shortTitle,
      filteredBlockgroups,
      TREND_CHART_TEMPLATES[0],
      y.value as typeof TREE_CANOPY_COVER | typeof TREES_PER_PERSON,
    ),
  )

  useEffect(() => {
    const chartTemplate = TREND_CHART_TEMPLATES_MAP.get(x.value as keyof Blockgroup)!
    const data = getTrendChartData(
      title,
      shortTitle,
      filteredBlockgroups,
      chartTemplate,
      y.value as typeof TREE_CANOPY_COVER | typeof TREES_PER_PERSON,
    )
    setTrendChartData(data)
  }, [x, y])
  
  return (
    <section className={twMerge(flexCenterCX, "flex-col m-auto")}>
      <header
        className={twMerge(
          "text-center w-full text-brand-green-darker pb-16 xl:pb-12",
          "shadow-[0_-10px_12px_-10px_rgba(0,0,0,0.125)] xl:w-4/5 w-full m-auto bg-white ",
        )}
      >
        <h1 className="text-caption font-extrabold pt-16 uppercase">{t("location-insights:charts.title")}</h1>
        <h2 className="text-2xl font-medium text-gray-700 tracking-wide">{title}</h2>
        <p className="text-base font-base text-gray-700 m-auto text-center pt-2">
          {t("location-insights:charts.subtitle")}
        </p>
      </header>
      <section
        className={twMerge(
          "xl:w-4/5 w-full bg-white mx-auto grid xl:grid-cols-5 grid-cols-1 gap-10",
        )}
      >
        <div
          className={twMerge(
            "xl:w-full md:w-4/5 w-11/12 m-auto xl:col-span-2 col-span-1 xl:pl-20 md:pl-10 pl-0",
            "xl:text-right",
          )}
        >
          <section className="text-gray-700">
            <header className={twMerge("font-bold")}>
              <h1
                className={twMerge(
                  "uppercase text-[0.9rem] tracking-wide text-brand-green-darker lg:-mt-10 mt-4",
                )}
              >
                {t("location-insights:charts.canopy_trends")}
              </h1>
              <h2 className={twMerge("text-3xl mb-8 text-brand-green-darker")}>
                {t("location-insights:charts.where_trees")}
              </h2>
            </header>
            <QuintileCompareText x={x} y={y} data={trendChartData.data} />
          </section>
          <section className="text-brand-green-darker text-sm">
            <h2 className="border-t border-gray-200 uppercase font-bold pt-2">{t("location-insights:charts.how_to_read")}</h2>
            <p>
              {t("location-insights:charts.explanation", { indicator: t(`facets:${x?.value}.name`)?.toLowerCase() })}{" "}
              <HelpTooltip className="cursor-pointer">
                <p className="text-left">
                  {t(TREND_CHART_TEMPLATES_MAP.get(x.value as keyof Blockgroup)!.help)}
                </p>
              </HelpTooltip>
              <HelpTooltip className="cursor-pointer">
                <p className="text-left">{t("location-insights:charts.choose_canopy_hint")}</p>
              </HelpTooltip>
            </p>
          </section>
        </div>
        <div
          className={twMerge(
            "xl:w-full md:w-4/5 w-11/12 m-auto xl:col-span-3 col-span-1 xl:pr-20 md:pr-10 pr-0 pt-12",
          )}
        >
          <div className="flex">
            <p className="text-annotation flex-inline xl:block hidden -mr-3">
              {t("location-insights:charts.choose_canopy")}&nbsp;
              <HelpTooltip className="cursor-pointer">
                <p className="text-left">{t("location-insights:charts.choose_canopy_hint")}</p>
              </HelpTooltip>
            </p>
            <p className="text-annotation flex-inline xl:block hidden ml-[7.8rem]">
              {t("location-insights:charts.choose_indicator")}{" "}
              <HelpTooltip className="cursor-pointer">
                <p className="text-left">
                  {t(TREND_CHART_TEMPLATES_MAP.get(x.value as keyof Blockgroup)!.help)}
                </p>
              </HelpTooltip>
            </p>
          </div>
          <Chart
            x={x}
            y={y}
            setX={setX}
            setY={setY}
            {...{
              ...trendChartData,
              labelClassName:
                "whitespace-normal w-24 text-center text-gray-700 font-medium underline decoration-dotted decoration-1",
            }}
          />
        </div>
      </section>
    </section>
  )
}

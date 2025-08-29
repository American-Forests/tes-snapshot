import { useQuery } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { XCircleIcon } from "@heroicons/react/24/solid"
import { Slider } from "@material-ui/core"
import { withStyles } from "@material-ui/core"
import { Suspense, useEffect, useRef, useState } from "react"
import type { ChangeEvent } from "react"
import { bin, quantile } from "d3-array"
import { max, range } from "d3"
import { BBox } from "@turf/helpers"
import { twMerge } from "tailwind-merge"

import { Blockgroup, CongressionalDistrict, County, Municipality, State } from "db"
import {
  getBenefit,
  getEcosystemBenefits,
  getFipsList,
  sumSingleTargetTreeCanopyAcresByFips,
} from "app/utils/report_utils"
import getITree from "app/itree/queries/getITree"
import {
  ECOSYSTEM_BENEFITS_LIST,
  MUNICIPAL_REPORT_TYPE,
  CONGRESSIONAL_DISTRICT_REPORT_TYPE,
  STATE_REPORT_TYPE,
  COUNTY_REPORT_TYPE,
  JOBS_PER_TREE,
} from "app/constants"
import { BarChartData, BenefitsComponent as UIBenefitsPanel, BarChart } from "ui"

import type { BenefitsData } from "ui"

import { SymbolIcon, Share2Icon } from "@radix-ui/react-icons"
import { dollarFormat, getFullStateNameFromAbbreviation } from "app/utils/formatting_utils"
import { approxTreeCount, getAcresNeeded } from "app/utils/scenario_utils"
import { localeWithDecimals } from "app/utils/formatting_utils"
import { formatNumber } from "app/utils/formatting_utils"

import { TesLogo } from "../../../components/tes_logo"
import NationalReportMap from "./national_report_map"
import Help from "../../../components/help"
import { HelpWidget } from "app/features/help-widget"
import { squareKilometersToAcres } from "utils"
import { TOOLTIP_CONTENT } from "app/features/dashboard/dashboard.constants"
import { useBenefitsPanelData } from "app/features/dashboard/hooks"

const CHART_OPTIONS: { label: string; attr: keyof Blockgroup }[] = [
  {
    label: "People of color",
    attr: "poc_percent",
  },
  {
    label: "People in poverty",
    attr: "poverty_percent",
  },
  {
    label: "Heat disparity",
    attr: "temperature",
  },
]

const CopyRouteURLButton = () => {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyClick = () => {
    const routeURL = window.location.href

    navigator.clipboard
      .writeText(routeURL)
      .then(() => {
        setCopySuccess(true)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Failed to copy route URL:", error)
      })
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(false)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [copySuccess])

  return (
    <div className="relative print:hidden">
      <button
        onClick={handleCopyClick}
        className="flex text-white bg-brand-green-dark rounded-full hover:shadow-lg px-4 py-1"
      >
        <Share2Icon className="mt-1 mr-2" />
        Share Report
      </button>
      {copySuccess && (
        <p className="absolute -top-1 left-3 border bg-white shadow rounded-lg text-xs p-2">
          Report URL Copied!
        </p>
      )}
    </div>
  )
}

const InsightsButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link legacyBehavior href={window.location.href.replace(`/reports/`, `/insights/`)}>
      <div className="relative" onClick={onClick}>
        <span className="absolute text-[7px] bg-yellow-500 rounded-full px-2 py-[2px] text-white font-bold tracking-wider -top-[8px] left-6 uppercase">
          ★ new feature!
        </span>
        <button className="text-brand-green-darker border-brand-green-darker border-[1px] rounded-full px-6 py-1">
          Back to Location Insights
        </button>
      </div>
    </Link>
  )
}

function UrbanizedAreaSummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-row justify-between text-gray-600">
      <p className="mb-2">{label}</p>
      <p>{value}</p>
    </div>
  )
}

function UrbanizedAreaSummary({ blockgroups }: { blockgroups: Blockgroup[] }) {
  const totalPopulation = blockgroups
    .map((bg) => bg.clipped_bg_population || bg.total_population)
    .reduce((a, b) => a + b, 0)

  const avgPoc =
    (blockgroups.map((bg) => bg.poc_percent * bg.total_population).reduce((a, b) => a + b, 0) /
      totalPopulation) *
    100
  const avgPov =
    (blockgroups.map((bg) => bg.poverty_percent * bg.total_population).reduce((a, b) => a + b, 0) /
      totalPopulation) *
    100
  const avgDependentRatio =
    (blockgroups.map((bg) => bg.dependent_ratio * bg.total_population).reduce((a, b) => a + b, 0) /
      totalPopulation) *
    100
  const avgLinguisticIsolation =
    (blockgroups
      .map((bg) => bg.linguistic_isolation * bg.total_population)
      .reduce((a, b) => a + b, 0) /
      totalPopulation) *
    100
  const avgUnemploymentRate =
    (blockgroups
      .map((bg) => bg.unemployment_rate * bg.total_population)
      .reduce((a, b) => a + b, 0) /
      totalPopulation) *
    100

  return (
    <div className="flex flex-col sm:flex-row justify-around">
      <div className="flex flex-col justify-between flex-1 sm:mr-12">
        <UrbanizedAreaSummaryItem label="Population" value={totalPopulation.toLocaleString("en")} />
        <UrbanizedAreaSummaryItem label="People of color" value={formatNumber(avgPoc) + "%"} />
        <UrbanizedAreaSummaryItem label="People in poverty" value={formatNumber(avgPov) + "%"} />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <UrbanizedAreaSummaryItem
          label="Children (0-17) and seniors (65+)"
          value={formatNumber(avgDependentRatio) + "%"}
        />
        <UrbanizedAreaSummaryItem
          label="Linguistic isolation"
          value={formatNumber(avgLinguisticIsolation) + "%"}
        />
        <UrbanizedAreaSummaryItem
          label="Unemployment rate"
          value={formatNumber(avgUnemploymentRate) + "%"}
        />
      </div>
    </div>
  )
}

function BenefitsSummaryItem({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="text-gray-700 font-bold mb-2 text-left">
        <span>{label}</span>
        {hint && (
          <Help className="text-gray-400 hover:text-black ml-1">
            <span className="text-sm font-medium leading-snug pb-4">{hint}</span>
          </Help>
        )}
      </div>
      <p className="text-brand-green-dark text-3xl font-bold">{value}</p>
    </div>
  )
}

const StyledSlider = withStyles({
  root: {
    color: "#6cc296",
    height: 8,
    padding: 2,
  },
  thumb: {
    height: 32,
    width: 12,
    borderRadius: 4,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
    marginTop: 0,
  },
  active: {},
  valueLabel: {
    left: "calc(-50% -6px)",
    fontWeight: "bold",
  },
  track: {
    height: 32,
    borderRadius: 4,
  },
  rail: {
    height: 32,
    borderRadius: 4,
  },
})(Slider)

function BenefitsSection({
  targetScore,
  blockgroups,
  fipsList,
  benefitTooltipContent,
}: {
  targetScore: number
  blockgroups: Blockgroup[]
  fipsList: string[]
  benefitTooltipContent: Map<number, string>
}) {
  const [iTreeData] = useQuery(getITree, { fips_list: fipsList })

  /**
   * calculate ecosystem benefits to reach the target specified by the user
   * */
  const [ecosystemBenefits, setEcosystemBenefits] = useState<Map<string, number> | undefined>(
    undefined
  )
  const [canopyAcresNeeded, setCanopyAcresNeeded] = useState<number>(0)
  useEffect(() => {
    if (!blockgroups || !iTreeData || !targetScore) return

    const fipsToTreeCanopyAcresMap = sumSingleTargetTreeCanopyAcresByFips(blockgroups, targetScore)

    const benefits = getEcosystemBenefits({
      fipsToTreeCanopyAcresMap,
      iTreeData,
      benefitsList: ECOSYSTEM_BENEFITS_LIST,
    })

    setEcosystemBenefits(benefits)
    // sum the acres needed to reach the target score
    const acresNeeded = blockgroups.map((bg) => getAcresNeeded(bg, targetScore))
    setCanopyAcresNeeded(acresNeeded.reduce((a, b) => a + b, 0))
  }, [blockgroups, iTreeData, targetScore])

  /**
   * when ecosystem benefit values have been calculated and tooltip content has loaded,
   * format the data for the ui benefits panel
   */
  const benefitsPanelData = useBenefitsPanelData(ecosystemBenefits)

  const percentCanopyAdded =
    (canopyAcresNeeded /
      blockgroups.map((bg) => squareKilometersToAcres(bg.area_sqkm!)).reduce((a, b) => a + b, 0)) *
    100

  const treesNeeded = approxTreeCount(canopyAcresNeeded)

  const data: BenefitsData | undefined = benefitsPanelData
    ? {
        carbon: {
          data: [[benefitsPanelData.carbon]],
          classNames: {
            columns: twMerge("col-span-1 md:col-span-2 2xl:col-span-1", "md:h-[590px]"),
            cards: "bg-brand-gray-pale",
          },
        },
        water: {
          data: [[benefitsPanelData.water.slice(0, 2), benefitsPanelData.water.slice(2, 3)]],
          classNames: {
            columns: twMerge("col-span-1 md:col-span-2 2xl:col-span-1", "md:h-[590px]"),
            cards: "bg-brand-blue-pale",
          },
        },
        air: {
          data: [
            [benefitsPanelData.air.slice(0, 2), benefitsPanelData.air.slice(2, 3)],
            [
              benefitsPanelData.air.slice(3, 4),
              benefitsPanelData.air.slice(4, 5),
              benefitsPanelData.air.slice(5, 6),
            ],
          ],
          classNames: {
            columns: twMerge("col-span-1 md:col-span-4 2xl:col-span-2", "md:h-[590px]"),
            cards: "bg-brand-green-pale",
          },
        },
      }
    : undefined

  return (
    <div>
      {/* benefits summary */}
      {ecosystemBenefits && (
        <div className="flex flex-row justify-evenly pb-8 flex-wrap">
          {/* benefits text */}
          <div className="text-brand-green text-xl lg:flex-1 lg:mb-0 mb-4 text-center sm:text-left">
            <span className="font-bold text-brand-green-dark">
              {formatNumber(treesNeeded)} trees
            </span>{" "}
            will be needed to get all block groups to a score of{" "}
            <span className="font-bold text-brand-green-dark">{targetScore}</span>. See the
            significant benefits to the community this will create.
            {benefitTooltipContent.get(1) && (
              <Help className="text-gray-400 hover:text-black ml-1">
                <span className="text-sm font-medium leading-tight">
                  {benefitTooltipContent.get(1)}
                </span>
              </Help>
            )}
          </div>
          <BenefitsSummaryItem
            label="Total canopy added"
            value={localeWithDecimals(percentCanopyAdded) + "%"}
            hint={benefitTooltipContent.get(35)}
          />
          <BenefitsSummaryItem
            label="Annual ecosystem service value"
            value={
              "$" + dollarFormat(getBenefit("total_ecosystem_service_value", ecosystemBenefits))
            }
            hint={benefitTooltipContent.get(2)}
          />
          <BenefitsSummaryItem
            label="Jobs supported"
            value={Math.floor(treesNeeded * JOBS_PER_TREE) + ""}
            hint={benefitTooltipContent.get(3)}
          />
        </div>
      )}

      {/* benefits panel */}
      {data && <UIBenefitsPanel data={data} className="grid-cols-1 md:grid-cols-4" />}
    </div>
  )
}

export type NationalReportProps = {
  mapRef?: React.MutableRefObject<HTMLDivElement | null>
  reportData:
    | {
        type: typeof MUNICIPAL_REPORT_TYPE
        municipality: Municipality & { center: [number, number] }
        blockgroups: Blockgroup[]
        mapExtent: BBox
      }
    | {
        type: typeof CONGRESSIONAL_DISTRICT_REPORT_TYPE
        congressionalDistrict: CongressionalDistrict & { center: [number, number] }
        blockgroups: Blockgroup[]
        mapExtent: BBox
      }
    | {
        type: typeof STATE_REPORT_TYPE
        state: State & { center: [number, number] }
        blockgroups: Blockgroup[]
        mapExtent: BBox
      }
    | {
        type: typeof COUNTY_REPORT_TYPE
        county: County & { center: [number, number] }
        blockgroups: Blockgroup[]
        mapExtent: BBox
      }
}

export function NationalReport({ reportData }: NationalReportProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const { blockgroups } = reportData
  const [mapImage, setMapImage] = useState<string | null>(null)
  const [targetScore, setTargetScore] = useState<number>(75)
  const [numberOfBlockgroupsBelowTarget, setNumberOfBlockgroupsBelowTarget] = useState<number>(0)
  const [fipsList, setFipsList] = useState<string[]>([])
  const [selectedChartOption, setSelectedChartOption] = useState<keyof Blockgroup>(
    CHART_OPTIONS[0]!.attr
  )
  const [selectedChartData, setSelectedChartData] = useState<BarChartData[] | null>(null)
  const [averageTreeCanopy, setAverageTreeCanopy] = useState<number | null>(null)
  const [tesDistributionChartData, setTesDistributionChartData] = useState<BarChartData[] | null>(
    null
  )

  const handleChartOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedChartOption(event?.target?.value as keyof Blockgroup)
  }

  const handleSliderChange = (event: ChangeEvent<object>, newValue: number | number[]) => {
    setTargetScore(newValue as number)
  }

  const getNumberOfBlockgroupsBelowTarget = (blockgroups: Blockgroup[], targetScore: number) => {
    return blockgroups.filter((bg) => bg.tree_equity_score < targetScore).length
  }

  useEffect(() => {
    const mapCanvas = mapRef.current!.querySelector(".mapboxgl-canvas") as HTMLCanvasElement
    const image = mapCanvas ? mapCanvas.toDataURL("image/jpeg").split(";base64,")[1] : ""
    // keep updating report map image until the canvas is fully loaded
    // this is a hacky way to make sure the map image is fully loaded
    if (mapImage === null || image !== mapImage) {
      setTimeout(() => {
        setMapImage(image ? image : null)
      }, 500)
    }
  }, [mapImage])

  useEffect(() => {
    setNumberOfBlockgroupsBelowTarget(getNumberOfBlockgroupsBelowTarget(blockgroups, targetScore))
    setFipsList(getFipsList(blockgroups))
  }, [blockgroups, targetScore])

  const benefitTooltipContent = TOOLTIP_CONTENT

  useEffect(() => {
    if (!blockgroups) return

    const getQuantiles = () => {
      const numQuantiles = 5
      const data = blockgroups.map((bg) => bg[selectedChartOption]) as number[]
      const quantiles = range(numQuantiles + 1).map((i) => quantile(data, i / numQuantiles))
      return quantiles as number[]
    }

    const getBins = (
      quantiles: number[]
    ): { label: string; bin: [number, number]; sum: number; count: number }[] => {
      const pairs: [number, number][] = []
      for (let i = 0; i < quantiles.length - 1; i++) {
        pairs.push([quantiles[i]!, quantiles[i + 1]!])
      }
      if (selectedChartOption === "temperature") {
        return [
          { label: "<-10°", bin: [-10000, -10], sum: 0, count: 0 },
          { label: "-10° to -5°", bin: [-10, -5], sum: 0, count: 0 },
          { label: "-5° to +5°", bin: [-5, 5], sum: 0, count: 0 },
          { label: "+5° to +10°", bin: [5, 10], sum: 0, count: 0 },
          { label: ">+10°", bin: [10, 10000], sum: 0, count: 0 },
        ]
      }
      return pairs.map((pair) => {
        const leftEnd = Math.round(pair[0] * 100)
        const rightEnd = Math.round(pair[1] * 100)
        return {
          label: leftEnd === rightEnd ? `${leftEnd}%` : `${leftEnd}-${rightEnd}%`,
          bin: pair as [number, number],
          sum: 0,
          count: 0,
        }
      })
    }

    const quantiles = getQuantiles()
    const bins = getBins(quantiles)
    const binMap = new Map(bins.map((bin) => [bin.label, bin]))

    blockgroups.forEach((bg) => {
      const value = bg[selectedChartOption] as number
      const bin = bins.find((bin) => value >= bin.bin[0] && value <= bin.bin[1])!
      const currentBinValue = binMap.get(bin.label)!
      binMap.set(bin.label, {
        ...bin,
        sum: currentBinValue.sum + bg.tree_canopy,
        count: currentBinValue.count + 1,
      })
    })

    // get average tree canopy
    const treeCanopyData = blockgroups.map((bg) => bg.tree_canopy)
    const averageTreeCanopy =
      (treeCanopyData.reduce((a, b) => a + b, 0) / treeCanopyData.length) * 100
    const averageTreeCanopyRound = Math.round(averageTreeCanopy * 100) / 100
    const data = bins.map((b) => {
      const bin = binMap.get(b.label)!
      const value = bin.count === 0 ? 0 : (bin.sum / bin.count) * 100
      const treeCanopyPercDiff = Math.round((value - averageTreeCanopy) * 10) / 10
      return {
        label: { value: bin.label },
        value: value,
        fill: "#33966D",
        tooltip: `The ${bin.count} block groups with ${b.label} ${CHART_OPTIONS.filter(
          (option) => option.attr === selectedChartOption
        )[0]!.label.toLowerCase()} have ${Math.abs(treeCanopyPercDiff)}% ${
          treeCanopyPercDiff < 0 ? "less" : "more"
        } tree canopy compared to the canopy average for ${getTitle({
          reportData,
        })}.`,
      }
    })

    setSelectedChartData(data)
    setAverageTreeCanopy(averageTreeCanopyRound)
  }, [blockgroups, selectedChartOption])

  /** get tree equity score distribution */
  useEffect(() => {
    if (!blockgroups) return
    const treeEquityScores = blockgroups.map((bg) => bg.tree_equity_score)

    // appending one value for each bin to make sure each bin is created! otherwise the thresholds function
    // won't create the bins we need, make sure to subract one from each bin count before displaying
    const bins = bin().thresholds([0, 70, 80, 90, 100, 101])([
      ...treeEquityScores,
      0,
      70,
      80,
      90,
      100,
    ])

    function ChartLabel({ priority, score }: { priority: string; score: string }) {
      return (
        <div className="flex flex-col items-center">
          <p className="uppercase text-brand-green-dark sm:text-caption text-[10px] font-semibold">
            {priority}
          </p>
          <p className="sm:text-caption text-[10px] -mt-1">{score}</p>
        </div>
      )
    }

    const data = [
      {
        label: {
          value: "0-69",
          element: <ChartLabel priority="priority: highest" score="Score: 0-69" />,
        },
        fill: "#F99D3E",
      },
      {
        label: {
          value: "70-79",
          element: <ChartLabel priority="high" score="70-79" />,
        },
        fill: "#9FB576",
      },
      {
        label: {
          value: "80-89",
          element: <ChartLabel priority="moderate" score="80-89" />,
        },
        fill: "#88BB84",
      },
      {
        label: {
          value: "90-99",
          element: <ChartLabel priority="low" score="90-99" />,
        },
        fill: "#7ABE8D",
      },
      {
        label: {
          value: "100",
          element: <ChartLabel priority="none" score="100" />,
        },
        fill: "#6CC296",
      },
    ].map((d, i) => {
      return {
        ...d,
        // subtracting one to remove the dummy data we added to make sure each bin is created
        value: bins[i]!.length - 1,
        // subtracting one to remove the dummy data we added to make sure each bin is created
        tooltip: `${bins[i]!.length - 1} block groups have a score of ${d.label.value}`,
      }
    })

    setTesDistributionChartData(data)
  }, [blockgroups])

  const getTitle = ({ reportData }: NationalReportProps) => {
    switch (reportData.type) {
      case MUNICIPAL_REPORT_TYPE:
        return `${reportData.municipality.incorporated_place_name}, ${reportData.municipality.state}`
      case COUNTY_REPORT_TYPE:
        return `${reportData.county.name}, ${reportData.county.state}`
      case CONGRESSIONAL_DISTRICT_REPORT_TYPE:
        return `${reportData.congressionalDistrict.name}`
      case STATE_REPORT_TYPE:
        return `${getFullStateNameFromAbbreviation(reportData.state.abbreviation)}`
    }
  }

  const getSummaryName = ({ reportData }: NationalReportProps) => {
    switch (reportData.type) {
      case MUNICIPAL_REPORT_TYPE:
        return `${reportData.municipality.incorporated_place_name}'s`
      case COUNTY_REPORT_TYPE:
        return `${reportData.county.name}'s`
      case CONGRESSIONAL_DISTRICT_REPORT_TYPE:
        return `district`
      case STATE_REPORT_TYPE:
        return `${getFullStateNameFromAbbreviation(reportData.state.abbreviation)}'s`
    }
  }

  const getType = ({ reportData }: NationalReportProps) => {
    switch (reportData.type) {
      case MUNICIPAL_REPORT_TYPE:
        return `Locality Report`
      case COUNTY_REPORT_TYPE:
        return `County Report`
      case CONGRESSIONAL_DISTRICT_REPORT_TYPE:
        return `Congressional District Report`
      case STATE_REPORT_TYPE:
        return `State Report`
    }
  }

  return (
    <div className="bg-gray-100">
      <HelpWidget className="fixed bottom-4 left-4 z-10 text-xs leading-relaxed" />

      <section className="pt-8 bg-white xl:w-4/5 w-full m-auto flex items-center justify-center px-2 sm:px-10">
        <div className="px-4 flex items-center flex-1">
          <TesLogo className="w-28 px-2 py-4" />
          <div className="ml-2 flex border-l py-2 border-gray-300 items-center pl-3 text-gray-700 text-md font-bold">
            National Explorer
          </div>
        </div>

        <div className="text-center flex-1">
          <div className="text-gray-700 text-xs uppercase font-bold hidden sm:block">
            Tree Equity Score
          </div>
          <div className="text-brand-green-dark text-lg font-bold">{getType({ reportData })}</div>
        </div>

        <div className="self-start flex-1 flex flex-row-reverse print:hidden">
          <Link legacyBehavior href={Routes.NationalExplorer()}>
            <a className="text-gray-400 hover:text-brand-green">
              <XCircleIcon className="w-6 h-6" />
            </a>
          </Link>
        </div>
      </section>

      <section className="bg-white xl:w-4/5 w-full m-auto flex flex-col sm:flex-row items-center justify-between pt-8 sm:pt-16 pb-6 px-2 sm:px-10">
        <div className="flex flex-col mb-4 sm:mb-0">
          <p className="text-4xl text-gray-700 mb-2 sm:mb-4">{getTitle({ reportData })}</p>
          {reportData.type === MUNICIPAL_REPORT_TYPE && (
            <p className="text-2xl text-brand-green-dark font-bold">
              Locality Score: {reportData.municipality.incorporated_place_mean_tree_equity_score}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-between items-end relative">
          <InsightsButton />
          <div className="my-2">
            <CopyRouteURLButton />
          </div>
        </div>
      </section>

      <section className="xl:w-4/5 w-full m-auto bg-gray-50 pt-6 px-2 sm:px-10 py-8 print:break-after-page print:w-full">
        <p className="text-xl font-semibold text-gray-700 mb-2">
          Summary of {getSummaryName({ reportData })} urban areas
        </p>
        <UrbanizedAreaSummary blockgroups={blockgroups} />

        {/* charts  */}
        <div className="flex lg:flex-row flex-col justify-between mt-20 w-full print:flex-col print:items-center">
          <div className="lg:mb-0 mb-8 lg:mr-8 flex-1 print:mb-8 print:mr-0">
            <div className="text-xl text-gray-700 font-semibold h-[50px]">
              Distribution of Tree Equity Scores
            </div>
            <div className="h-[400px] bg-white border border-gray-200 rounded-md">
              {tesDistributionChartData && (
                <BarChart
                  xLabel="Tree Equity Score"
                  data={tesDistributionChartData}
                  yDomain={[0, max(tesDistributionChartData, (d) => d.value)!]}
                />
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="text-xl text-gray-700 font-semibold h-[50px]">
              Tree canopy vs.{" "}
              <select
                onChange={handleChartOptionChange}
                defaultValue={CHART_OPTIONS[0]!.attr}
                className="focus:ring-0 focus:border-gray-400 border-gray-400 py-1 rounded-sm print:hidden"
              >
                {CHART_OPTIONS.map((option, k) => (
                  <option key={k} value={option.attr}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="hidden print:inline">
                {CHART_OPTIONS.filter((option) => option.attr === selectedChartOption)[0]!.label}
              </span>
              <Help className="ml-2">
                <span>
                  For people of color and people in poverty, the percentages shown on the x-axis,
                  which label each bar, are determined by using quantiles to define the range.
                </span>
              </Help>
            </div>
            <div className="h-[400px] bg-white border border-gray-200 rounded-md">
              {selectedChartData && averageTreeCanopy && (
                <BarChart
                  xLabel={
                    CHART_OPTIONS.filter((option) => option.attr === selectedChartOption)[0]!.label
                  }
                  yLabel="Tree Canopy"
                  data={selectedChartData}
                  averageValue={averageTreeCanopy}
                  formatValue={(value) => Math.round(value) + "%"}
                  yDomain={[0, max(selectedChartData.map((d) => d.value))!]}
                  gridLines
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white xl:w-4/5 w-full m-auto px-2 sm:px-10 py-8 pt-12 print:break-after-page">
        {/* slider */}
        <div className="flex flex-col items-center justify-center pb-8">
          <p className="text-2xl font-semibold text-gray-700 pb-2 text-center">
            Get all block groups to a Tree Equity Score of {targetScore}
          </p>
          <p className="text-lg text-brand-green-dark font-bold text-center">
            {numberOfBlockgroupsBelowTarget} of {blockgroups.length} have a Tree Equity Score below{" "}
            {targetScore}
          </p>
          <div className="pt-4 pb-8 w-full">
            <StyledSlider value={targetScore} onChange={handleSliderChange} />
          </div>
          <p className="text-gray-500 text-sm -mt-2 print:hidden">Drag to adjust target score</p>
        </div>
        {/* benefits */}
        <Suspense
          fallback={
            <div className="p-2 flex items-center justify-center gap-x-2 py-4 text-gray-500">
              <SymbolIcon />
              Loading…
            </div>
          }
        >
          <BenefitsSection
            targetScore={targetScore}
            blockgroups={blockgroups}
            fipsList={fipsList}
            benefitTooltipContent={benefitTooltipContent}
          />
        </Suspense>
      </section>

      {/* map */}
      <section className="bg-white xl:w-4/5 w-full m-auto px-2 sm:px-10 pb-2 sm:pb-10 pt-6 print:hidden">
        <p className="text-xl text-gray-700 font-semibold pb-4">
          {getTitle({ reportData })} Tree Equity Score Map
        </p>
        <NationalReportMap reportData={reportData} mapRef={mapRef} />
      </section>
      <section className="hidden bg-white xl:w-4/5 w-full m-auto px-2 sm:px-10 pb-2 sm:pb-10 pt-6 print:block">
        <p className="text-xl text-gray-700 font-semibold pb-4">
          {getTitle({ reportData })} Tree Equity Score Map
        </p>
        <img
          src={`data:image/png;base64,${mapImage}`}
          className="hidden print:block print:w-full print:mt-4"
        />
      </section>
    </div>
  )
}

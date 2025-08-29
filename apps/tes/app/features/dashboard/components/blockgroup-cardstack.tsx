import { useQuery } from "@blitzjs/rpc"
import { useState, useEffect } from "react"
import type { Blockgroup } from "db"
import { useAtom } from "jotai"
import type { MapboxGeoJSONFeature, Map } from "mapbox-gl"

import type { BlockgroupStackType, BGDataType } from "ui"
import { BlockgroupStack } from "ui"
import { formatNumber, percentileRank, setFeatureState, cleanFeatureState, add } from "utils"

import getFeature from "app/features/queries/getFeature"
import { clickedFeatureAtom, mapAtom } from "app/features/dashboard/dashboard.state"
import { BLOCKGROUP_LAYER_NAME } from "app/constants"
import { avgByPop, avgTreeCanopy, clippedBlockgroupPopulation } from "../utils"
import { approxTreeCount, getAcresNeeded } from "app/utils/scenario_utils"
import { useTranslation } from "react-i18next"

const formatSummaryData = (
  blockgroups: Blockgroup[],
  t: (key: string) => string,
  compositeScore?: number
): BlockgroupStackType["averages"] => {
  return [
    {
      valueType: "treeEquityScore",
      label: t("location-insights:summary.tree_equity_score.displayText"),
      value: `${compositeScore ? compositeScore : "-"}`,
      unit: "",
      hint: t("location-insights:summary.tree_equity_score.explanation"),
    },
    {
      valueType: "treesNeeded",
      label: t("location-insights:summary.trees_needed.displayText"),
      value: `${formatNumber(
        approxTreeCount(blockgroups.map((bg) => getAcresNeeded(bg, 100)).reduce(add)),
        0,
        "en-us"
      )}`,
      unit: "",
      hint: t("location-insights:summary.trees_needed.explanation"),
    },
    {
      valueType: "population",
      label: t("location-insights:summary.urban_area_population.displayText"),
      value: `${formatNumber(clippedBlockgroupPopulation(blockgroups), 0, "en-us")}`,
      unit: "",
      hint: t("location-insights:summary.urban_area_population.explanation"),
    },
    {
      valueType: "treeCanopyCover",
      label: t("location-insights:summary.tree_canopy_cover.displayText"),
      value: `${formatNumber(avgTreeCanopy(blockgroups), 0, "en-us")}`,
      unit: "%",
      hint: t("location-insights:summary.tree_canopy_cover.explanation"),
    },
    {
      valueType: "peopleInPoverty",
      label: t("location-insights:summary.people_in_poverty.displayText"),
      value: `${formatNumber(avgByPop("poverty_percent")(blockgroups), 0, "en-us")}`,
      unit: "%",
      hint: t("location-insights:summary.people_in_poverty.explanation"),
    },
    {
      valueType: "peopleOfColor",
      label: t("location-insights:summary.people_of_color.displayText"),
      value: `${formatNumber(avgByPop("poc_percent")(blockgroups), 0, "en-us")}`,
      unit: "%",
      hint: t("location-insights:summary.people_of_color.explanation"),
    },
    {
      valueType: "childrenAndSeniors",
      label: t("location-insights:summary.children_and_seniors.displayText"),
      value: `${formatNumber(avgByPop("dependent_ratio")(blockgroups), 0, "en-us")}`,
      unit: "%",
      hint: t("location-insights:summary.children_and_seniors.explanation"),
    },
    {
      valueType: "unemployment",
      label: t("location-insights:summary.unemployment.displayText"),
      value: `${formatNumber(avgByPop("unemployment_rate")(blockgroups), 0, "en-us")}`,
      unit: "%",
      hint: t("location-insights:summary.unemployment.explanation"),
    },
    {
      valueType: "linguisticIsolation",
      label: t("location-insights:summary.linguistic_isolation.displayText"),
      value: `${formatNumber(avgByPop("linguistic_isolation")(blockgroups), 0, "en-us")}`,
      unit: "%",
      hint: t("location-insights:summary.linguistic_isolation.explanation"),
    },
    {
      valueType: "healthBurdenIndex",
      label: t("location-insights:summary.health_burden.displayText"),
      value: `${formatNumber(avgByPop("health_normalized")(blockgroups), 0, "en-us")}`,
      unit: "",
      hint: t("location-insights:summary.health_burden.explanation"),
    },
    {
      valueType: "heatDisparity",
      label: t("location-insights:summary.heat_disparity.displayText"),
      value: "-",
      unit: "",
      hint: t("location-insights:summary.heat_disparity.explanation"),
    },
  ]
}

const formatBlockgroupData = ({
  selectedBg,
  blockgroups,
  title,
  t,
}: {
  selectedBg: Blockgroup
  blockgroups: Blockgroup[]
  title: string
  t: (key: string, props?: Record<string, string>) => string
}) => {
  const calculateMetric = (
    value: number,
    allValues: number[],
    formatOptions: { multiplier?: number; decimals?: number; addSign?: boolean } = {}
  ) => {
    const { multiplier = 1, decimals = 0, addSign = false } = formatOptions
    const formattedValue = value * multiplier
    const displayValue =
      addSign && formattedValue > 0
        ? `+${formatNumber(formattedValue, decimals, "en-US")}`
        : formatNumber(formattedValue, decimals, "en-US")
    const percentile = percentileRank(allValues, value)
    return { displayValue, percentile }
  }

  const metrics = {
    treeCanopyCover: calculateMetric(
      selectedBg.tree_canopy,
      blockgroups.map((bg) => bg.tree_canopy),
      { multiplier: 100 }
    ),
    peopleOfColor: calculateMetric(
      selectedBg.poc_percent,
      blockgroups.map((bg) => bg.poc_percent),
      { multiplier: 100 }
    ),
    peopleInPoverty: calculateMetric(
      selectedBg.poverty_percent,
      blockgroups.map((bg) => bg.poverty_percent),
      { multiplier: 100 }
    ),
    childrenAndSeniors: calculateMetric(
      selectedBg.child_percent + selectedBg.senior_percent,
      blockgroups.map((bg) => bg.child_percent + bg.senior_percent),
      { multiplier: 100 }
    ),
    unemployment: calculateMetric(
      selectedBg.unemployment_rate,
      blockgroups.map((bg) => bg.unemployment_rate),
      { multiplier: 100 }
    ),
    linguisticIsolation: calculateMetric(
      selectedBg.linguistic_isolation,
      blockgroups.map((bg) => bg.linguistic_isolation),
      { multiplier: 100 }
    ),
    healthBurdenIndex: calculateMetric(
      selectedBg.health_normalized,
      blockgroups.map((bg) => bg.health_normalized),
      { multiplier: 100 }
    ),
    heatDisparity: calculateMetric(
      selectedBg.temperature,
      blockgroups.map((bg) => bg.temperature),
      { decimals: 1, addSign: true }
    ),
  }

  const getPercentileBin = (percentile: number) => {
    if (percentile < 20) return "0-20th"
    if (percentile < 40) return "20-40th"
    if (percentile < 60) return "40-60th"
    if (percentile < 80) return "60-80th"
    return "80-100th"
  }

  return {
    id: selectedBg.id,
    gid: selectedBg.gid,
    values: [
      {
        valueType: "treeEquityScore",
        label: t("location-insights:summary.tree_equity_score.displayText"),
        value: `${formatNumber(selectedBg.tree_equity_score, 0, "en-US")}`,
        unit: "",
        hint: "",
      },
      {
        valueType: "treesNeeded",
        label: t("location-insights:summary.trees_needed.displayText"),
        value: `${formatNumber(approxTreeCount(getAcresNeeded(selectedBg, 100)), 0, "en-us")}`,
        unit: "",
        hint: "",
      },
      {
        valueType: "population",
        label: t("location-insights:summary.urban_area_population.displayText"),
        value: `${formatNumber(
          selectedBg.clipped_bg_population || selectedBg.total_population,
          0,
          "en-US"
        )}`,
        unit: "",
        hint: "",
      },
      {
        valueType: "treeCanopyCover",
        label: t("location-insights:summary.tree_canopy_cover.displayText"),
        displayValue: metrics.treeCanopyCover.displayValue,
        value: `${metrics.treeCanopyCover.percentile}`,
        unit: "%",
        hint: t("location-insights:summary.tree_canopy_cover.blockgroupHint", {
          value: metrics.treeCanopyCover.displayValue,
          percentile: getPercentileBin(metrics.treeCanopyCover.percentile),
          title,
        }),
      },
      {
        valueType: "peopleInPoverty",
        label: t("location-insights:summary.people_in_poverty.displayText"),
        displayValue: metrics.peopleInPoverty.displayValue,
        value: `${metrics.peopleInPoverty.percentile}`,
        unit: "%",
        hint: t("location-insights:summary.people_in_poverty.blockgroupHint", {
          value: metrics.peopleInPoverty.displayValue,
          percentile: getPercentileBin(metrics.peopleInPoverty.percentile),
          title,
        }),
      },
      {
        valueType: "peopleOfColor",
        label: t("location-insights:summary.people_of_color.displayText"),
        displayValue: metrics.peopleOfColor.displayValue,
        value: `${metrics.peopleOfColor.percentile}`,
        unit: "%",
        hint: t("location-insights:summary.people_of_color.blockgroupHint", {
          value: metrics.peopleOfColor.displayValue,
          percentile: getPercentileBin(metrics.peopleOfColor.percentile),
          title,
        }),
      },
      {
        valueType: "childrenAndSeniors",
        label: t("location-insights:summary.children_and_seniors.displayText"),
        displayValue: metrics.childrenAndSeniors.displayValue,
        value: `${metrics.childrenAndSeniors.percentile}`,
        unit: "%",
        hint: t("location-insights:summary.children.blockgroupHint", {
          value: metrics.childrenAndSeniors.displayValue,
          percentile: getPercentileBin(metrics.childrenAndSeniors.percentile),
          title,
        }),
      },
      {
        valueType: "unemployment",
        label: t("location-insights:summary.unemployment.displayText"),
        displayValue: metrics.unemployment.displayValue,
        value: `${metrics.unemployment.percentile}`,
        unit: "%",
        hint: t("location-insights:summary.unemployment.blockgroupHint", {
          value: metrics.unemployment.displayValue,
          percentile: getPercentileBin(metrics.unemployment.percentile),
          title,
        }),
      },
      {
        valueType: "linguisticIsolation",
        label: t("location-insights:summary.linguistic_isolation.displayText"),
        displayValue: metrics.linguisticIsolation.displayValue,
        value: `${metrics.linguisticIsolation.percentile}`,
        unit: "%",
        hint: t("location-insights:summary.linguistic_isolation.blockgroupHint", {
          value: metrics.linguisticIsolation.displayValue,
          percentile: getPercentileBin(metrics.linguisticIsolation.percentile),
          title,
        }),
      },
      {
        valueType: "healthBurdenIndex",
        label: t("location-insights:summary.health_burden.displayText"),
        displayValue: metrics.healthBurdenIndex.displayValue,
        value: `${metrics.healthBurdenIndex.percentile}`,
        unit: "",
        hint: t("location-insights:summary.health_burden.blockgroupHint", {
          value: metrics.healthBurdenIndex.displayValue,
          percentile: getPercentileBin(metrics.healthBurdenIndex.percentile),
          title,
        }),
      },
      {
        valueType: "heatDisparity",
        label: t("location-insights:summary.heat_disparity.displayText"),
        displayValue: metrics.heatDisparity.displayValue,
        value: `${metrics.heatDisparity.percentile}`,
        unit: "°F",
        hint: t("location-insights:summary.heat_disparity.blockgroupHint", {
          value: metrics.heatDisparity.displayValue,
          percentile: getPercentileBin(metrics.heatDisparity.percentile),
          title,
        }),
      },
    ],
  }
}

export const BlockgroupCardStack = ({
  title,
  blockgroups,
  compositeScore,
  maxItems = 3,
}: {
  title: string
  blockgroups: Blockgroup[]
  compositeScore?: number
  maxItems?: number
}) => {
  const { t } = useTranslation(["location-insights"])
  const [liveData, setLiveData] = useState<BlockgroupStackType>({
    title,
    info: "",
    averages: formatSummaryData(blockgroups, t, compositeScore),
    blockgroups: [],
  })
  const [selectedFeatures, setSelectedFeatures] = useState<Array<MapboxGeoJSONFeature | null>>([])
  const [blockgroup, setBlockgroup] = useAtom(clickedFeatureAtom)

  const [feature] = useQuery(
    getFeature,
    {
      id: blockgroup?.properties?.id,
      layerId: `${BLOCKGROUP_LAYER_NAME}` as typeof BLOCKGROUP_LAYER_NAME,
    },
    { enabled: Boolean(blockgroup) }
  )

  const [map, setMap] = useAtom(mapAtom)

  useEffect(() => {
    return () => {
      setBlockgroup(null)
      setMap(null)
    }
  }, [])

  useEffect(() => {
    if (!feature) return
    const selectedBlockgroups = liveData.blockgroups
    if (selectedBlockgroups.find((bg: BGDataType) => bg.id === blockgroup!.id)) return
    if (selectedBlockgroups.length >= maxItems) return
    if (map) setFeatureState({ map: map as Map, feature: blockgroup!, state: "selected" })
    

    const data = {
      ...liveData,
      blockgroups: [
        ...liveData.blockgroups,
        formatBlockgroupData({ selectedBg: feature as Blockgroup, blockgroups, title, t }),
      ],
    }
    setSelectedFeatures([...selectedFeatures, blockgroup])
    setLiveData(data)
    setBlockgroup(null)
  }, [map, blockgroup, feature, t])
  const content = {
    title: t("location-insights:compare.average"),
    subtitle: t("location-insights:compare.add_blockgroups", {location: title}),
  }

  const updateData = (deletedBG: BGDataType) => {
    const newData = {
      ...liveData,
      blockgroups: liveData.blockgroups.filter((bg: BGDataType) => bg!.id !== deletedBG.id),
    }

    const deletedFeature = selectedFeatures.find((f) => f!.properties?.id === deletedBG.id)

    if (map && deletedFeature)
      cleanFeatureState({ map: map as Map, feature: deletedFeature!, state: "selected" })

    setLiveData(newData)
  }

  return <BlockgroupStack data={liveData} onDelete={updateData} maxItems={maxItems} content={content}/>
}

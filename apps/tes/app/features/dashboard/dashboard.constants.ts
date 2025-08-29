import { RouteUrlObject } from "blitz"
import { Facet, TesLayer } from "tes-types"
import { BarChartData } from "./components/trend-charts/bar-chart"
import {
  getFillExpression,
  getOpacityExpression,
  group,
  groupByQuantiles,
} from "utils"
import type { Blockgroup } from "db"
import { ChartOption } from "./components/trend-charts/chart-helpers"
import {
  BlockgroupTableIds,
  LocalityTableIds,
} from "./components/advanced-planning-tool/data-table/types"
import {
  AGGREGATED_MUNICIPALITY_ZOOM,
  BLOCKGROUP_ZOOM,
  MUNICIPALITY_ZOOM,
} from "app/constants"



export const DASHBOARD_BASE_URL = "/insights"

export const NATIONAL_EXTENT: [number, number, number, number] = [
  -137.533808, 19.901482, -59.970331, 51.324032,
]

export type MapClickReportOption = {
  name: string
  type: string
  href: RouteUrlObject
}

export const PRINT_BLOCK = "print:w-full print:py-4 print:px-10"
export const ECOSYSTEM_BENEFITS_LIST: string[] = [
  "total_ecosystem_service_value",
  "co2",
  "no2",
  "so2",
  "pm25",
  "runoff_avoided",
  "rain_int",
  "ozone",
  "pm10",
]

const TES_THRESHOLDS = [0, 70, 80, 90, 100, 101]
const TES_CHART_RANGES = [
  {
    label: {
      priority: "highest",
    },
    fill: "#F99D3E",
  },
  {
    label: {
      priority: "high",
    },
    fill: "#9FB576",
  },
  {
    label: {
      priority: "moderate",
    },
    fill: "#88BB84",
  },
  {
    label: {
      priority: "low",
    },
    fill: "#7ABE8D",
  },
  {
    label: {
      priority: "none",
    },
    fill: "#6CC296",
  },
]

export const TES_CHART = {
  thresholds: TES_THRESHOLDS,
  ranges: TES_CHART_RANGES,
}

// TREE CANOPY CHART DATA
// ---

export type TrendChartTemplate = {
  label: string
  attr: keyof Blockgroup
  help: string
  bars: {
    fill: string
    thresholds: number[]
    groupFunc: <T>(
      thresholds: Array<number>,
      items: Array<T>,
      getter: (o: T) => number
    ) => Array<Array<T>>
    labels: string[]
    edgeLabels?: string[]
  }
}

export const PEOPLE_IN_POVERTY = "poverty_percent"
export const PEOPLE_OF_COLOR = "poc_percent"
export const HEAT_DISPARITY = "temperature"
export const HEALTH_BURDEN = "health_normalized"
export const LINGUISTIC_ISOLATION = "linguistic_isolation"
export const TREE_CANOPY_COVER = "tree_canopy"
export const TREES_PER_PERSON = "trees_per_person"

export const TREND_CHART_TEMPLATES: TrendChartTemplate[] = [
  {
    label: "facets:poverty_percent.name",
    attr: PEOPLE_IN_POVERTY,
    bars: {
      fill: "#33966D",
      thresholds: [0.2, 0.4, 0.6, 0.8, 1],
      groupFunc: groupByQuantiles,
      labels: [
        "location-insights:charts.0_20_percentile_label",
        "location-insights:charts.20_40_percentile_label",
        "location-insights:charts.40_60_percentile_label",
        "location-insights:charts.60_80_percentile_label",
        "location-insights:charts.80_100_percentile_label",
      ],
    },
    help: "location-insights:summary.people_in_poverty.explanation",
  },
  {
    label: "facets:poc_percent.name",
    attr: PEOPLE_OF_COLOR,
    bars: {
      fill: "#33966D",
      thresholds: [0.2, 0.4, 0.6, 0.8, 1],
      groupFunc: groupByQuantiles,
      labels: [
        "location-insights:charts.0_20_percentile_label",
        "location-insights:charts.20_40_percentile_label",
        "location-insights:charts.40_60_percentile_label",
        "location-insights:charts.60_80_percentile_label",
        "location-insights:charts.80_100_percentile_label",
      ],
    },
    help: "location-insights:summary.people_of_color.explanation",
  },
  {
    label: "facets:temperature.name",
    attr: HEAT_DISPARITY,
    bars: {
      fill: "#33966D",
      thresholds: [-5, 0, 5, 10, 2000], // picking a large number for the last threshold so that it's effectively >10
      groupFunc: group,
      labels: [
        "location-insights:charts.temperature_less_than_5_label",
        "location-insights:charts.temperature_5_to_0_label",
        "location-insights:charts.temperature_0_to_5_label",
        "location-insights:charts.temperature_5_to_10_label",
        "location-insights:charts.temperature_more_than_10_label",
      ],
    },
    help: "facets:temperature.description",
  },
  {
    label: "facets:health_normalized.name",
    attr: HEALTH_BURDEN,
    bars: {
      fill: "#33966D",
      thresholds: [0.2, 0.4, 0.6, 0.8, 1],
      groupFunc: groupByQuantiles,
      labels: [
        "location-insights:charts.0_20_percentile_label",
        "location-insights:charts.20_40_percentile_label",
        "location-insights:charts.40_60_percentile_label",
        "location-insights:charts.60_80_percentile_label",
        "location-insights:charts.80_100_percentile_label",
      ],
    },
    help: "location-insights:summary.health_burden.explanation",
  },
  {
    label: "facets:linguistic_isolation.name",
    attr: LINGUISTIC_ISOLATION,
    bars: {
      fill: "#33966D",
      thresholds: [0.2, 0.4, 0.6, 0.8, 1],
      groupFunc: groupByQuantiles,
      labels: [
        "location-insights:charts.0_20_percentile_label",
        "location-insights:charts.20_40_percentile_label",
        "location-insights:charts.40_60_percentile_label",
        "location-insights:charts.60_80_percentile_label",
        "location-insights:charts.80_100_percentile_label",
      ]
    },
    help: "location-insights:summary.linguistic_isolation.explanation",
  },
]

export const TREND_CHART_TEMPLATES_MAP = new Map(
  TREND_CHART_TEMPLATES.map((template) => [template.attr, template])
)

export const TREND_CHART_Y_OPTIONS: ChartOption[] = [
  { label: "facets:tree_canopy.name", value: TREE_CANOPY_COVER },
  {
    label: "facets:trees_per_person.name",
    value: TREES_PER_PERSON,
  },
]

export const TREND_CHART_X_OPTIONS: ChartOption[] = TREND_CHART_TEMPLATES.map(
  (t) => ({
    label: t.label,
    value: t.attr,
  })
)

export type TrendChartData = {
  className: string
  xLabel: string
  yLabel: string
  data: BarChartData[]
  averageLabel: string
  averageValue: number
  yDomain: [number, number]
  gridLines: boolean
  isPrint: boolean
  height: number
  chartClassName: string
}

export const DEFAULT_TARGET_SCORE_NEW_CANOPY = 75
export const DEFAULT_TARGET_SCORE_EXISTING_CANOPY = 0
export const DEFAULT_PLANNING_SECTION_TAB = "new"

export const LOCALITY_PLANNING_TOOL_TYPE = "LOCALITY"
export const BLOCKGROUP_PLANNING_TOOL_TYPE = "BLOCKGROUP"

export const HEAT_MAP_COLUMNS_STOPS = [
  "0-69",
  "70-74",
  "75-79",
  "80-84",
  "85-89",
  "90-94",
  "95-99",
  "100",
]

export const BLOCKGROUP_TABLE_HEADERS_DICTIONARY: {
  [key in BlockgroupTableIds]: string
} = {
  [BlockgroupTableIds.Id]: "ID",
  [BlockgroupTableIds.TreeEquityScore]: "tree_equity_score",
  [BlockgroupTableIds.DeltaScore]: "delta_score",
  [BlockgroupTableIds.TreeCanopy]: "tree_canopy",
  [BlockgroupTableIds.TreeCanopyGain]: "tree_canopy_gain",
  [BlockgroupTableIds.PlantingNeed]: "planting_need",
  [BlockgroupTableIds.TotalPopulation]: "total_population",
  [BlockgroupTableIds.PovertyPercent]: "poverty_percent",
  [BlockgroupTableIds.PocPercent]: "poc_percent",
  [BlockgroupTableIds.UnemploymentRate]: "unemployment_rate",
  [BlockgroupTableIds.Age]: "age",
  [BlockgroupTableIds.Lang]: "linguistic_isolation",
  [BlockgroupTableIds.HealthRisk]: "health_burden",
  [BlockgroupTableIds.Temperature]: "temperature",
  [BlockgroupTableIds.BlockGroups]: "block_groups",
  [BlockgroupTableIds.Municipality]: "municipality_slug",
  [BlockgroupTableIds.Center]: "center",
}

export const LOCALITY_TABLE_HEADERS_DICTIONARY: {
  [key in LocalityTableIds]: string
} = {
  [LocalityTableIds.Id]: "ID",
  [LocalityTableIds.LocalityName]: "locality_name",
  [LocalityTableIds.CompositeScore]: "locality_tree_composite_score",
  [LocalityTableIds.DeltaScore]: "delta_score",
  [LocalityTableIds.TreeCanopy]: "tree_canopy",
  [LocalityTableIds.TreeCanopyGain]: "tree_canopy_gain",
  [LocalityTableIds.TreesNeeded]: "planting_need",
  [LocalityTableIds.TargetedBlockgroups]: "targeted_blockgroups",
  [LocalityTableIds.TotalPopulation]: "total_population",
  [LocalityTableIds.PovertyPercent]: "poverty_percent",
  [LocalityTableIds.PocPercent]: "poc_percent",
  [LocalityTableIds.UnemploymentRate]: "unemployment_rate",
  [LocalityTableIds.Age]: "age",
  [LocalityTableIds.Lang]: "linguistic_isolation",
  [LocalityTableIds.HealthRisk]: "health_burden",
  [LocalityTableIds.BlockgroupCount]: "block_groups",
  [LocalityTableIds.Area]: "area",
  [LocalityTableIds.Municipality]: "municipality_slug",
  [LocalityTableIds.Center]: "center",
}

////////// MAP RELATED CONSTANTS /////////////////////

export const RICHMOND_BOUNDS: [number, number, number, number] = [
  -77.53141201139432, 37.45068237713207, -77.31876479949975, 37.63071794457066,
]

export const TES_MUNICIPALITY_FACET: Facet = {
  name: "Tree Equity Score",
  layer: "national_municipality",
  attr: "incorporated_place_mean_tree_equity_score",
  data: {
    type: "range",
    values: [0, 100],
    step: 1,
    style: {
      stops: [70, 100],
      fill: ["#F99D3E", "#6CC396"],
      opacity: [1, 1],
    },
  },
  isLayer: true,
  isFilter: true,
}

export const TES_BLOCKGROUP_FACET: Facet = {
  name: "Tree Equity Score",
  layer: "national_blockgroup",
  attr: "tree_equity_score",
  explanation: `Tree Equity Score is a nationwide, neighbourhood-level score ranging from 0 to 100
    that highlights inequitable access to trees. The score is calculated based on tree
    canopy cover, climate, health and socioeconomic data. The lower the score, the
    greater priority for tree planting. A score of 100 means the neighbourhood has met
    a minimum standard for tree cover appropriate for that area`,
  isLayer: true,
  isFilter: true,
  category: "tree_equity_score",
  data: {
    type: "range",
    values: [0, 100],
    filterValues: [0, 100],
    rampLabels: [70, 100],
    filterLabels: [0, 100],
    step: 1,
    style: {
      stops: [70, 100],
      fill: ["#F99D3E", "#6CC396"],
      opacity: [1, 1],
    },
  },
}

export const MAX_FILL_OPACITY = 0.9
export const UNSELECTED_FEATURE_FILL_OPACITY = 0.75
export const BLOCKGROUP_LIKE_LINE_COLOR = "#707070"
export const BLOCKGROUP_LIKE_HOVER_LINE_COLOR = "#005251"
export const BLOCKGROUP_LIKE_LINE_WIDTH = 0.7
export const BLOCKGROUP_LIKE_HOVER_LINE_WIDTH = 3.2
export const BLOCKGROUP_LIKE_SELECTED_LINE_COLOR = "#4e4e4e"
export const BLOCKGROUP_LIKE_SELECTED_LINE_WIDTH = 1.7

export const MAP_LAYERS: TesLayer[] = [
  {
    source: "national_municipality",
    id: "aggregated",
    type: "fill",
    minzoom: AGGREGATED_MUNICIPALITY_ZOOM,
    maxzoom: MUNICIPALITY_ZOOM,
    paint: {
      "fill-color": "#33966D",
    },
  },
  {
    id: "national_municipality",
    source: "national_municipality",
    type: "fill",
    paint: {
      "fill-color": getFillExpression(TES_MUNICIPALITY_FACET),
      "fill-opacity": getOpacityExpression(TES_MUNICIPALITY_FACET),
    },
    clickable: false,
    hoverable: false,
    minzoom: MUNICIPALITY_ZOOM,
    maxzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: "national_municipality_outline",
    source: "national_municipality",
    type: "line",
    paint: {
      "line-color": "#626262",
      "line-width": 0.8,
    },
    clickable: false,
    hoverable: false,
    minzoom: MUNICIPALITY_ZOOM,
    maxzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: "national_blockgroup",
    source: "national_blockgroup",
    type: "fill",
    paint: {
      "fill-color": getFillExpression(TES_BLOCKGROUP_FACET),
      "fill-opacity": getOpacityExpression(TES_BLOCKGROUP_FACET),
    },
    clickable: true,
    hoverable: true,
    minzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: "national_blockgroup_outline",
    source: "national_blockgroup",
    type: "line",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        BLOCKGROUP_LIKE_HOVER_LINE_COLOR,
        ["boolean", ["feature-state", "selected"], false],
        BLOCKGROUP_LIKE_SELECTED_LINE_COLOR,
        BLOCKGROUP_LIKE_LINE_COLOR,
      ],
      "line-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        BLOCKGROUP_LIKE_HOVER_LINE_WIDTH,
        ["boolean", ["feature-state", "selected"], false],
        BLOCKGROUP_LIKE_SELECTED_LINE_WIDTH,
        BLOCKGROUP_LIKE_LINE_WIDTH,
      ],
    },
    clickable: false,
    hoverable: false,
    minzoom: BLOCKGROUP_ZOOM,
  },
]

export const MUNICIPALITY_LAYER_SOURCE = "national_municipality"
export const AGGREGATED_MUNICIPALITY_LAYER_NAME = "aggregated"
export const BLOCKGROUP_LAYER_SOURCE = "national_blockgroup"
export const LOCALITY_TABLE_MAP_LAYERS: TesLayer[] = [
  {
    id: MUNICIPALITY_LAYER_SOURCE,
    source: MUNICIPALITY_LAYER_SOURCE,
    type: "fill",
    paint: {
      "fill-color": getFillExpression(TES_MUNICIPALITY_FACET),
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        getOpacityExpression(TES_BLOCKGROUP_FACET, MAX_FILL_OPACITY),
        getOpacityExpression(
          TES_BLOCKGROUP_FACET,
          UNSELECTED_FEATURE_FILL_OPACITY
        ),
      ],
    },
    clickable: false,
    hoverable: false,
    minzoom: MUNICIPALITY_ZOOM,
    maxzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: "national_municipality_outline",
    source: MUNICIPALITY_LAYER_SOURCE,
    type: "line",
    paint: {
      "line-color": "#626262",
      "line-width": 0.8,
    },
    clickable: false,
    hoverable: false,
    minzoom: MUNICIPALITY_ZOOM,
    maxzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: "national_municipality_hover_outline",
    source: MUNICIPALITY_LAYER_SOURCE,
    type: "line",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        BLOCKGROUP_LIKE_HOVER_LINE_COLOR,
        BLOCKGROUP_LIKE_LINE_COLOR,
      ],
      "line-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        BLOCKGROUP_LIKE_HOVER_LINE_WIDTH,
        0,
      ],
    },
    clickable: false,
    hoverable: false,
    minzoom: MUNICIPALITY_ZOOM,
    maxzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: AGGREGATED_MUNICIPALITY_LAYER_NAME,
    source: MUNICIPALITY_LAYER_SOURCE,
    type: "fill",
    minzoom: 0,
    maxzoom: MUNICIPALITY_ZOOM,
    paint: {
      "fill-color": "#33966D",
    },
  },
]

export const BLOCKGROUP_TABLE_MAP_LAYERS: TesLayer[] = [
  {
    id: BLOCKGROUP_LAYER_SOURCE,
    source: BLOCKGROUP_LAYER_SOURCE,
    type: "fill",
    paint: {
      "fill-color": getFillExpression(TES_BLOCKGROUP_FACET),
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        getOpacityExpression(TES_BLOCKGROUP_FACET, MAX_FILL_OPACITY),
        getOpacityExpression(
          TES_BLOCKGROUP_FACET,
          UNSELECTED_FEATURE_FILL_OPACITY
        ),
      ],
    },
    clickable: false,
    hoverable: true,
    minzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: "national_blockgroup_outline",
    source: BLOCKGROUP_LAYER_SOURCE,
    type: "line",
    paint: {
      "line-color": BLOCKGROUP_LIKE_LINE_COLOR,

      "line-width": BLOCKGROUP_LIKE_LINE_WIDTH,
    },
    clickable: false,
    hoverable: false,
    minzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: "national_blockgroup_select_outline",
    source: BLOCKGROUP_LAYER_SOURCE,
    type: "line",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        BLOCKGROUP_LIKE_SELECTED_LINE_COLOR,
        BLOCKGROUP_LIKE_LINE_COLOR,
      ],
      "line-width": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        BLOCKGROUP_LIKE_SELECTED_LINE_WIDTH,
        BLOCKGROUP_LIKE_LINE_WIDTH,
      ],
    },
    clickable: false,
    hoverable: false,
    minzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: "national_blockgroup_external_select_outline",
    source: BLOCKGROUP_LAYER_SOURCE,
    type: "line",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "external-selected"], false],
        BLOCKGROUP_LIKE_HOVER_LINE_COLOR,
        BLOCKGROUP_LIKE_LINE_COLOR,
      ],
      "line-width": [
        "case",
        ["boolean", ["feature-state", "external-selected"], false],
        BLOCKGROUP_LIKE_HOVER_LINE_WIDTH,
        0,
      ],
    },
    clickable: false,
    hoverable: false,
    minzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: "national_blockgroup_hover_outline",
    source: BLOCKGROUP_LAYER_SOURCE,
    type: "line",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        BLOCKGROUP_LIKE_HOVER_LINE_COLOR,
        BLOCKGROUP_LIKE_LINE_COLOR,
      ],
      "line-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        BLOCKGROUP_LIKE_HOVER_LINE_WIDTH,
        0,
      ],
    },
    clickable: false,
    hoverable: false,
    minzoom: BLOCKGROUP_ZOOM,
  },
  {
    id: "national_municipality_select_outline",
    source: "national_municipality",
    type: "line",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        BLOCKGROUP_LIKE_SELECTED_LINE_COLOR,
        BLOCKGROUP_LIKE_LINE_COLOR,
      ],
      "line-width": [
        "case",
        ["boolean", ["feature-state", "selected"], false],
        BLOCKGROUP_LIKE_SELECTED_LINE_WIDTH,
        BLOCKGROUP_LIKE_LINE_WIDTH,
      ],
    },
    clickable: false,
    hoverable: false,
    minzoom: MUNICIPALITY_ZOOM,
  },
  {
    id: "national_municipality_external_select_outline",
    source: "national_municipality",
    type: "line",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "external-selected"], false],
        BLOCKGROUP_LIKE_HOVER_LINE_COLOR,
        BLOCKGROUP_LIKE_LINE_COLOR,
      ],
      "line-width": [
        "case",
        ["boolean", ["feature-state", "external-selected"], false],
        BLOCKGROUP_LIKE_HOVER_LINE_WIDTH,
        0,
      ],
    },
    clickable: false,
    hoverable: false,
    minzoom: MUNICIPALITY_ZOOM,
  },
]
export const TABLE_MAP_LAYERS = [
  ...LOCALITY_TABLE_MAP_LAYERS,
  ...BLOCKGROUP_TABLE_MAP_LAYERS,
]

export const TOOLTIP_CONTENT = new Map([
  [
    1,
    "Setting a Tree Equity Score target approximates the canopy expansion needed to bring any block groups below your target score up to that target score. Canopy area is roughly translated to number of trees based on a 600sq-ft tree (a standard medium-sized tree). Estimated total annual benefits are tabulated based on the total targeted trees for all block groups, using multipliers applied to canopy values. If you customized the number of trees when setting a target for any block group, the targeted trees total and benefits estimation will reflect your custom inputs.",
  ],
  [
    2,
    "The footprint of new canopy cover needed to bring any block groups below the target score up to the target score.",
  ],
  [
    3,
    "The total footprint of tree cover, including existing canopy plus any new canopy cover needed to bring any block groups below the target score up to the target score. Set the slider to zero to see the existing canopy cover alone. Adjust the slider to increase the total canopy cover.",
  ],
  [
    4,
    "Total annual economic benefit (monetary value) for all of the ecosystem services, including all carbon, air and water benefits provided by trees. Conversion sourced from i-Tree Landscape.",
  ],
  [
    5,
    "The estimated number of direct, indirect, and induced full-time, part-time, and seasonal jobs from investing in these trees. These jobs do not carry a specific time dimension—to get the average number of jobs supported each year, the number of jobs are divided by the number of years over which the investment occurs. Conversion from American Forests supported research that used the U.S. Bureau of Economic Analysis' Regional Input-Output Modeling System II (RIMS).",
  ],
  [
    6,
    "How many trees does each person have? An estimate of the number trees relative to the number of people. Translates the canopy cover to an estimated number of medium-sized (600sq-ft) trees, divided by the total urban population. Total canopy cover is the sum of all existing canopy plus any new canopy expansion needed to bring any block groups below the target score up to the target score.",
  ],
  [
    7,
    "Each Census-designated locality (e.g., a town, city, village or borough) is assigned a composite score from 0-100, which provides a simplified assessment of overall tree distribution fairness. The score for each locality is aggregated from all block group Tree Equity Scores within the Census-defined boundaries of that locality. The composite score will increase faster if block group with lower Tree Equity Scores are raised.",
  ],
  [
    8,
    "The number of localities containing block groups that need trees based on the slider target.",
  ],
  [
    9,
    "The atmospheric carbon dioxide captured and stored by these trees, measured in annual tons. Conversion sourced from i-Tree Landscape.",
  ],
  [
    10,
    "Annual offset of greenhouse gas emissions by gasoline-powered passenger vehicles (2-axle, 4-tire vehicles), such as passenger cars, vans, pickup trucks and sport/utility vehicles. Conversion defined by the U.S. EPA The Greenhouse Gas Equivalencies calculator.",
  ],
  [
    11,
    "Total home electricity, natural gas, distillate fuel oil, and liquefied petroleum gas consumption figures converted to metric tons of carbon dioxide. Conversion defined by the U.S. EPA The Greenhouse Gas Equivalencies calculator.",
  ],
  [
    12,
    "Annual amount stormwater surface runoff (and associated pollutants) that are absorbed by these trees and do not require management. Conversion sourced from i-Tree Landscape.",
  ],
  [
    13,
    "Annual prevented stormwater runoff converted into standard swimming pools. Based on a 20,000-gallon standard swimming pool.",
  ],
  [
    14,
    "Annual amount of rainfall intercepted and eventually evaporated by these trees. Conversion sourced from i-Tree Landscape.",
  ],
  [
    15,
    "Annual weight in tons of absorption of particulate matter less than 2.5 microns in size by these trees (smaller quantities displayed in lbs). PM2.5 is a smaller size class of airborne microscopic particles that can be inhaled and deposit deeper in the lungs and even enter the bloodstream, potentially causing serious health problems. Conversion sourced from i-Tree Landscape.",
  ],
  [
    16,
    "Annual offset of particulate matter less than 2.5 microns in size produced by automobiles. Conversion sourced from i-Tree Landscape.",
  ],
  [
    17,
    "Annual tons of nitrogen dioxide absorption by these trees (smaller quantities displayed in lbs). Nitrogen dioxide is an air pollutant, the most prominent source coming from the burning of fossil fuels. Breathing air with a high concentration of nitrogen dioxide can irritate airways in the human respiratory system. Exposures over short periods can aggravate respiratory diseases, particularly asthma, leading to respiratory symptoms (such as coughing, wheezing or difficulty breathing), hospital admissions and visits to emergency rooms. Longer exposures to elevated concentrations of nitrogen dioxide may contribute to the development of asthma and potentially increase susceptibility to respiratory infections. People with asthma, as well as children and the elderly are generally at greater risk for the health effects of nitrogen dioxide. Conversion sourced from i-Tree Landscape.",
  ],
  [
    18,
    "Annual tons of sulfur dioxide absorption by these trees (smaller quantities displayed in lbs). Sulfur dioxide is a toxic gas released by burning sulfur-containing fuels such as coal, oil, or diesel and as a byproduct of mining. Short-term exposures to sulfur dioxide can harm the human respiratory system and make breathing difficult. Continued exposure increases respiratory symptoms and affects lung function. High concentrations of sulfur dioxide in the air generally also convert to other sulfur oxides that react with other compounds to form small particles that may penetrate deeply into the lungs and in sufficient quantity can contribute to health problems. People with asthma, particularly children, are sensitive to these effects of sulfur dioxide. Conversion sourced from i-Tree Landscape.",
  ],
  [
    19,
    "Annual tons of absorption of particulate matter less than 10 microns and greater than 2.5 microns in size by these these trees (smaller quantities displayed in lbs). PM10 is a larger size class of airborne microscopic particles that can be inhaled and deposit on airway surfaces and the upper lungs, potentially causing serious health problems. Conversion sourced from i-Tree Landscape.",
  ],
  [
    20,
    "Annual tons of ozone absorption by these these trees (smaller quantities displayed in lbs). Ozone is a greenhouse gas and air pollutant in low levels caused by combustion of fossil fuels. Ozone in the air we breathe can harm our health, especially on hot sunny days when ozone can reach unhealthy levels. Even relatively low levels of ozone can cause health effects. Depending on the level of exposure, ozone can cause coughing and sore or scratchy throat, make it more difficult to breathe deeply and vigorously and cause pain when taking a deep breath, inflame and damage the airways, make the lungs more susceptible to infection, aggravate lung diseases such as asthma, emphysema, and chronic bronchitis, and increase the frequency of asthma attacks. Conversion sourced from i-Tree Landscape.",
  ],
])

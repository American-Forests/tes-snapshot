import {
  percentage,
  imdDeciles,
  locale,
  tempFloor,
  floatToPercentage,
  tempDiff,
  formatNumber,
} from "utils"
import {
  airPollutionTooltip,
  toFixed,
  imdTooltip,
  filterUnmapper,
  filterMapper,
  binaryToString,
  stringToBinary,
} from "./facets.utils"
import type { Facet as F } from "tes-types"
import type { LocalityLike, NeighborhoodLike } from "db"
const NEIGHBORHOOD_LIKE_LAYER = "neighborhood_like-fill"
const LOCALITY_LIKE_LAYER = "locality_like-fill"
type NeighborhoodLikeFacet = F & {
  layer: typeof NEIGHBORHOOD_LIKE_LAYER
  attr: keyof NeighborhoodLike
  tooltipAttribute?: keyof NeighborhoodLike
}

type LocalityLikeFacet = F & { layer: typeof LOCALITY_LIKE_LAYER; attr: keyof LocalityLike }

export type Facet = NeighborhoodLikeFacet | LocalityLikeFacet
export type FacetCategory =
  | "tree_equity_score"
  | "tree_canopy"
  | "priority_indicators"
  | "supplemental_layers"

export const DEFAULT_NEIGHBOURHOOD_LIKE_FACET = "tree_equity_score"
export const DEFAULT_LOCALITY_LIKE_FACET = "tree_equity_score"

export const FACETS_CATEGORIES: Record<FacetCategory, string> = {
  tree_canopy: "tree canopy",
  priority_indicators: "priority indicators",
  tree_equity_score: "",
  supplemental_layers: "supplemental layers",
}

const percentStep = 1

export const FACETS: Facet[] = [
  {
    name: "Tree Equity Score",
    layer: NEIGHBORHOOD_LIKE_LAYER,
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
  },
  {
    name: "Tree canopy cover",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "tree_canopy",
    explanation: `The existing percent tree canopy cover, that is, the footprint of trees when viewed 
      from above—the bird's eye view of tree crowns (leaves, branches and stems), 
      calculated as a percentage of the urban area of each neighbourhood.`,
    source: "Google Environmental Insights Explorer (34,349 LSOAs); iTree Landscape (526 LSOAs)",
    tooltipFormatter: floatToPercentage,
    isLayer: true,
    isFilter: true,
    category: "tree_canopy",
    data: {
      type: "range",
      values: [0, 0.7],
      filterValues: [0, 100],
      rampLabels: [0, 30],
      filterLabels: [0, 100],
      filterMapper,
      filterUnmapper,
      formatter: percentage,
      step: percentStep,
      style: {
        stops: [0, 0.3, 0.32],
        fill: ["#FFF", "#379C68", "#379C68"],
        opacity: [0.7, 1, 1],
      },
    },
  },
  {
    name: "Tree canopy gap",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "tree_canopy_gap",
    explanation: `The percent area of a neighbourhood that could be planted to reach the 
      neighbourhood tree canopy goal. A measure of need, calculated as the difference 
      between the percentage of existing tree canopy cover and the tree canopy goal.`,
    tooltipFormatter: floatToPercentage,
    isLayer: true,
    isFilter: true,
    category: "tree_canopy",
    data: {
      type: "range",
      values: [0, 0.35],
      filterValues: [0, 100],
      rampLabels: [0, 30],
      filterLabels: [0, 100],
      filterMapper,
      filterUnmapper,
      formatter: percentage,
      step: percentStep,
      style: {
        stops: [0, 0.18, 0.3],
        fill: ["#FFF", "#F9A650", "#F9A650"],
        opacity: [0.7, 1, 1],
      },
    },
  },
  {
    name: "Priority Index",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "priority_indicator",
    tooltipFormatter: (x) => formatNumber(x, 2, "en-GB"),
    explanation: `The Priority Index is made up of equally-weighted climate and socioeconomic 
    characteristics that are integrated into the Tree Equity Score. The Priority Index 
    helps prioritise the need for planting to achieve Tree Equity. The higher the Priority 
    Index, the higher the measures of social deprivation and/or risk relative to 
    environmental hazards that could be reduced with benefits of trees. Range: 0 to 1, 
    where 1 is the highest priority`,
    isLayer: true,
    isFilter: true,
    category: "priority_indicators",
    data: {
      type: "range",
      values: [0.18, 0.86],
      filterValues: [0, 1],
      rampLabels: [0, 1],
      filterLabels: [0, 1],
      step: 0.01,
      style: {
        stops: [0, 0.25, 0.75, 1],
        fill: ["#FFFFFF", "#FFFFFF", "#007185", "#007185"],
        opacity: [0.7, 0.7, 1, 1],
      },
    },
  },
  {
    name: "Children and older people",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "dependent_proportion",
    tooltipFormatter: floatToPercentage,
    explanation: `Percentage of children, ages 0 to 17, and adults, ages 65 and older.`,
    source: `England and Wales Census 2021, Northern Ireland Census 2011, 
    Scotland Census 2011.`,
    isLayer: true,
    isFilter: true,
    category: "priority_indicators",
    data: {
      type: "range",
      values: [0, 0.61],
      filterValues: [0, 100],
      rampLabels: [0, 50],
      filterLabels: [0, 100],
      filterMapper,
      filterUnmapper,
      formatter: percentage,
      step: percentStep,
      style: {
        stops: [0.24, 0.25, 0.5, 0.51],
        fill: ["#FFFFFF", "#FFFFFF", "#007185", "#007185"],
        opacity: [0.7, 0.7, 1, 1],
      },
    },
  },
  {
    name: "Air pollution: PM2.5 index",
    tooltipName: "Annual PM2.5 emissions mean",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "pm25_normalized",
    getTooltipString: airPollutionTooltip,
    tooltipFormatter: toFixed(1),
    tooltipAttribute: "pm25_average",
    explanation: `Annual emissions of PM2.5 concentrations in the air measured in 
    micrograms/cubic metre, scaled from 0 to 1 by country. Defined as particulate 
    matter less than 2.5 microns in size, PM2.5 is a smaller size class of airborne 
    microscopic particles that can be inhaled and deposit deeper in the lungs and even 
    enter the bloodstream, potentially causing serious health problems`,
    source: `Department for Environment, Food & Rural Affairs - Emissions of air 
    pollutants`,
    isLayer: true,
    isFilter: true,
    category: "priority_indicators",
    data: {
      type: "range",
      values: [0, 1],
      filterValues: [0, 1],
      rampLabels: [0, 1],
      filterLabels: [0, 1],
      step: 0.01,
      style: {
        stops: [0.1, 0.4, 0.6, 0.67, 0.73, 0.8, 0.81],
        fill: ["#F3F3EB", "#989865", "#737300", "#6D6842", "#66622B", "#4E4A1F", "#4E4A1F"],
        opacity: [0.2, 0.2, 0.4, 0.8, 0.9, 1, 1],
      },
    },
  },
  {
    name: "Air pollution: NO2 index",
    tooltipName: "Annual NO2 emissions mean",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "no2_normalized",
    getTooltipString: airPollutionTooltip,
    tooltipFormatter: toFixed(1),
    tooltipAttribute: "no2_average",
    explanation: `Annual emissions of nitrogen dioxide (NO2) concentrations in the air 
    measured in micrograms/cubic metre, scaled from 0 to 1 by country. Nitrogen 
    dioxide is an air pollutant, the most prominent source coming from the burning of 
    fossil fuels. Breathing air with a high concentration of NO2 can irritate the
    respiratory system. Exposures over short periods can aggravate respiratory 
    diseases, particularly asthma, leading to symptoms (such as coughing, 
    wheezing or difficulty breathing), hospital admissions and visits. Longer exposures to elevated concentrations of NO2 may contribute to 
    the development of asthma and potentially increase susceptibility to respiratory 
    infections. People with asthma, as well as children and the elderly are generally at 
    greater risk for the health effects of NO2.`,
    source: `Department for Environment, Food & Rural Affairs - Emissions of air 
    pollutants.`,
    isLayer: true,
    isFilter: true,
    category: "priority_indicators",
    data: {
      type: "range",
      values: [0, 1],
      filterValues: [0, 1],
      rampLabels: [0, 1],
      filterLabels: [0, 1],
      step: 0.01,
      style: {
        stops: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.71],
        fill: ["#F3F3EB", "#989865", "#737300", "#827B49", "#66622B", "#4E4A1F", "#4E4A1F"],
        opacity: [0.2, 0.2, 0.4, 0.8, 0.9, 1, 1],
      },
    },
  },
  {
    name: "Income Deciles (IMD)",
    layerName: "Income Ranking (IMD)",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "income_rank_decile",
    tooltipAttribute: "income_rank",
    explanation: `From the UK Indices of Multiple Deprivation (IMD), a neighbourhood's relative deprivation in its country based on several indicators of 
    income, measured as a rank with 1 being the most deprived and larger numbers 
    being the least deprived. England ranks 32,844 LSOAs, Wales 1,909 LSOAs, 
    Scotland 6,976 Data Zones, and Northern Ireland 890 SOAs. IMD rankings are displayed on the map in deciles, where the 1st decile is the most deprived decile and the 10the decile is the least deprived.`,
    source: `English Indices of Multiple Deprivation (2019), Scottish Index of 
    Multiple Deprivation (2020), Northern Ireland Multiple Deprivation Measures (2017), 
    Welsh Index of Multiple Deprivation 2019.`,
    getTooltipString: imdTooltip,
    tooltipFormatter: (d) => locale(d, "en-GB"),
    isLayer: true,
    isFilter: true,
    category: "priority_indicators",
    data: {
      formatter: imdDeciles,
      type: "quantile",
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      filterValues: [0, 10],
      rampLabels: [10, 1],
      filterLabels: [0, 10],
      reversedRamp: true,
      step: 1,
      style: {
        stops: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        fill: [
          "#007185",
          "#1B8092",
          "#378FA0",
          "#529FAE",
          "#6EAEBB",
          "#89BDC9",
          "#A5CDD6",
          "#C0DCE4",
          "#DCECF1",
          "#F7FBFF",
        ],
        opacity: [1, 0.94, 0.89, 0.83, 0.78, 0.72, 0.67, 0.61, 0.56, 0.5],
      },
    },
  },
  {
    name: "Health Deciles (IMD)",
    layerName: "Health Ranking (IMD)",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "health_rank_decile",
    tooltipAttribute: "health_rank",
    getTooltipString: imdTooltip,
    tooltipFormatter: (d) => locale(d, "en-GB"),
    explanation: `From the UK Indices of Multiple Deprivation (IMD), a neighbourhood's relative deprivation in its country based on several indicators of 
    employment, measured as a rank with 1 being the most deprived and larger 
    numbers being the least deprived. England ranks 32,844 LSOAs, Wales 1,909 
    LSOAs, Scotland 6,976 Data Zones, and Northern Ireland 890 SOAs. IMD rankings are displayed on the map in deciles, where the 1st decile is the most deprived decile and the 10the decile is the least deprived.`,
    source: `English Indices of Multiple Deprivation (2019), Scottish Index of 
    Multiple Deprivation (2020), Northern Ireland Multiple Deprivation Measures (2017), 
    Welsh Index of Multiple Deprivation 2019.`,
    isLayer: true,
    isFilter: true,
    category: "priority_indicators",
    data: {
      formatter: imdDeciles,
      type: "quantile",
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      filterValues: [0, 10],
      rampLabels: [10, 1],
      filterLabels: [0, 10],
      reversedRamp: true,
      step: 1,
      style: {
        stops: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        fill: [
          "#007185",
          "#1B8092",
          "#378FA0",
          "#529FAE",
          "#6EAEBB",
          "#89BDC9",
          "#A5CDD6",
          "#C0DCE4",
          "#DCECF1",
          "#F7FBFF",
        ],
        opacity: [1, 0.94, 0.89, 0.83, 0.78, 0.72, 0.67, 0.61, 0.56, 0.5],
      },
    },
  },
  {
    name: "Employment Deciles (IMD)",
    layerName: "Employment Ranking (IMD)",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "employment_rank_decile",
    tooltipAttribute: "employment_rank",
    explanation: `From the UK Indices of Multiple Deprivation (IMD), a neighbourhood's relative deprivation in its country based on several indicators of 
    employment, measured as a rank with 1 being the most deprived and larger 
    numbers being the least deprived. England ranks 32,844 LSOAs, Wales 1,909 
    LSOAs, Scotland 6,976 Data Zones, and Northern Ireland 890 SOAs. IMD rankings are displayed on the map in deciles, where the 1st decile is the most deprived decile and the 10the decile is the least deprived.`,
    source: `English Indices of Multiple Deprivation (2019), Scottish Index of 
    Multiple Deprivation (2020), Northern Ireland Multiple Deprivation Measures (2017), 
    Welsh Index of Multiple Deprivation 2019.`,
    getTooltipString: imdTooltip,
    tooltipFormatter: (d) => locale(d, "en-GB"),
    isLayer: true,
    isFilter: true,
    category: "priority_indicators",
    data: {
      formatter: imdDeciles,
      type: "quantile",
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      filterValues: [0, 10],
      rampLabels: [10, 1],
      filterLabels: [0, 10],
      reversedRamp: true,
      step: 1,
      style: {
        stops: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        fill: [
          "#007185",
          "#1B8092",
          "#378FA0",
          "#529FAE",
          "#6EAEBB",
          "#89BDC9",
          "#A5CDD6",
          "#C0DCE4",
          "#DCECF1",
          "#F7FBFF",
        ],
        opacity: [1, 0.94, 0.89, 0.83, 0.78, 0.72, 0.67, 0.61, 0.56, 0.5],
      },
    },
  },
  {
    name: "Heat disparity",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "temperature_difference",
    tooltipFormatter: tempDiff,
    explanation: `Heat disparity compares average neighbourhood heat extremity with the with the local authority average
    to measure variance in heat severity across neighbourhoods.`,
    source: `USGS Earth Explorer - Landsat 8 Collection 2 Level 2 Surface 
    Temperature`,
    isLayer: true,
    isFilter: true,
    category: "priority_indicators",
    data: {
      type: "range",
      values: [-10, 10],
      filterValues: [-10, +10],
      rampLabels: [-5, +5],
      filterLabels: [-10, 10],
      formatter: tempFloor,
      step: 1,
      style: {
        stops: [-4, -3, 0, 2, 3, 4],
        fill: ["#BEE5F1", "#BEE5F1", "#FFF", "#F54625", "#DB2400", "#A00E0d"],
        opacity: [0.6, 0.6, 0.4, 0.9, 0.9, 0.9],
      },
    },
  },
  {
    name: "People from minoritised ethnic groups",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "minority_ethnic_group_proportion",
    tooltipFormatter: floatToPercentage,
    explanation: `The proportion of the population identifying with Census-defined minoritised ethnic 
    groups. Available as a Supplementary Layer, this dataset may be locally important 
    when considering how to increase Tree Equity and where to target action for 
    increasing tree cover.`,
    source: `2021 Census of England and Wales, 2011 Census in Northern 
    Ireland, 2011 Census in Scotland.`,
    isLayer: true,
    isFilter: true,
    category: "supplemental_layers",
    data: {
      type: "range",
      values: [0, 1],
      filterValues: [0, 100],
      rampLabels: [0, 100],
      filterLabels: [0, 100],
      filterMapper,
      filterUnmapper,
      formatter: percentage,
      step: percentStep,
      style: {
        stops: [0, 0.75, 0.9],
        fill: ["#FFFFFF", "#007185", "#007185"],
        opacity: [0.5, 1, 1],
      },
    },
  },
  {
    name: "Peat",
    layer: NEIGHBORHOOD_LIKE_LAYER,
    attr: "peat",
    explanation: `Tree Equity Score is a nationwide, neighbourhood-level score ranging from 0-100 
    that highlights inequitable access to trees. The score is calculated based on tree 
    canopy cover, climate, health and socioeconomic data. The lower the score, the 
    greater priority for tree planting. A score of 100 means the neighbourhood has met 
    a minimum standard for tree cover appropriate for that area`,
    isLayer: false,
    isFilter: true,
    data: {
      filterMapper: stringToBinary,
      filterUnmapper: binaryToString,
      type: "boolean",
      values: [1, 0],
    },
  },

  {
    name: "Composite Score",
    layer: LOCALITY_LIKE_LAYER,
    attr: "tree_equity_score",
    explanation: "some explanation",
    source: "data source",
    isLayer: true,
    isFilter: false,
    category: "tree_equity_score",
    data: {
      type: "range",
      values: [0, 100],
      rampLabels: [60, 100],
      filterLabels: [0, 100],
      filterMapper,
      filterUnmapper,
      step: percentStep,
      style: {
        stops: [60, 100],
        fill: ["#F99D3E", "#6CC396"],
        opacity: [1, 1],
      },
    },
  },
]

import { Routes } from "@blitzjs/next"
import { Area, AreaOnScenario, Blockgroup, BlockgroupSupplemental } from "db"
import { NestedMenuItem, MenuItem } from "components/header"

export const AGGREGATED_MUNICIPALITY_ZOOM = 0
export const MUNICIPALITY_ZOOM = 8
export const BLOCKGROUP_ZOOM = 10
export const PARCEL_ZOOM = 15
export const CANOPY_ZOOM = 16
export const NATIONAL_EXTENT: [number, number, number, number] = [
  -137.533808, 19.901482, -59.970331, 51.324032,
]

export const AGGREGATED_MUNICIPALITY_LEVEL_NAME = "Aggregated Municipality"
export const MUNICIPALITY_LEVEL_NAME = "Municipality"
export const BLOCKGROUP_LEVEL_NAME = "Block Group"
export const PARCEL_LEVEL_NAME = "Parcel"

export const MUNICIPAL_REPORT_TYPE = "municipal"
export const CONGRESSIONAL_DISTRICT_REPORT_TYPE = "congressional_district"
export const STATE_REPORT_TYPE = "state"
export const COUNTY_REPORT_TYPE = "county"

export const LEVELS = [
  { name: AGGREGATED_MUNICIPALITY_LEVEL_NAME, zoom: AGGREGATED_MUNICIPALITY_ZOOM + 1 },
  { name: MUNICIPALITY_LEVEL_NAME, zoom: MUNICIPALITY_ZOOM + 1 },
  { name: BLOCKGROUP_LEVEL_NAME, zoom: BLOCKGROUP_ZOOM + 1 },
  { name: PARCEL_LEVEL_NAME, zoom: PARCEL_ZOOM + 1 },
] as const

export type LevelName =
  | typeof AGGREGATED_MUNICIPALITY_LEVEL_NAME
  | typeof MUNICIPALITY_LEVEL_NAME
  | typeof BLOCKGROUP_LEVEL_NAME
  | typeof PARCEL_LEVEL_NAME

export const PARCEL_LAYER_NAME = "parcel"
export const BLOCKGROUP_LAYER_NAME = "blockgroup"
export const RIGHT_OF_WAY_LAYER_NAME = "right_of_way"
export const MUNICIPALITY_LAYER_NAME = "municipality"
export const TREE_CANOPY_LAYER_NAME = "tree_canopy"
export const AGGREGATED_MUNICIPALITY_LAYER_NAME = "aggregated_municipality"

export const PARCEL_OUTLINE_LAYER_NAME = "parcel-outlines"
export const BLOCKGROUP_OUTLINE_LAYER_NAME = "blockgroup-outlines"
export const RIGHT_OF_WAY_OUTLINE_LAYER_NAME = "right_of_way-outlines"
export const MUNICIPALITY_OUTLINE_LAYER_NAME = "municipality-outlines"

// extra outline layers drawn on top so that outline of geometry on hover
// always shows up on top of neighboring outlines
export const PARCEL_OUTLINE_HOVER_LAYER_NAME = "parcel-hover-outlines"
export const RIGHT_OF_WAY_OUTLINE_HOVER_LAYER_NAME = "right_of_way-hover-outlines"
export const BLOCKGROUP_OUTLINE_HOVER_LAYER_NAME = "blockgroup-hover-outlines"
export const DEFAULT_SCENARIO_MAP_LAYER = "tree_equity_score"

/**
 * styling constants
 */

export const MAX_FILL_OPACITY = 0.75
export const MUNICIPALITY_LINE_COLOR = "#535353"
export const MUNICIPALITY_LINE_WIDTH = 2.3

export const BLOCKGROUP_LINE_COLOR = "#686868"
export const BLOCKGROUP_HOVER_LINE_COLOR = "#4E4E4E"
export const BLOCKGROUP_LINE_WIDTH = 0.8
export const BLOCKGROUP_HOVER_LINE_WIDTH = 2.8
export const BLOCKGROUP_FILL_OPACITY = MAX_FILL_OPACITY
export const BLOCKGROUP_SELECTED_LINE_COLOR = "#005351"
export const BLOCKGROUP_SELECTED_LINE_WIDTH = 4

export const PARCEL_LINE_COLOR = "#B4B4B4"
export const PARCEL_HOVER_LINE_COLOR = "#4E4E4E"
export const PARCEL_LINE_WIDTH = 0.85
export const PARCEL_HOVER_LINE_WIDTH = 2
export const PARCEL_FILL_OPACITY = MAX_FILL_OPACITY

export const ROW_LINE_COLOR = "#D0D0D0"
export const ROW_HOVER_LINE_COLOR = "#4E4E4E"
export const ROW_LINE_WIDTH = 0.55
export const ROW_HOVER_LINE_WIDTH = 2
export const ROW_FILL_OPACITY = MAX_FILL_OPACITY

export const SCENARIO_BLOCKGROUP_LINE_COLOR = "#005F5D"
export const SCENARIO_BLOCKGROUP_LINE_WIDTH = 2.5
export const SCENARIO_EDITING_BLOCKGROUP_LINE_COLOR = "#E94D4D"
export const SCENARIO_EDITING_BLOCKGROUP_LINE_WIDTH = 2.5

export const SCENARIO_AREA_LINE_COLOR = "#005F5D"
export const SCENARIO_AREA_LINE_WIDTH = 2
export const SCENARIO_EDITING_AREA_LINE_COLOR = "#E94D4D" // #E94D4D red, #1290A7 blue
export const SCENARIO_EDITING_AREA_LINE_WIDTH = 4

export const DEFAULT_ACTIVE_FACET = "tree_equity_score"
export const DEFAULT_PARCEL_ACTIVE_FACET = "potential_tree_canopy"
export const DEFAULT_MUNICIPALITY_ACTIVE_FACET = "incorporated_place_mean_tree_equity_score"

export const SATELLITE_LAYER_LINE_COLOR = "#D0D0D0"

export function areaOnScenarioArea(area: AreaOnScenario) {
  let sum = 0
  for (const type of TYPES) {
    if (typeof area[type] === "number") {
      sum += area[type] * TREE_INFO[type].AreaSF
    }
  }
  return sum
}

export const ZERO_TREES = {
  treesLarge: 0,
  treesMedium: 0,
  treesSmall: 0,
} as const

type TreeKeys = keyof typeof ZERO_TREES

interface TreeInfo {
  Type: string
  Size: string
  AreaSF: number
  Abbr: string
}

export const TREE_INFO: Record<TreeKeys, TreeInfo> = {
  treesLarge: {
    Type: "Large",
    Size: "Large (>50ft)",
    AreaSF: 1000,
    Abbr: "L",
  },
  treesMedium: {
    Type: "Medium",
    Size: "Medium (30-50ft)",
    AreaSF: 600,
    Abbr: "M",
  },
  treesSmall: {
    Type: "Small",
    Size: "Small (<30ft)",
    AreaSF: 300,
    Abbr: "S",
  },
} as const

export const TYPES = Object.keys(TREE_INFO) as Array<keyof typeof TREE_INFO>
export const JOBS_PER_TREE = 0.0072731
export const DEFAULT_TARGET_INCREASE = 5

/** define ecosystem benefits variable names */
export const ECOSYSTEM_BENEFITS_LIST = [
  "total_ecosystem_service_value",
  "co2",
  "no2",
  "so2",
  "pm10",
  "pm25",
  "ozone",
  "runoff_avoided",
  "rain_int",
]

export const BENEFITS_SECTIONS = {
  target: "target",
  proposed: "proposed",
  existing: "existing",
}

export const BENEFITS_TOOLTIPS = {
  [BENEFITS_SECTIONS.proposed]:
    "Site impact benefits are only available for scenarios that have parcel and right-of-way plantings. To plant at the parcel or right-of-way level, return to your scenario and zoom to the parcel level of the map. ",
  [BENEFITS_SECTIONS.existing]:
    "Existing site canopy benefits are only available for parcels and rights-of-way that have been added to your scenario. This tally of existing site canopy can help you quantify the benefits of protecting and maintaining existing trees. To add a parcel or right-of-way to your scenario, return to your scenario and zoom to the parcel level of the map.",
}

export const FACET_TITLES: Map<keyof BlockgroupWithSupplemental | keyof Area, string> = new Map([
  ["tree_equity_score", "Tree Equity Score"],
  ["tree_canopy", "Tree canopy cover"],
  ["tree_canopy_gap", "Tree canopy gap"],
  ["impervious_surface", "Impervious surface"],
  ["poverty_percent", "People in poverty"],
  ["poc_percent", "People of color"],
  ["dependent_ratio", "Children and seniors"],
  ["unemployment_rate", "Unemployment"],
  ["health_normalized", "Health burden index"],
  ["temperature", "Heat disparity"],
  ["afternoon_air_average_temperature", "Afternoon air temperature"],
  ["evening_air_average_temperature", "Evening air temperature"],
  ["name_ej_criteria", "2020 Mass EJ Populations"],
  ["number_ej_criteria", "Number of Mass EJ Criteria"],
  ["neighborhood", "Neighborhood"],
  ["potential_tree_canopy", "Potential tree canopy"],
  ["parking", "Parking Lot"],
  ["sidewalk", "Sidewalk"],
  ["school", "School"],
  ["public", "Public Ownership"],
  ["park", "Park"],
  ["industrial", "Industrial"],
  ["flood", "Flood"],
  ["open_space", "Open Space"],
  ["rented", "Rented"],
  ["area_sqkm", "Area (acres)"],
  ["hez", "Health Equity Zone"],
  ["watershed", "Watershed"],
  ["subwatershed", "Subwatershed"],
  ["tree_canopy_gain", "Tree canopy gain (sqm)"],
  ["tree_canopy_loss", "Tree canopy loss (sqm)"],
  ["health_risk", "Climate Related Health Risk"],
  ["worship", "Place of Worship"],
  ["current_commercial_land_use", "Ruston Commercial Land Use"],
  ["future_commercial_land_use", "Ruston Future Commercial Land Use"],
  ["holc_grade", "Redlining"],
  ["linguistic_isolation", "Linguistic isolation"],
  ["equity_index", "Priority index"],
  ["land_use", "Land use"],
  ["air_pollution", "Air pollution"],
  ["parks_access", "Parks access"],
  ["qualified_census_tract", "Qualified census tract"],
  ["light_rail", "Light rail"],
  ["cooling_center", "Cooling center"],
  ["bus_stop", "Bus stop"],
  ["council_district", "Council district"],
  ["social_vulnerability_index", "Social vulnerability index"],
  ["neighborhood_type", "Neighborhood type"],
  ["future_land_use", "Future land use"],
  ["ej_disadvantaged", "EPA IRA Disadvantaged Community"],
  ["canopy_change_percent", "Canopy change"],
  ["public_ownership_type", "Public ownership type"],
  ["asthma_percent", "Asthma"],
  ["population_density", "Population density"],
  ["brownfield", "Brownfield"],
  ["neighborhood_id", "Neighbourhood ID"],
  ["neighborhood_score", "Neighbourhood score"],
  ["neighborhood_score_category", "Neighbourhood score"],
  ["neighborhood_designation", "Neighbourhood designation"],
  ["ward", "Ward"],
  ["library", "Library"],
  ["tree_planting_investment_index", "Tree planting investment index"],
  ["road_emissions", "Road emissions"],
  ["municipality_name", "Municipality"],
  ["low_food_access", "Low food access"],
  ["affordable_housing", "Affordable housing"],
  ["community_garden", "Community garden"],
  ["ttf_tree_equity_planting", "TTF Tree Planting Priority"],
  ["ej_screen", "EPA EJScreen"],
  ["school_district", "School district"],
  ["total_shade12", "Noon"],
  ["total_shade15", "3 p.m."],
  ["total_shade18", "6 p.m."],
])

export const DATA_LAYERS: DATA_LAYER[] = [
  AGGREGATED_MUNICIPALITY_LAYER_NAME,
  MUNICIPALITY_LAYER_NAME,
  BLOCKGROUP_LAYER_NAME,
  RIGHT_OF_WAY_LAYER_NAME,
  PARCEL_LAYER_NAME,
]

export type DATA_LAYER =
  | typeof AGGREGATED_MUNICIPALITY_LAYER_NAME
  | typeof MUNICIPALITY_LAYER_NAME
  | typeof BLOCKGROUP_LAYER_NAME
  | typeof PARCEL_LAYER_NAME
  | typeof RIGHT_OF_WAY_LAYER_NAME

export const TES_NATIONAL_EXPLORER_HOME_LINK = "/"
export const TES_NATIONAL_EXPLORER_MAP_LINK = "/map"
export const TES_NATIONAL_EXPLORER_TESA_HOME_LINK = "/analyzer"
export const TES_NATIONAL_EXPLORER_METHODOLOGY_LINK = "/methodology"
export const TES_NATIONAL_EXPLORER_DATA_GLOSSARY_LINK = "/methodology?tab=data-glossary"
export const TES_NATIONAL_EXPLORER_FAQ_LINK = "/methodology?tab=faqs"
export const TES_NATIONAL_EXPLORER_DATA_DOWNLOAD_LINK = "/methodology?tab=data-download"
export const TES_NATIONAL_EXPLORER_CONTACT_LINK = "/contact"
export const TES_NATIONAL_EXPLORER_ABOUT_LINK = "/about"
export const TES_NATIONAL_EXPLORER_STORIES_LINK = "/stories"
export const TES_NATIONAL_EXPLORER_RESOURCES_LINK = "/resources"
export const TES_NATIONAL_EXPLORER_DEMO_LINK = "/resources?tab=demo"
export const TES_NATIONAL_EXPLORER_STARTER_GUIDE_LINK = "/resources?tab=starter-guide"
export const TES_NATIONAL_EXPLORER_RESOURCES_TAB_LINK = "/resources?tab=resources"
export const VIBRANT_CITIES_LAB_LINK = "https://www.vibrantcitieslab.com/"
export const ONE_T_ORG_LINK = "https://www.1t.org/"
export const TAKE_ACTION_LINK = "https://www.americanforests.org/take-action/"
export const PARTNER_WITH_AF_LINK = "https://www.americanforests.org/our-approach/partnerships/"
export const AF_CAREER_RESOURCES_LINK =
  "https://www.americanforests.org/tools-research-reports-and-guides/career-resources/"
export const AF_LINK = "https://www.americanforests.org/"
export const TES_UK_NATIONAL_EXPLORER_HOME_LINK = "https://uk.treeequityscore.org/"

export const STATES_LOOKUP = {
  AK: "Alaska",
  AL: "Alabama",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
}

export const MENU_ITEMS: (MenuItem | NestedMenuItem)[] = [
  {
    name: "common:home",
    link: Routes.Home(),
    type: "item",
  },
  {
    name: "common:methods_and_data",
    items: [
      {
        name: "common:methods",
        link: Routes.Methodology(),
        type: "item",
      },
      {
        name: "common:data_glossary",
        link: TES_NATIONAL_EXPLORER_DATA_GLOSSARY_LINK,
        type: "item",
      },
      {
        name: "common:faqs",
        link: TES_NATIONAL_EXPLORER_FAQ_LINK,
        type: "item",
      },
      {
        name: "common:data_download",
        link: TES_NATIONAL_EXPLORER_DATA_DOWNLOAD_LINK,
        type: "item",
      },
    ],
    type: "nested",
  },
  {
    name: "common:stories",
    link: Routes.Stories(),
    type: "item",
  },
  {
    name: "common:resources",
    items: [
      {
        name: "common:watch_demo",
        link: TES_NATIONAL_EXPLORER_DEMO_LINK,
        type: "item",
      },
      {
        name: "common:starter_guide",
        link: TES_NATIONAL_EXPLORER_STARTER_GUIDE_LINK,
        type: "item",
      },
      {
        name: "common:more_resources",
        link: TES_NATIONAL_EXPLORER_RESOURCES_TAB_LINK,
        type: "item",
      },
    ],
    type: "nested",
  },
  {
    name: "common:about",
    link: Routes.About(),
    type: "item",
  },
  {
    name: "common:international",
    items: [
      {
        name: "common:tree_equity_score_uk",
        link: TES_UK_NATIONAL_EXPLORER_HOME_LINK,
        image: "uk-flag.svg",
        type: "item",
      },
    ],
    type: "nested",
  },
  {
    name: "common:contact_us",
    link: Routes.Contact(),
    type: "item",
  },
]

export const STATIC_ASSETS_CLOUDFRONT_URL = "https://d17m5nraxo9zm6.cloudfront.net"
export const getAssetUrl = (assetPath: string) => `${STATIC_ASSETS_CLOUDFRONT_URL}/${assetPath}`
export const TORONTO_BENEFITS_PANEL_TOOLTIPS: Map<number, string> = new Map([
  /**
   * Targeted trees
   */
  [
    1,
    "Setting a Tree Equity Score target approximates the minimum number of medium-sized trees (56sq-m) needed to shift the starting score to your target score. Total estimated census tract benefits are tabulated based on the total targeted trees for all census tracts in your scenario. If you customized the number of trees when setting a target for any census tract, the targeted trees total and benefits estimation will reflect your custom inputs.",
  ],
  /**
   * Annual ecosystem service value
   */
  [
    2,
    "Total annual economic benefit (monetary value) for all of the ecosystem services, including all carbon sequestration, air pollutant removal and stormwater absorption provided by trees.",
  ],
  /**
   * Carbon sequestered
   */
  [
    4,
    "The atmospheric carbon dioxide captured and stored by trees, measured in annual tonnes. Conversion sourced from 2018 Toronto Canopy Study.",
  ],
  /**
   * Carbon sequestered equal to gas-powered cars
   */
  [
    5,
    "Annual offset of carbon dioxide emissions by gasoline-powered passenger vehicles (2-axle, 4-tire vehicles), such as passenger cars, vans, pickup trucks, and sport/utility vehicles. Conversion sourced from Natural Resources Canada Greenhouse Gas Equivalencies Calculator.",
  ],
  /**
   * Carbon sequestered equal to homes' energy use offset
   */
  [
    6,
    "Annual offset of carbon dioxide emissions by the average energy use of a home in Canada. Conversion sourced from Natural Resources Canada Greenhouse Gas Equivalencies Calculator.",
  ],
  /**
   * Stormwater runoff prevented
   */
  [
    7,
    "Annual litres of reduced stormwater surface runoff (and associated pollutants) that would be absorbed by trees and no longer require management. Conversion sourced from 2018 Toronto Canopy Study.",
  ],
  /**
   * stormwater runoff equal to rain barrels
   */
  [
    8,
    "Annual litres of reduced stormwater surface runoff (and associated pollutants) converted into standard rain barrels. Conversion sourced from 2018 Toronto Canopy Study.",
  ],
  /**
   * PM2.5 Pollution Removed
   */
  [
    10,
    "Annual tonnes/kilograms of absorption of particulate matter less than 2.5 microns in size by trees. PM2.5 is a smaller size class of airborne microscopic particles that can be inhaled and deposit deeper in the lungs and even enter the bloodstream, potentially causing serious health problems. Conversion sourced from the 2018 Toronto Canopy Study.",
  ],
  /**
   * PM2.5 Pollution Removed equal to gas-powered cars offset
   */
  [
    11,
    "Annual offset of particulate matter less than 2.5 microns in size produced by automobiles. Conversion sourced from Canada's Air Pollutant Emissions Inventory 2021",
  ],
  /**
   * Nitrogen Dioxide Removed
   */
  [
    12,
    "Annual tonnes/kilograms of nitrogen dioxide absorption by trees. Nitrogen dioxide is an air pollutant, the most prominent source coming from the burning of fossil fuels. Breathing air with a high concentration of NO2 can irritate airways in the human respiratory system. Exposures over short periods can aggravate respiratory diseases, particularly asthma, leading to respiratory symptoms (such as coughing, wheezing or difficulty breathing), hospital admissions and visits to accident & emergency. Longer exposures to elevated concentrations of NO2 may contribute to the development of asthma and potentially increase susceptibility to respiratory infections. People with asthma, as well as children and the elderly are generally at greater risk for the health effects of NO2. Conversion sourced from the 2018 Toronto Canopy Study.",
  ],
  /**
   * Sulfur Dioxide Removed
   */
  [
    13,
    "Annual tonnes/kilograms of sulphur dioxide absorption by trees. Sulphur dioxide is a toxic gas released by burning sulphur-containing fuels such as coal, oil, or diesel and as a byproduct of mining. Short-term exposures to SO2 can harm the human respiratory system and make breathing difficult. Continued exposure increases respiratory symptoms and affects lung function. High concentrations of SO2 in the air generally also convert to other sulphur oxides that react with other compounds to form small particles that may penetrate deeply into the lungs and in sufficient quantity can contribute to health problems. People with asthma, particularly children, are sensitive to these effects of SO2. Conversion sourced from the 2018 Toronto Canopy Study.",
  ],
  /**
   * Ozones Removed
   */
  [
    15,
    "Annual tonnes/kilograms of ozone absorption by trees. Ozone is a greenhouse gas and air pollutant in low levels caused by combustion of fossil fuels. Ozone in the air we breathe can harm our health, especially on hot sunny days when ozone can reach unhealthy levels. Even relatively low levels of ozone can cause health effects. Depending on the level of exposure, ozone can cause coughing and sore or scratchy throat, make it more difficult to breathe deeply and vigorously and cause pain when taking a deep breath, inflame and damage the airways, make the lungs more susceptible to infection, aggravate lung diseases such as asthma, emphysema, and chronic bronchitis, and increase the frequency of asthma attacks. Conversion sourced from the 2018 Toronto Tree Canopy Study.",
  ],
])

export const TES_NATIONAL_EXPLORER_TITLE = "Tree Equity Score National Explorer"

export type BlockgroupWithSupplemental = Blockgroup & BlockgroupSupplemental

export const TILESERVER_URL = `${process.env.NEXT_PUBLIC_TILESERVER_URL!}/${
  process.env.NEXT_PUBLIC_TILESERVER_ENV
}`
export type BlockgroupWithCenter = Blockgroup & {
  center: [number, number] | null
}

export const MIGRATED_TESAS = ["richmond", "ruston", "rhode_island", "boston", "dc"]
export const SHADE_TESAS = ["austin", "detroit", "maricopa"]


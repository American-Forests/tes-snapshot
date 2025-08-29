import { AF_LINK, CSH_LINK, WOODLAND_TRUST_LINK } from "app/constants"

export const HOW_IT_WORKS = [
  {
    image: "step1.svg",
    description: "Find your score for all urban neighbourhoods in the UK",
  },
  {
    image: "step2.svg",
    description: "Locate data to inform and support allocation of resources for trees",
  },
  {
    image: "step3.svg",
    description: "Inform Local Authority and regional strategies",
  },
  {
    image: "step4.svg",
    description: "Communicate the benefit to the community",
  },
]

export const ABOUT = [
  {
    image: "figma-group-exports/woodland-trust-image-logo.jpg",
    link: WOODLAND_TRUST_LINK,
    description:
      "The Woodland Trust is the UK's largest woodland conservation charity. " +
      "By protecting ancient, veteran and valuable woods and trees; restoring native woods and trees " +
      "to good health; and creating wildlife-rich woods and planting native trees; it hopes to create " +
      "a world where woods and trees thrive for nature, climate and people.",
  },
  {
    image: "figma-group-exports/af-image-logo.jpg",
    link: AF_LINK,
    description:
      "The oldest national non-profit conservation organisation in the United States, " +
      "American Forests creates healthy and resilient forests, from cities to large natural landscapes, " +
      "that deliver essential benefits for climate, people, water and wildlife. American Forests pioneered " +
      "the development of Tree Equity Score, first launched in the U.S. in 2021.",
  },
  {
    image: "figma-group-exports/csh-image-logo.jpg",
    link: CSH_LINK,
    description:
      "The Centre for Sustainable Healthcare is one of the world's foremost institutions for sustainable healthcare " +
      "in research and practice. By sharing knowledge, skills and tools, it inspires and empowers all people in the " +
      "health system to play their part in the transformation to a sustainable health service that supports our communities and natural world.",
  },
]

export const CONTRIBUTORS = [
  { logo: "figma-group-exports/national-trust-logo.jpg" },
  { logo: "figma-group-exports/treeconomics-logo.jpg" },
  { logo: "figma-group-exports/friends-of-earth-logo.jpg" },
  { logo: "figma-group-exports/trees-for-cities-logo.jpg" },
  { logo: "figma-group-exports/belfast-city-council-logo.jpg" },
  { logo: "figma-group-exports/wild-in-the-city-logo.jpg" },
  { logo: "figma-group-exports/birmingham-treepeople-logo.jpg" },
  { logo: "figma-group-exports/woodland-dwelling-logo.jpg" },
  { logo: "figma-group-exports/planit-geo-logo.jpg" },
  { logo: "figma-group-exports/google-logo.jpg" },
  { logo: "figma-group-exports/salesforce-logo.jpg" },
  { logo: "figma-group-exports/itree-logo.jpg" },
]

export const TAB_LIST = ["methods", "data glossary", "data download", "more info"]

export const STYLES = {
  formula:
    "border-l-8 border-brand-green-dark bg-brand-green-pale inline-block text-brand-green-dark font-semibold p-4",
  orderedList:
    "before:absolute before:text-black before:w-8 before:h-8 before:bg-brand-green-light before:text-body before:rounded-full before:flex before:items-center before:justify-center before:font-extrabold",
}

export const dataGlossaryCategories = [
  "Tree Equity Score",
  "Places",
  "Tree canopy measures",
  "Demographic measures",
  "Tree canopy benefits",
  "Climate & public health",
  "Other",
]

export const dataGlossaryContent = [
  {
    category: "Tree Equity Score",
    title: "Tree Equity Score",
    content:
      "Tree Equity Score is a nationwide, neighbourhood-level score ranging from 0 to 100 that " +
      "highlights inequitable access to trees. The lower the score, the greater priority for tree planting. " +
      "A score of 100 means the neighbourhood has met a minimum standard for tree cover appropriate for " +
      "that area.",
  },
  {
    category: "Tree Equity Score",
    title: "Composite scores (for local authorities)",
    content:
      "Each local authority is assigned a composite score from 0 to 100, which provides a simplified " +
      "assessment of overall tree distribution fairness. The score for each local authority is aggregated " +
      "from all neighbourhood Tree Equity Scores within the boundaries of that local authority. The composite " +
      "score will increase faster if neighbourhoods with lower Tree Equity Scores are raised.",
  },
  {
    category: "Places",
    title: "Neighbourhood",
    content:
      "A neighbourhood is a collective term for the geographic areas where Government statistics are " +
      "presented across the UK. Neighbourhoods are defined as the Lower Super Output Area (LSOA) in England and " +
      "Wales, the Data Zone (DZ) in Scotland, and the Super Output Area (SOA) in Northern Ireland. These are " +
      "equivalent small geographic areas used in the reporting of small area statistics, including the Indices of " +
      "Multiple Deprivation. These geographic areas comprise groups of typically four to six contiguous Output Areas " +
      "and are delineated to be as consistent in population size as possible.",
  },
  {
    category: "Places",
    title: "Local authority",
    content:
      "A local authority is a government body responsible for administering and providing public services at " +
      "the local level within a specific geographical area, such as a city, town or county. These authorities are " +
      "empowered to make decisions and enact policies related to areas like planning and " +
      "local infrastructure to serve the needs of their communities. Local authorities are typically governed by elected " +
      "officials and play a crucial role in local governance and service delivery.",
  },
  {
    category: "Places",
    title: "Constituency",
    content:
      "The UK is divided into parliamentary constituencies, where one Member of Parliament (MP) in the House " +
      "of Commons represents a single constituency. There are currently 533 constituencies in England, 59 in Scotland, 40 " +
      "in Wales and 18 in Northern Ireland. Constituencies vary in population and geographic size.",
  },
  {
    category: "Places",
    title: "Country",
    content:
      "The four constituent countries of the UK are England, Scotland, Northern Ireland and Wales.",
  },
  {
    category: "Places",
    title: "Urban areas",
    content:
      "Tree Equity Scores are calculated specifically for the urbanised areas within neighbourhoods for the purpose of " +
      "guiding urban forestry work. By delineating urban areas for all neighbourhoods, the calculation excludes peripheral " +
      "areas characterised by agriculture, non-forested natural, or other land covers that would not be targeted in an urban " +
      "forestry program. Urban boundaries were determined using urban classifications for LSOAs, SOAs, and Data Zones overlaid " +
      "on built-up area classifications from the NERC EDS Environmental Information Data Centre Land Cover Map 2021.",
  },
  {
    category: "Tree canopy measures",
    title: "Tree canopy cover (%)",
    content:
      "The footprint of existing tree canopy when viewed from above—the bird's eye view of tree crowns (leaves, " +
      "branches and stems).\n\nData Source: Google Environmental Insights Explorer (34,349 LSOAs); iTree Landscape (526 LSOAs)",
  },
  {
    category: "Tree canopy measures",
    title: "Neighbourhood tree canopy goal",
    content:
      "The minimum percentage of tree canopy required to deliver the requisite benefits of trees to a neighbourhood, " +
      "based on a 30% baseline target and adjusted for population density to reflect increased human population levels that could limit plantable area. Tree canopy goals represent minimum standard of tree " +
      "cover for all neighbourhoods. They may differ from goals set by local authorities.\n\nInternational Union for Conservation of Nature (IUCN) 3-30-300 rule",
  },
  {
    category: "Tree canopy measures",
    title: "Tree canopy gap (%)",
    content:
      "The percent area of a neighbourhood that could be planted to reach the neighbourhood tree canopy goal. A measure " +
      "of need, calculated as the difference between the percentage of existing tree canopy cover and the tree canopy goal.",
  },
  {
    category: "Demographic measures",
    title: "Children (0-17)",
    content:
      "Percentage of children, ages 0 to 17.\n\nData Sources: England and Wales Census 2021, Northern Ireland Census 2011, Scotland Census 2011.",
  },
  {
    category: "Demographic measures",
    title: "Dependency ratio",
    content:
      "Older people (age 65+) and children (0-17) as a proportion of working age adults (18-64).\n\nData Sources: England and Wales Census 2021, Northern Ireland Census 2011, Scotland Census 2011",
  },
  {
    category: "Demographic measures",
    title: "Indices of Multiple Deprivation - Employment Domain",
    content:
      "A neighbourhood's relative deprivation in its country based on several indicators of employment, measured as a rank " +
      "with 1 being the most deprived and larger numbers being the least deprived. England ranks 32,844 LSOAs, Wales 1,909 LSOAs, " +
      "Scotland 6,976 Data Zones, and Northern Ireland 890 SOAs.",
    source:
      "English Indices of Multiple Deprivation (2019), Scottish Index of Multiple Deprivation (2020), Northern Ireland Multiple " +
      "Deprivation Measures (2017), Welsh Index of Multiple Deprivation 2019. For England and Wales, 2019 IMD ranks were mapped from the " +
      "2011 LSOA boundaries to the 2021 boundaries. If two 2011 LSOAs merged into one 2021 LSOA, the mean rank was assigned. If a 2011 LSOA " +
      "was split, its rank was assigned to both new LSOAs. The few cases where there were no equivalents were dropped.",
  },
  {
    category: "Demographic measures",
    title: "Indices of Multiple Deprivation - Income Domain",
    content:
      "A neighbourhood's relative deprivation in its country based on several indicators of income, measured as a rank " +
      "with 1 being the most deprived and larger numbers being the least deprived. England ranks 32,844 LSOAs, Wales 1,909 LSOAs, " +
      "Scotland 6,976 Data Zones, and Northern Ireland 890 SOAs.",
    source:
      "English Indices of Multiple Deprivation (2019), Scottish Index of Multiple Deprivation (2020), Northern Ireland Multiple " +
      "Deprivation Measures (2017), Welsh Index of Multiple Deprivation 2019. For England and Wales, 2019 IMD ranks were mapped from the " +
      "2011 LSOA boundaries to the 2021 boundaries. If two 2011 LSOAs merged into one 2021 LSOA, the mean rank was assigned. If a 2011 LSOA " +
      "was split, its rank was assigned to both new LSOAs. The few cases where there were no equivalents were dropped.",
  },
  {
    category: "Demographic measures",
    title: "Older people (65+)",
    content:
      "Percentage of adults, ages 65 and older.\n\nData Sources: England and Wales Census 2021, Northern Ireland Census 2011, Scotland Census 2011",
  },
  {
    category: "Demographic measures",
    title: "People from minoritised ethnic groups",
    content:
      "The proportion of the population identifying with Census-defined minoritised ethnic groups. Available as a Supplementary Layer, this " +
      "dataset may be locally important when considering how to increase Tree Equity and where to target action for increasing tree cover.\n\nData Sources: 2021 Census of England and Wales, Northern Ireland Census 2011, Scotland Census 2011",
  },
  {
    category: "Tree canopy benefits",
    title: "Ecosystem services",
    content:
      "Ecosystem services are beneficial contributions that trees provide to the environment, the economy, and human well-being, " +
      "health, and safety. Key ecosystem services provided by urban trees include carbon sequestration, air quality improvement, water " +
      "regulation, temperature regulation, biodiversity support, nutrient cycling, and aesthetic and cultural value. Urban trees are " +
      "infrastructure - they play a crucial role in making communities more inclusive, safe, resilient and sustainable.",
  },
  {
    category: "Tree canopy benefits",
    title: "Annual ecosystem service value",
    content:
      "Total annual economic benefit (monetary value) for all of the ecosystem services, including all carbon sequestration, air " +
      "pollutant removal, and stormwater absorption provided by trees.\n\nData Source: iTree Landscape",
  },
  {
    category: "Tree canopy benefits",
    title: "Carbon sequestration",
    content:
      "The atmospheric carbon dioxide captured and stored by trees, measured in annual tonnes.\n\nData Source: iTree Landscape",
  },
  {
    category: "Tree canopy benefits",
    title: "Nitrogen dioxide absorption",
    content:
      "Annual tonnes of nitrogen dioxide absorption by trees. Nitrogen dioxide is an air pollutant that can irritate airways in the " +
      "human respiratory system and cause respiratory symptoms.\n\nData Source: iTree Landscape",
  },
  {
    category: "Tree canopy benefits",
    title: "PM2.5 absorption",
    content:
      "Annual tonnes of absorption of particulate matter less than 2.5 microns in size by trees. PM2.5 is a smaller size class of " +
      "airborne microscopic particles that can cause serious health problems.\n\nData Source: iTree Landscape",
  },
  {
    category: "Tree canopy benefits",
    title: "Stormwater runoff prevented",
    content:
      "Annual litres of reduced stormwater surface runoff (and associated pollutants) that would be absorbed by trees and no longer " +
      "require management.\n\nData Source: iTree Landscape",
  },
  {
    category: "Tree canopy benefits",
    title: "Sulphur dioxide absorption",
    content:
      "Annual tonnes of sulphur dioxide absorption by trees. Sulphur dioxide is a toxic gas that can harm the human respiratory system " +
      "and affect lung function.\n\nData Source: iTree Landscape",
  },
  {
    category: "Climate & public health",
    title: "Air pollution index",
    content:
      "The air pollution index is a combined measure of annual emissions of PM2.5 and NO&#8322; concentrations in micrograms per cubic metre, " +
      "normalized independently by country, then averaged.\n\nData Source: Department for Environment, Food & Rural Affairs - Emissions of air pollutants",
  },
  {
    category: "Climate & public health",
    title: "Heat disparity",
    content:
      "In urban areas, compares average neighbourhood heat extremity with the local authority average to measure variance in heat " +
      "severity across neighbourhoods.\n\nData Source: USGS Earth Explorer - Landsat 8 Collection 2 Level 2 Surface Temperature 2020-2023",
  },
  {
    category: "Climate & public health",
    title: "Heat extremity",
    content:
      "Surface temperature is a good estimate of where excess heat is generated in urban areas. Heat extremity is a measure of urban " +
      "heat severity, based on the highest extremities of 2020-2023 summer surface temperatures averaged by neighbourhood.\n\nData Source: USGS Earth Explorer - Landsat 8 Collection 2 Level 2 Surface Temperature 2020-2023",
  },
  {
    category: "Climate & public health",
    title: "Indices of Multiple Deprivation - Health Domain",
    content:
      "A neighbourhood's relative deprivation in its country based on several indicators of poor health, measured as a rank with 1 " +
      "being the most deprived and larger numbers being the least deprived. England ranks 32,844 LSOAs, Wales 1,909 LSOAs, Scotland 6,976 Data " +
      "Zones, and Northern Ireland 890 SOAs.",
    source:
      "English Indices of Multiple Deprivation (2019), Scottish Index of Multiple Deprivation (2020), Northern Ireland Multiple Deprivation " +
      "Measures (2017), Welsh Index of Multiple Deprivation 2019. For England and Wales, 2019 IMD ranks were mapped from the 2011 LSOA boundaries to " +
      "the 2021 boundaries. If two 2011 LSOAs merged into one 2021 LSOA, the mean rank was assigned. If a 2011 LSOA was split, its rank was assigned to " +
      "both new LSOAs. The few cases where there were no equivalents were dropped.",
  },
  {
    category: "Climate & public health",
    title: "Air pollution: NO2 Index",
    content:
      "Annual emissions of nitrogen dioxide (NO&#8322;) concentrations in the air measured in micrograms per cubic metre, scaled from 0 to " +
      "1 by country. Nitrogen dioxide is an air pollutant, the most prominent source coming from the burning of fossil fuels. Breathing air with a " +
      "high concentration of NO&#8322; can irritate airways in the human respiratory system. Exposures over short periods can aggravate respiratory diseases, " +
      "particularly asthma, leading to respiratory symptoms (such as coughing, wheezing or difficulty breathing), hospital admissions and visits to accident " +
      "& emergency. Longer exposures to elevated concentrations of NO&#8322; may contribute to the development of asthma and potentially increase susceptibility to " +
      "respiratory infections. People with asthma, as well as children and the elderly are generally at greater risk for the health effects of NO&#8322;.\n\nData Source: Department for Environment, Food & Rural Affairs - Emissions of air pollutants",
  },
  {
    category: "Climate & public health",
    title: "Air pollution: PM2.5 Index",
    content:
      "Annual emissions of PM2.5 concentrations in the air measured in micrograms per cubic metre, scaled from 0 to 1 by country. " +
      "Defined as particulate matter less than 2.5 microns in size, PM2.5 is a smaller size class of airborne microscopic particles that can be " +
      "inhaled and deposit in the lungs and even enter the bloodstream, potentially causing serious health problems.\n\nData Source: Department for Environment, Food & Rural Affairs - Emissions of air pollutants",
  },
  {
    category: "Other",
    title: "Peat",
    content:
      "The UK has nearly three million hectares of peatland habitat and is one of the world's top ten countries for peatland area. Peat " +
      "soils store 3.2 billion tonnes of carbon and can support a range of unique open and wooded habitats and wildlife. Trees on peaty soils can " +
      "result in net ecosystem carbon loss through a range of soil-plant-atmosphere interactions such as drying out of peat and oxidation of " +
      "organic matter. In northern England, Northern Ireland and Scotland, peatland habitats occur both in remote areas and near major population " +
      "centres covered by UK Tree Equity Score. Available as a Base Layer, the peat layer can assist users to avoid targeting areas of peatland for " +
      "tree planting efforts.\n\nData Sources:\n\nBritish Geological Survey, Cranfield University (NSRI), and Ordnance Survey. 2021. Moorland Deep Peat AP Status. Natural England Open Data.\n\nWelsh Government. 2022. Peatlands of Wales Maps. DataMapWales.\n\nScottish Natural Heritage. 2016. Carbon And Peatland 2016 map. NatureScor Maps.\n\nCruickshank, M.M. & Tomlinson, R.W. 1988. Northern Ireland Peatland Survey. Department of the Environment for Northern Ireland (Countryside and Wildlife Branch). Belfast.",
  },
]

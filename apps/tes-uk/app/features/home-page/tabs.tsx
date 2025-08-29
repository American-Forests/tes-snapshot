import { Accordion, AccordionItem, AccordionItemType, AccordionWithChildren } from "ui"
import { MouseEvent, useCallback, useState } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { getAssetUrl } from "app/constants"
import {
  TAB_LIST,
  dataGlossaryCategories,
  dataGlossaryContent,
  STYLES,
} from "app/features/home-page/home-page.constants"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

const Tab = ({
  label,
  handleClick,
  isSelected,
}: {
  label: string
  handleClick: (event: MouseEvent) => void
  isSelected: boolean
}) => (
  <div className="relative">
    <button
      onClick={handleClick}
      className={`relative font-bold uppercase tracking-wider h-12 md:px-4 px-2 lg:text-base sm:text-sm text-xs  ${
        isSelected ? "bg-uk-green text-white" : "bg-transparent"
      }`}
    >
      {label}
    </button>
    {isSelected && (
      <div className="absolute bg-uk-green h-12 w-full bottom-triangle -bottom-[calc(3rem-1px)]" />
    )}
  </div>
)

const Methods = () => (
  <AccordionWithChildren className="border-b-2 border-uk-green lg:text-base text-sm">
    <AccordionItem
      title="Tree Equity Score UK"
      variant="primary"
      className="text-black font-semibold lg:text-title text-xl py-5 text-left leading-tight"
    >
      <p className="pl-4 pb-4 pt-2">
        Tree Equity Score measures how well the benefits of trees are reaching communities living on
        low incomes and others disproportionately impacted by extreme heat, pollution and other
        environmental hazards.
      </p>
      <ul className="list-disc pl-16">
        <li className="pb-2">
          Tree Equity Score UK is a nationwide score that highlights inequitable access to trees.
        </li>
        <li className="pb-2">
          The score is calculated at the neighbourhood level (Lower Super Output Areas in England
          and Wales, Super Output Areas in Northern Ireland, and Data Zones in Scotland).
        </li>
        <li className="pb-2">
          The score ranges from 0 to 100. The lower the score, the greater priority for tree
          planting. A score of 100 means the neighbourhood has enough trees.
        </li>
        <li className="pb-8">Tree Equity Score UK covers 34,875 urban neighbourhoods in the UK.</li>
      </ul>
      <div>
        <img
          alt="This is a diagram of the Tree Equity Score math, where Tree Equity Score equals tree canopy need multiplied by priority. Tree canopy need is calculated as the tree canopy goal minus existing canopy. The tree canopy goal is a baseline target of 30% multiplied by a population density adjustment factor. Priority is measured by an index comprised of income, employment, health, age, heat severity, and air pollution."
          loading="lazy"
          src={getAssetUrl("tes-uk-math.png")}
          className="mb-8 lg:w-4/5 w-full m-auto"
        />
      </div>
    </AccordionItem>
    <AccordionItem
      title="Priority Index"
      variant="primary"
      className="text-black font-semibold lg:text-title text-xl border-t-2 border-uk-green py-5 text-left leading-tight"
    >
      <p className="pl-4 pb-6 pt-2">
        The Priority Index helps prioritise the need for planting to achieve Tree Equity based on
        six equally weighted climate, health and socioeconomic variables that are integrated into
        Tree Equity Score UK. The higher the priority index, the higher the measures of social
        deprivation and/or risk relative to environmental hazards that could be reduced with
        benefits of trees.
      </p>
      <div className="mb-8">
        <AccordionWithChildren>
          <AccordionItem
            title={
              <p className="text-black text-body text-left font-bold">
                AIR QUALITY:{" "}
                <span className="text-brand-green-dark font-medium">Air pollution index</span>
              </p>
            }
            variant="secondary"
            className="border-t border-t-gray-200"
          >
            <p className="pl-4 pb-2">
              The air pollution index is a combined measure of annual emissions of PM2.5 and NO
              <sub>2</sub>&nbsp;concentrations in micrograms per cubic metre, normalized separately
              by country, then averaged.
            </p>
            <p className="pl-4 pb-6">
              <i>
                Data Source: Department for Environment, Food & Rural Affairs - Emissions of air
                pollutants.
              </i>
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-black text-body text-left font-bold">
                AGE: <span className="text-brand-green-dark font-medium">Dependency ratio</span>
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pb-2">
              Older people (age 65+) and children (0-17) as a proportion of working age adults
              (18-64).
            </p>
            <p className="pl-4 pb-6">
              <i>
                Data Sources: England and Wales Census 2021, Northern Ireland Census 2011, Scotland
                Census 2011.
              </i>
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-black text-body text-left font-bold">
                EMPLOYMENT:{" "}
                <span className="text-brand-green-dark font-medium">
                  Indices of Multiple Deprivation - Employment Domain
                </span>
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pb-2">
              {
                "A neighbourhood's relative deprivation in its country based on several indicators of employment."
              }
            </p>
            <p className="pl-4 pb-6">
              <i>
                Data Sources: English Indices of Multiple Deprivation (2019), Scottish Index of
                Multiple Deprivation (2020), Northern Ireland Multiple Deprivation Measures (2017),
                Welsh Index of Multiple Deprivation 2019.
              </i>
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-black text-body text-left font-bold">
                HEALTH:{" "}
                <span className="text-brand-green-dark font-medium">
                  Indices of Multiple Deprivation - Health Domain
                </span>
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pb-2">
              {
                "A neighbourhood's relative deprivation in its country based on several indicators of poor health."
              }
            </p>
            <p className="pl-4 pb-6">
              <i>
                Data Sources: English Indices of Multiple Deprivation (2019), Scottish Index of
                Multiple Deprivation (2020), Northern Ireland Multiple Deprivation Measures (2017),
                Welsh Index of Multiple Deprivation 2019.
              </i>
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-black text-body text-left font-bold">
                INCOME:{" "}
                <span className="text-brand-green-dark font-medium">
                  Indices of Multiple Deprivation - Income Domain
                </span>
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pb-2">
              {
                "A neighbourhood's relative deprivation in its country based on several indicators of income."
              }
            </p>
            <p className="pl-4 pb-6">
              <i>
                Data Sources: English Indices of Multiple Deprivation (2019), Scottish Index of
                Multiple Deprivation (2020), Northern Ireland Multiple Deprivation Measures (2017),
                Welsh Index of Multiple Deprivation 2019.
              </i>
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-black text-body text-left font-bold">
                HEAT SEVERITY:{" "}
                <span className="text-brand-green-dark font-medium">Heat disparity</span>
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pb-2">
              In urban areas, compares average neighbourhood heat extremity with the local authority
              average to measure variance in heat severity across neighbourhoods.
            </p>
            <p className="pl-4 pb-6">
              <i>
                Data Source: USGS Earth Explorer - Landsat 8 Collection 2 Level 2 Surface
                Temperature 2020-2023.
              </i>
            </p>
          </AccordionItem>
        </AccordionWithChildren>
      </div>
    </AccordionItem>
    <AccordionItem
      title="Tree canopy benefits"
      variant="primary"
      className="text-black font-semibold lg:text-title text-xl border-t-2 border-uk-green py-5 text-left leading-tight"
    >
      <p className="pl-4 pb-6 pt-2">
        Achieving Tree Equity in towns and cities provides numerous benefits to public health,
        water, air quality, climate and community wellbeing. The tree canopy benefits measures
        utilise region-specific multipliers from i-Tree Landscape.
      </p>
      <ol className="[counter-reset:list-number] relative">
        <li className="pb-4 pl-16 before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:mt-1 before:left-6 before:text-black before:w-6 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold">
          Calculating tree benefits requires an estimation of the number of trees derived from tree
          canopy cover. To estimate a general number of trees associated with an increase in tree
          canopy, these measures utilise a basic multiplier of 55.74m<sup>2</sup> of canopy area per
          urban tree assuming a medium-size urban tree crown width of 7.6m-9.1m.
        </li>
        <li className="pb-4 pl-16 before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:mt-1 before:left-6 before:text-black before:w-6 before:mr-2 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold">
          For each of the carbon, water and air measures, a region-specific multiplier provided by
          i-Tree is multiplied by the proposed additional canopy cover area in each neighbourhood.
          For more information on the methods used to determine these multipliers, see
          <a
            href="https://www.fs.usda.gov/research/treesearch/63636"
            className="text-brand-green-dark hover:text-brand-green"
            target="_blank"
            rel="noreferrer noopener"
          >
            {" "}
            Summary of i-Tree Programs and methods
          </a>
          .
        </li>
        <li className="pb-8 pl-16 before:inline-block [counter-increment:list-number] before:content-[counter(list-number)] before:absolute before:mt-1 before:left-6 before:text-black before:w-6 before:bg-brand-green-light before:rounded-full before:text-center before:font-extrabold">
          Carbon sequestration conversions are adapted to the UK using methods from the U.S. EPA The
          Greenhouse Gas Equivalencies calculator.
        </li>
      </ol>
    </AccordionItem>
    <AccordionItem
      title="Detailed methods"
      variant="primary"
      className="text-black font-semibold lg:text-title text-xl border-t-2 border-uk-green py-5 text-left leading-tight"
    >
      <AccordionWithChildren>
        <div>
          <div className="relative">
            <AccordionItem
              title={
                <p
                  className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['1']  ${STYLES.orderedList} before:top-[8px] before:left-4`}
                >
                  Calculate neighbourhood tree canopy goals
                </p>
              }
              variant="secondary"
              className="border-t border-t-gray-200 pb-4"
            >
              <p className="pl-4 pt-2 pb-4">
                Neighbourhood tree canopy goals estimate the percentage tree canopy required to
                deliver a minimum standard of tree cover to a neighbourhood. Goals are canopy
                targets based on a 30% baseline target then adjusted based on population density to
                reflect increased human population levels that could limit plantable area.
              </p>
              <div>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['1A'] before:left-12`}
                >
                  The baseline target of 30% canopy cover is recommended by the International Union
                  for Conservation of Nature (IUCN) and is based on the{" "}
                  <a
                    href="https://www.researchgate.net/publication/349519755_Promoting_health_and_wellbeing_through_urban_forests_-_Introducing_the_3-30-300_rule"
                    className="text-brand-green-dark hover:text-brand-green"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {" "}
                    3-30-300 rule.
                  </a>{" "}
                  This is an evidence-based rule proposed by Cecil Konijnendijk, which stipulates
                  that everyone should be able to see at least three trees from their home; there
                  should be 30% tree canopy cover in each neighbourhood; and 300 metres should be
                  the maximum distance to the nearest high-quality public green space.
                </p>
              </div>
              <div>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['1B'] before:left-12`}
                >
                  Population density was obtained using census data from England (2021), Wales
                  (2021), Northern Ireland (2011), and Scotland (2011).
                </p>
              </div>
              <div>
                <p
                  className={`pl-24 pb-2 text-black ${STYLES.orderedList} before:text-caption before:content-['1C'] before:left-12`}
                >
                  Baseline canopy targets were adjusted by applying three population density
                  adjustment factors:
                </p>
                <p className={`${STYLES.formula} mt-4 mb-6 ml-24`}>
                  GOAL = Baseline target * Population density adjustment factor
                </p>
              </div>
              <div className="hidden md:block">
                <p
                  className={`pl-24 pb-6 text-black ${STYLES.orderedList} before:text-caption before:content-['1D'] before:left-12`}
                >
                  The adjusted goals, GOAL, are shown in tree canopy (%) below:
                </p>

                <table className="text-center w-96 border-t-2 border-brand-green sm:ml-24 ml-0">
                  <thead className="border-b-2 font-medium text-xs border-brand-green">
                    <tr>
                      <th scope="col" className="px-2 py-2 bg-brand-green-light">
                        Population density (ppl/km<sup>2</sup>)
                      </th>
                      <th scope="col" className="px-2 py-2">
                        Canopy
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-semibold">
                    <tr>
                      <td className="whitespace-nowrap px-6 py-2 bg-brand-green-light">{`Very Low (<2k)`}</td>
                      <td className="whitespace-nowrap px-6 py-2">
                        36% <span className="font-light">[1.2]</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-6 py-2 bg-brand-green-light">{`Moderate (2-4k)`}</td>
                      <td className="whitespace-nowrap px-6 py-2">
                        30% <span className="font-light">[1]</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-6 py-2 bg-brand-green-light">{`High (4-8k)`}</td>
                      <td className="whitespace-nowrap px-6 py-2">
                        24% <span className="font-light">[0.8]</span>
                      </td>
                    </tr>
                    <tr className="border-b-2 border-brand-green">
                      <td className="whitespace-nowrap px-6 py-2 bg-brand-green-light">{`Very High (>8k)`}</td>
                      <td className="whitespace-nowrap px-6 py-2">
                        20% <span className="font-light">[0.67]</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs mb-8 sm:ml-24 -ml-16">
                  *Goals are in percent tree canopy. Adjustment factor in brackets.
                </p>
              </div>
            </AccordionItem>
          </div>
          <div className="relative">
            <AccordionItem
              title={
                <p
                  className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['2']  ${STYLES.orderedList} before:top-[8px] before:left-4`}
                >
                  Delineate urban areas
                </p>
              }
              variant="secondary"
              className="pb-4"
            >
              <p className="pl-4 pt-2 pb-4">
                Neighbourhood (LSOA, SOA, Data Zone) delineations in the UK often include both
                built-up settlements as well as surrounding areas that may be dominated by
                agricultural land uses or non-forested land cover such as dwarf shrub, heath and
                wetland. To calculate Tree Equity Scores and tree planting need for urban areas
                alone, LSOAs, SOAs and Data Zones were clipped to urban areas.
              </p>
              <div>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['2A'] before:left-12`}
                >
                  For England and Wales, urban LSOAs were selected if classified as urban major
                  conurbation, urban minor conurbation, urban city and town, or urban city and town
                  in a sparse setting. For Northern Ireland, urban SOAs were selected if classified
                  as urban or mixed urban/rural. For Scotland, urban Data Zones were selected if
                  classified as large urban areas or other urban areas.
                </p>
              </div>
              <div>
                <div
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['2B'] before:left-12`}
                >
                  Urban and suburban land cover classes from the NERC EDS Environmental Information
                  Data Centre Land Cover Map 2021 25-meter raster were selected, isolated clusters
                  smaller than 0.25 square kilometres discarded, and other land cover completely
                  contained by the urban/suburban boundary reclassified as urban.
                  <p className="pt-2 pb-1 text-xs">Data Sources:</p>
                  <ul className="list-disc pl-4 italic text-xs">
                    <li>
                      {"Marston, C., Rowland, C. S., O'Neil, A. W., & Morton, R. D. (2022)."}
                      <a
                        href="https://doi.org/10.5285/F3310FE1-A6EA-4CDD-B9F6-F7FC66E4652E"
                        className="text-brand-green"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {" "}
                        Land Cover Map 2021 (25m rasterised land parcels, N. Ireland){" "}
                      </a>
                      [Data set]. NERC EDS Environmental Information Data Centre.
                    </li>
                    <li>
                      {"Marston, C., Rowland, C. S., O'Neil, A. W., & Morton, R. D. (2022)."}
                      <a
                        href="https://doi.org/10.5285/A1F85307-CAD7-4E32-A445-84410EFDFA70"
                        className="text-brand-green"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {" "}
                        Land Cover Map 2021 (25m rasterised land parcels, GB){" "}
                      </a>
                      [Data set]. NERC EDS Environmental Information Data Centre.
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['2C'] before:left-12`}
                >
                  The urban LSOAs, SOAs, and Data Zones were clipped using the urban boundary.
                </p>
              </div>
              <div>
                <div
                  className={`pl-24 pb-2 text-black ${STYLES.orderedList} before:text-caption before:content-['2D'] before:left-12`}
                >
                  Any areas classified as peat were eliminated.
                  <p className="pt-2 pb-1 text-xs">Data Sources:</p>
                  <ul className="list-disc pl-4 italic text-xs">
                    <li>
                      British Geological Survey, Cranfield University (NSRI), and Ordnance Survey.
                      2021. Moorland Deep Peat AP Status. Natural England Open Data.
                    </li>
                    <li>Welsh Government. 2022 Peatlands of Wales Maps. DataMapWales.</li>
                    <li>
                      Scottish Natural Heritage. 2016. Carbon And Peatland 2016 map. NatureScor
                      Maps.
                    </li>
                    <li className="pb-4">
                      Cruickshank, M.M. & Tomlinson, R.W. 1988. Northern Ireland Peatland Survey.
                      Department of the Environment for Northern Ireland (Countryside and Wildlife
                      Branch). Belfast.
                    </li>
                  </ul>
                </div>
              </div>
            </AccordionItem>
            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['3']  ${STYLES.orderedList} before:top-[8px] before:left-4`}
                  >
                    Calculate existing tree canopy cover
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p
                  className={`pl-24 pb-4 pt-2 text-black ${STYLES.orderedList} before:text-caption before:content-['3A'] before:left-12`}
                >
                  Tree canopy cover, AREA<sub>trees</sub>, is derived from pre-aggregated Google
                  high-resolution tree canopy sourced from Google Environmental Insights Explorer
                  (34,349 LSOAs). Imagery for tree canopy data was not available for parts of
                  Scotland (left), Northern Ireland (middle) and Wales (right) for a total of 526
                  LSOAs due to weather conditions affecting satellite imagery (mapped below in the
                  darker green). The Woodland Trust used iTree Landscape to manually estimate tree
                  canopy for all of the missing LSOAs.
                </p>
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/scotland.jpg`}
                  className="ml-24 inline h-64 w-64 border border-gray-200"
                ></img>
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/northireld.jpg`}
                  className="ml-2 inline h-64 w-64 border border-gray-200"
                ></img>
                <img
                  src={`${STATIC_ASSETS_CLOUDFRONT_URL}/wales.jpg`}
                  className="ml-2 inline h-64 w-64 border border-gray-200"
                ></img>
                <p
                  className={`pl-24 pb-4 pt-2 text-black ${STYLES.orderedList} before:text-caption before:content-['3B'] before:left-12`}
                >
                  {" "}
                  Tree canopy cover percent is calculated as follows, where:
                </p>
                <ul className="list-disc pl-32">
                  <li className="pb-4">
                    AREA<sub>land</sub> is the land area of the neighbourhood, not including water
                    area.
                  </li>
                </ul>

                <p className={`${STYLES.formula} mb-8 ml-24`}>
                  TREE CANOPY COVER % = AREA<sub>trees</sub> / AREA<sub>land</sub> * 100
                </p>
              </AccordionItem>
            </div>
            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['4']  ${STYLES.orderedList} before:top-[8px] before:left-4`}
                  >
                    Calculate tree canopy cover gap
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p className="pl-4 pt-2 pb-4">
                  Compute the percent area of a neighbourhood that could be planted to reach its
                  tree canopy goal.
                </p>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['4A'] before:left-12`}
                >
                  The neighbourhood tree canopy gap, GAP, is calculated by subtracting the percent
                  existing neighbourhood canopy, EC, from the density adjusted tree canopy goal,
                  GOAL (%):
                </p>
                <p className={`${STYLES.formula} mb-8 ml-24`}>GAP = GOAL - EC</p>
              </AccordionItem>
            </div>
            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['5']  ${STYLES.orderedList} before:top-[8px] before:left-4`}
                  >
                    Calculate heat extremity and heat disparity
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p className="pl-4 pt-2 pb-4">
                  Surface temperature is a good estimate of where excess heat is generated in urban
                  areas.
                </p>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['5A'] before:left-12`}
                >
                  {
                    " All Landsat 8 Collection 2 Level 2 Surface Temperature scenes from the summers of 2020-2023 that intersect urban areas were compiled. Scenes were filtered using Landsat's Quality Assessment Raster to remove pixels that were clouds, cloud shadows, and water."
                  }
                </p>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['5B'] before:left-12`}
                >
                  All scenes that fell within the same path and row in the Worldwide Reference
                  System were merged and the maximum temperature value for each pixel selected.
                  Maximum pixel values were extracted to represent the highest extremities of
                  surface heat for all urban areas in the UK.
                </p>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['5C'] before:left-12`}
                >
                  Neighbourhood (urban areas alone) and local authority averages were calculated
                  from the heat extremity dataset, excluding water area. If not enough data were
                  available for a neighbourhood, the neighbourhood was set to the local authority
                  average.
                </p>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['5D'] before:left-12`}
                >
                  For each neighbourhood, the difference from the local authority average measures
                  how much each neighbourhood fell above or below the local authority average. This
                  produces a measure of heat disparity, TEMP<sub>diff</sub>, where:
                </p>
                <ul className="list-disc pl-28">
                  <li className="pb-4">
                    TEMP<sub>n,ave</sub>{" "}
                    {
                      "is the neighbourhood's urban area average of all maximum pixel values for summer surface temperature"
                    }
                  </li>
                  <li className="pb-4">
                    TEMP<sub>la,ave</sub> is the local authority average of all maximum pixel values
                    for summer surface temperature
                  </li>
                  <p className={`${STYLES.formula} mb-4`}>
                    TEMP<sub>diff</sub> = TEMP<sub>n,ave</sub> - TEMP<sub>la,ave</sub>
                  </p>
                  <li className="pb-6">
                    Positive values indicate hotter than average neighbourhoods, and negative values
                    indicate cooler than average neighbourhoods. Neighbourhoods set to the local
                    authority average due to lack of data result in a heat disparity value of zero.
                  </li>
                </ul>
              </AccordionItem>
            </div>
            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['6']  ${STYLES.orderedList} before:top-[8px] before:left-4`}
                  >
                    Calculate the Priority Index
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p className="pl-4 pt-2 pb-4">
                  The Priority Index helps prioritise the need for planting to achieve Tree Equity
                  based on climate, health and socio-economic variables.
                </p>
                <p
                  className={`pl-24 pb-2 text-black ${STYLES.orderedList} before:text-caption before:content-['6A'] before:left-12`}
                >
                  The index comprises six equally weighted indicators:
                </p>
                <ul className="list-disc pl-28">
                  <li className="pb-2">
                    <span className="font-semibold">Air pollution index:</span> The concentration of
                    NO2 and PM2.5 pollution from annual 2021 emissions, normalised independently by
                    country then averaged.
                  </li>
                  <li className="pb-2">
                    <span className="font-semibold">Age:</span> Ratio of older people (age 65+) and
                    children (0-17) as a proportion of working age adults (18-64).
                  </li>
                  <li className="pb-2">
                    <span className="font-semibold">Employment:</span>{" "}
                    {
                      "A neighbourhood's relative deprivation in its country based on several indicators of employment."
                    }
                  </li>
                  <li className="pb-2">
                    <span className="font-semibold">Health:</span>{" "}
                    {
                      "A neighbourhood's relative deprivation in its country based on several indicators of health."
                    }
                  </li>
                  <li className="pb-2">
                    <span className="font-semibold">Income:</span>{" "}
                    {
                      "A neighbourhood's relative deprivation in its country based on several indicators of income."
                    }
                  </li>
                  <li className="pb-4">
                    <span className="font-semibold">Heat disparity:</span> Compares average
                    neighbourhood heat extremity with the local authority average to measure
                    variance in heat severity across neighbourhoods.
                  </li>
                </ul>
                <p
                  className={`pl-24 pb-2 text-black ${STYLES.orderedList} before:text-caption before:content-['6B'] before:left-12`}
                >
                  The indices, N, are normalised as follows, where for each indicator, N<sub>i</sub>
                  :
                </p>
                <ul className="list-disc pl-28">
                  <li className="pb-2">
                    x<sub>i</sub> is the value for that neighbourhood for that indicator, i;
                  </li>
                  <li className="pb-2">
                    x<sub>i,max</sub> is the maximum value for that indicator across each country,
                    i; and
                  </li>
                  <li className="pb-4">
                    x<sub>i,min</sub> is the minimum value for that indicator across each country,
                    i.
                  </li>
                </ul>
                <p className={`${STYLES.formula} mb-6 ml-24`}>
                  N<sub>i</sub> = (x<sub>i</sub> - x<sub>i,min</sub>) / (x<sub>i,max</sub> - x
                  <sub>i,min</sub>)
                </p>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['6C'] before:left-12`}
                >
                  The indices are then combined to create a simple Priority Index from 0.1 to 1,
                  where 1 indicates greater priority. The Priority Index, E, is calculated as
                  follows, where N<sub>i</sub> refers to each indicator value:
                </p>
                <p className={`${STYLES.formula} mb-8 ml-24`}>
                  E = 0.1 + (1 - 0.1) * (N<sub>1</sub> + N<sub>2</sub> + N<sub>3</sub> + N
                  <sub>4</sub> + N<sub>5</sub> + N<sub>6</sub>) / 6
                </p>
              </AccordionItem>
            </div>
            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['7']  ${STYLES.orderedList} before:top-[8px] before:left-4`}
                  >
                    Calculate Tree Equity Scores
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p className="pl-4 pt-2 pb-4">
                  Tree Equity Scores range from 0 to 100. A lower Tree Equity Score indicates a
                  greater priority for tree planting and protection. A score of 100 means the
                  neighbourhood meets or surpasses the canopy goal for that neighbourhood.
                </p>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['7A'] before:left-12`}
                >
                  The canopy gap is normalised to a score from 0-100 for each country as follows,
                  where:
                </p>
                <ul className="list-disc pl-28">
                  <li className="pb-2">
                    GAP<sub>max</sub> is the maximum GAP value for that indicator across each
                    country
                  </li>
                  <li className="pb-2">
                    If the GAP is negative (i.e., existing canopy is greater than the neighbourhood
                    goal), it is adjusted to 0 before normalising to calculate Gap<sub>score</sub>.
                  </li>
                  <li className="pb-4">
                    If Gap<sub>max</sub> = 0, then Gap<sub>score</sub> is set to 0 as well.
                  </li>
                </ul>
                <p className={`${STYLES.formula} mb-6 ml-24`}>
                  GAP<sub>score</sub> = GAP / GAP<sub>max</sub>
                </p>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['7B'] before:left-12`}
                >
                  Tree Equity Score, TES, is calculated by multiplying the Gap<sub>score</sub> by
                  the Priority Index, E:
                </p>
                <p className={`${STYLES.formula} mb-8 ml-24`}>
                  TES = 100 (1 - Gap<sub>score</sub> * E)
                </p>
              </AccordionItem>
            </div>
            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['8']  ${STYLES.orderedList} before:top-[8px] before:left-4`}
                  >
                    Calculate composite scores (for local authorities)
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p className="pl-4 pt-2 pb-4">
                  {
                    "Composite scores provide an overall assessment of Tree Equity in a local authority. A local authority's score depends on (1) the average of Tree Equity Scores in neighbourhoods scoring below 100, and (2) the Priority Index of neighbourhoods that already score 100. For neighbourhoods scoring 100, the higher the priority of the neighbourhood, the higher the composite score&#8212;an indicator that Tree Equity has been achieved in areas with greater need. Local authorities can raise their composite score faster by working first in areas with low scores and greater need."
                  }
                </p>
                <p
                  className={`pl-24 pb-4 text-black ${STYLES.orderedList} before:text-caption before:content-['8A'] before:left-12`}
                >
                  Compute composite scores, where:
                </p>
                <ul className="list-disc pl-28">
                  <li className="pb-2">
                    TES<sub>&lt;100</sub> is a Tree Equity Score below 100.
                  </li>
                  <li className="pb-4">
                    E<sub>100</sub> is a priority index for a Tree Equity Score of 100.
                  </li>
                </ul>
                <p className={`${STYLES.formula} mb-8 ml-24`}>
                  Composite Score = (Sum(TES<sub>&lt;100</sub>) + (Sum(E<sub>100</sub>) * 100)) / (#
                  of TES<sub>&lt;100</sub> + SUM(E<sub>100</sub>))
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </AccordionWithChildren>
    </AccordionItem>
  </AccordionWithChildren>
)

const DataGlossary = () => {
  const items: AccordionItemType[] = dataGlossaryCategories.map((category) => ({
    title: (
      <p className="text-black lg:text-title text-xl leading-tight font-semibold text-left">
        {category}
      </p>
    ),
    type: "accordion",
    nestedAccordionContent: dataGlossaryContent
      .filter((item) => item.category === category)
      .map((item) => ({
        ...item,
        title: (
          <p className="text-brand-green-dark text-body font-medium text-left pr-4">{item.title}</p>
        ),
      })),
  }))

  return <Accordion items={items} variant="primary" className="border-b-2 border-uk-green py-5" />
}

const MoreInfo = () => (
  <AccordionWithChildren className="border-b-2 border-uk-green lg:text-base text-sm">
    <AccordionItem
      title="Frequently Asked Questions"
      variant="primary"
      className="text-black font-semibold lg:text-title text-xl py-5 text-left leading-tight"
    >
      <div>
        <AccordionWithChildren className="border-t border-gray-300">
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                What is Tree Equity Score UK?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pb-2 pt-2">
              Tree Equity Score UK is a UK-wide score that highlights inequitable access to trees.
              It measures how well the benefits of trees are reaching communities living on
              low-incomes and others disproportionately impacted by extreme heat, pollution and
              other environmental hazards.
            </p>
            <p className="pl-4 pb-6">
              The score is calculated at the neighbourhood level (Lower Super Output Areas in
              England and Wales, Super Output Areas in Northern Ireland, and Data Zones in
              Scotland). The score ranges from 0 to 100. The lower the score, the greater priority
              for tree planting. A score of 100 means the neighbourhood has enough trees. Tree
              Equity Score UK covers most urban neighbourhoods in the UK.
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                Why is Tree Equity important?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pb-4 pt-2">
              Trees provide more than beauty or a comfortable place to relax. Like schools, streets
              and sewage pipes, trees are essential infrastructure. They are vital to public health,
              well-being and climate resilience in our communities.
            </p>
            <ul className="list-disc pl-16">
              <li className="pb-2">
                The ability of trees to reduce peak temperatures is significant, given increasing
                the average level of tree cover in European cities (including in the UK) to 30%
                could reduce heat-related deaths by up to 40%.
              </li>
              <li className="pb-2">
                Air pollution is estimated to cause{" "}
                <a
                  href="https://www.bbc.com/news/health-35629034"
                  className="text-brand-green-dark hover:text-brand-green"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {" "}
                  40,000 deaths
                </a>{" "}
                annually in the UK. A study in the West Midlands suggests that doubling tree cover
                across the region would reduce the concentration of fine PM10 particles by 25%. This
                could prevent 140 air pollution related premature deaths in the region every year.
              </li>
              <li className="pb-4">
                Trees are a source of income—such as jobs related to tree care and maintenance and
                making products out of reclaimed wood.
              </li>
            </ul>
            <p className="pl-4 pb-6">
              {
                "The inequitable distribution of trees exacerbates social inequities. A map of tree cover is too often the inverse of a map of income&#8212;especially in urban areas, where 80% of the UK population live. That's because trees often are sparse in low-income neighbourhoods. This is a result of systemic inequities that have been underway for centuries."
              }
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                Why was Tree Equity Score developed?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2">
              Tree Equity Score was developed and launched by American Forests for the US in 2021.
              Systemic racism, institutional barriers and inadequate policies have led to
              environmental inequities in urban communities across the US, including disparities in
              access to the benefits of trees. American Forests developed Tree Equity Score to help
              address these disparities. Simply put, Tree Equity is about filling gaps in tree cover
              so that urban communities have the essential green infrastructure to support public
              health, well-being and climate resilience. Tree Equity Score can be used by urban
              foresters, planners, council and community leaders, environmental justice advocates,
              community organisations, conservation organisations and many others to help make the
              case for more investment in neighbourhoods with the greatest need for trees, jobs and
              protection from the effects of climate change.
            </p>
            <p className="pl-4 pt-2">
              Woodland Trust partnered with American Forests and the Centre for Sustainable
              Healthcare to bring Tree Equity Score to the UK and help address inequities in canopy
              cover across England, Wales, Northern Ireland and Scotland. What makes Tree Equity
              Score unique is that it establishes an equity-first standard to guide investment in
              urban tree infrastructure, starting with neighbourhoods with the greatest need. Tree
              Equity Score provides urban communities with the information and data to get trees to
              those who need them the most.
            </p>
            <p className="pl-4 pt-2">
              Average urban tree cover in the UK is around 17%&#8212;below governmental targets and
              well below the European average (28%). Multiple studies have also shown that urban
              tree cover in the UK is not equitably distributed. The situation is summarised by Dr
              Mark Johnston who has studied the history of urban trees in the UK. He says: “Today in
              Britain, and similarly in the US and elsewhere, street tree cover generally reflects
              the economic and social status of residents. In more depressed areas of town there is
              far less tree coverage. This is a recurring theme…the distribution of street trees
              reflecting the social and economic status of a particular location.”
            </p>
            <p className="pl-4 pt-2 pb-6">
              {
                "The government's health advisors in England, Public Health England, have summarised the evidence for links between urban green space and health. They say: “Disadvantaged groups appear to gain a larger health benefit and have reduced socioeconomic-related inequalities in health when living in greener communities, so greenspace and a greener urban environment can also be used as an important tool in the drive to build a fairer society.”"
              }
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                What is a good Tree Equity Score?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2">
              Tree Equity Score scores all UK urban neighbourhoods from 0 to 100. A score of 100
              means that a neighbourhood has adequate tree cover. Any score below 100 has a tree
              canopy need. The lower the score, the greater the need for investment in trees. Start
              by prioritising the neighbourhoods with the greatest need (i.e., lower scores) in your
              community in order to fit within your local budgeting needs and project objectives.
            </p>
            <p className="pl-4 pt-2 pb-6">
              As a broad decision aid, you can refer to Tree Equity Score priority levels, which
              have been defined to help you interpret your Tree Equity Scores: Highest (0-69), High
              (70-79), Moderate (80-89), Low (90-99), None (100). You may choose to adjust the
              prioritisation in your community based on your unique range of Tree Equity Scores in
              your local authority and other relevant local information.
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                Is Tree Equity Score UK different for each country?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2 pb-6">
              {
                "Tree Equity Score UK uses a consistent methodology with the same indicators in England, Northern Ireland, Scotland and Wales, but uses data from each country's Indices of Multiple Deprivation. This means that scores should be compared within countries (e.g., Cardiff, Wales and Caerphilly, Wales) but not between countries e.g., Glasgow, Scotland and Gloucester, England)."
              }
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                Why is there no data available for my area?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2">
              Tree Equity Score is a measure of tree canopy need for urban areas. The score covers
              government-defined urban classifications for LSOAs, SOAs, and Data Zones in the UK. If
              your community falls outside of this definition of urban areas, it is not covered by
              Tree Equity Score.
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                Where does the tree canopy data come from?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2 pb-6">
              Tree canopy data is donated by Google and sourced from the Google Environmental
              Insights Explorer, in the form of high-resolution tree canopy aggregated at the
              neighbourhood level (Lower Super Output Areas in England and Wales, Super Output Areas
              in Northern Ireland, and Data Zones in Scotland).
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                How were the priority indicators selected?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2 pb-6">
              Tree Equity Score UK uses six equally weighted climate, health and socioeconomic
              indicators to prioritise areas for investment in trees. These are: air quality, heat
              severity, health, income, employment and age. The primary purpose of the indicators is
              to measure either social deprivation or risk relative to environmental hazards that
              could be reduced with benefits of trees. The principles for the indicators are that
              they need to: (1) be a recognised measure of social deprivation and/or quality of life
              and able to be used by policymakers, (2) relate to a scientifically established
              benefit that trees provide, for example, shade, and/or (3) relate to a scientifically
              established indicator for levels of tree cover.
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                {" What's the value of having a tree canopy goal?"}
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2">
              Tree Equity Score relies on a baseline neighbourhood tree canopy goal considered
              appropriate to local urban ecologies. The canopy goal represents a minimum percentage
              of tree canopy required to deliver the requisite benefits of trees to a neighborhood.
              In the UK 30% is set as the canopy goal for all urban areas. This is adjusted for
              population density, to reflect increased human population levels that could limit
              plantable area. The goal provides a baseline for comparing neighbourhoods to help
              determine where there is a greater need to invest in planting trees. Current canopy
              cover can be tracked as a measure of progress towards the canopy goal.
            </p>
            <p className="pl-4 pt-2">
              A baseline UK canopy cover goal of 30% was selected in consultation with experts in
              the UK. It is based on evidence and the experience of professionals working in urban
              forestry. It aims to be aspirational and achievable in the long-term. 30% canopy cover
              is recommended by the International Union for the Conservation of Nature (IUCN) based
              on the{" "}
              <a
                href="https://www.researchgate.net/publication/349519755_Promoting_health_and_wellbeing_through_urban_forests_-_Introducing_the_3-30-300_rule"
                className="text-brand-green-dark hover:text-brand-green"
                target="_blank"
                rel="noreferrer noopener"
              >
                {" "}
                3-30-300 rule
              </a>{" "}
              which includes a target of 30% canopy cover at neighbourhood level.
            </p>
            <p className="pl-4 pt-2 pb-6">
              Tree canopy goals represent a minimum standard of tree cover for all neighbourhoods
              that is considered appropriate to local urban ecologies and are not based on goals set
              by cities. It is possible for neighbourhoods to exceed the baseline canopy
              goal&#8212;neighbourhoods with canopy cover that meets or surpasses their tree canopy
              goal are assigned a Tree Equity Score of 100.
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                How often is the data updated?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2 pb-6">
              Updated will be considered as new tree canopy, new Census data and/or Indices of
              Multiple Deprivation become available.
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                How is plantable area accounted for?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2">
              In the calculation of Tree Equity Score, plantable area is reflected in the tree
              canopy gap value, where:
            </p>
            <p className={`${STYLES.formula} mt-4 ml-4`}>gap = goal - existing tree cover</p>
            <p className="pl-4 pt-4 pb-6">
              The tree canopy gap represents the available space for planting trees. Plantable area
              is incorporated in the tree canopy gap value by proxy in two ways. First, existing
              tree cover is a percentage of total neighbourhood urban area (water, peatland and
              farmland removed). Second, the neighbourhood tree canopy goal is designed to reflect
              the total area that could potentially be planted in a neighbourhood. Tree canopy goals
              are further adjusted based on population density to reflect increased human population
              levels that could limit plantable area.
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                Why is Census data on minoritised ethnicity groups included as a supplemental
                dataset?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2">
              {
                "While there is significant amount of data available on race, ethnicity and urban tree cover for the US, these relationships are under-researched in the UK context—just one unpublished source was found in the Woodland Trust's review. The Woodland Trust is actively commissioning research on the topic. Tree Equity Score UK includes this dataset as a supplementary layer, recognizing that this dataset can be locally important when considering how to increase Tree Equity and where to target action for increasing tree cover."
              }
            </p>
            <p className="pl-4 pt-2 pb-6">
              In the UK, the context for increasing tree cover in relation to race and ethnicity is
              to bring health parity as an issue of environmental justice. People of colour are
              disproportionately impacted by city stressors like air pollution, noise pollution,
              deficiency of access to nature, the urban heat island effect and the impacts of
              climate change.
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                Why is peatland included as an additional dataset?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2">
              {
                "The UK has nearly three million hectares of peatlands and is one of the world's top ten countries for peatland area. Peat soils store 3.2 billion tonnes of carbon and can support a range of unique open and wooded habitats and wildlife. Trees on peat soils can result in net ecosystem carbon loss through a range of soil-plant-atmosphere interactions such as drying out of peat and oxidation of organic matter."
              }
            </p>
            <p className="pl-4 pt-2 pb-6">
              In northern England, Northern Ireland and Scotland peatland habitats exist at the
              edges of urban areas covered by Tree Equity Score. Priority peatland habitats in each
              UK country are excluded from the calculations of available land area associated with
              tree canopy goals, and are also included on the Tree Equity Score map to ensure that
              users of the score do not inappropriately target areas of peatland for tree planting
              efforts.
            </p>
          </AccordionItem>
          <AccordionItem
            title={
              <p className="text-brand-green-dark font-medium lg:text-base text-sm leading-tight text-left">
                If the score in my area increases will this lead to gentrification or displacement?
              </p>
            }
            variant="secondary"
          >
            <p className="pl-4 pt-2">
              There is a belief that planting trees in neighbourhoods can cause gentrification (the
              influx of more affluent residents and businesses to a neighbourhood) and displacement
              (when long-term residents move away when the cost of living&#8212;including rent and
              mortgage&#8212;becomes too high). There are studies noting correlations between tree
              planting and gentrification; however, no causal link has been established. In their
              2021 study,{" "}
              <a
                href="https://www.sciencedirect.com/science/article/abs/pii/S0264837721003008"
                className="text-brand-green-dark hover:text-brand-green"
                target="_blank"
                rel="noreferrer noopener"
              >
                Sharifi et al.
              </a>{" "}
              conclusively found no statistical evidence that urban greening causes gentrification.
              It was the other way around&#8212;gentrification leads to greening. In other words,
              greening tends to happen in already gentrifying areas.
            </p>
            <p className="pl-4 pt-2">
              Planting trees in underserved neighbourhoods addresses basic human rights to health,
              safety and welfare. The benefits of urban tree planting to mitigate extreme heat, air
              pollution, public health and environmental hazards are well studied. In fact, it would
              be dangerous not to address disparities in tree cover with extreme heat and air
              pollution on the rise.
            </p>
            <p className="pl-4 pt-2 pb-6">
              Tree Equity Scores can be used to make comprehensive and strategic investments in
              underserved neighbourhoods&#8212;both by making the case for tree planting need AND by
              generating support for policies that prevent or mitigate gentrification.
            </p>
          </AccordionItem>
        </AccordionWithChildren>
      </div>
    </AccordionItem>
    <AccordionItem
      title="Additional Resources"
      variant="primary"
      className="text-black font-semibold lg:text-title text-xl border-t-2 border-uk-green py-5 text-left leading-tight"
    >
      <div className="h-2"></div>
      <a
        href="https://www.woodlandtrust.org.uk/plant-trees/schools-and-communities/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Free Trees for Schools and Communities:{" "}
            <span className="text-sm text-black">
              Free packs of trees for schools and communities from the Woodland Trust. Two
              deliveries of trees are made each year, in March and November.
            </span>
          </p>
        </div>
      </a>
      <a
        href="https://nhsforest.org/wp-content/uploads/2023/11/nhs_forest_planting_guide_2023.pdf"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            NHS Forest Tree Planting Guidance Pack:{" "}
            <span className="text-sm text-black">
              This guidance pack will introduce you to the NHS Forest and its tree planting
              programme. Produced by the Centre for Sustainable Healthcare.
            </span>
          </p>
        </div>
      </a>
      <a
        href="https://www.woodlandtrust.org.uk/plant-trees/advice/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Tree Planting Advice:{" "}
            <span className="text-sm text-black">
              Advice on planting trees from the Woodland Trust.
            </span>
          </p>
        </div>
      </a>
      <a
        href="https://www.tdag.org.uk/tree-species-selection-for-green-infrastructure.html"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Tree Species Selection Guide for Green Infrastructure:{" "}
            <span className="text-sm text-black">
              A research-based decision-making tool on selecting appropriate species for urban tree
              planting. By the Trees and Design Action Group (TDAG).
            </span>
          </p>
        </div>
      </a>
      <a
        href="https://www.forestresearch.gov.uk/tools-and-resources/fthr/urban-tree-manual/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Urban Tree Manual:{" "}
            <span className="text-sm text-black">
              The Urban Tree Manual provides advice on selecting and procuring the right tree for
              the right place in urban areas. Produced by Forest Research.
            </span>
          </p>
        </div>
      </a>
      <a
        href="https://treecouncil.org.uk/science-and-research/trees-and-woodland-strategy-toolkit/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Trees and Woods Strategy Toolkit for Local Authorities:{" "}
            <span className="text-sm text-black">
              A guide for local authorities and their stakeholders to develop and deliver a local
              tree strategy. Produced by the Tree Council.
            </span>
          </p>
        </div>
      </a>
      <a
        href="https://www.trees.org.uk/Help-Advice/Watering-Young-Trees"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Watering Young Trees:{" "}
            <span className="text-sm text-black">
              Guidance from the Arboricultural Association on watering young trees.
            </span>
          </p>
        </div>
      </a>
      <a
        href="https://treecouncil.org.uk/guidance-resources/hedge-planting-and-growing/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Hedge Planting and Growing:{" "}
            <span className="text-sm text-black">
              A guide to protecting, planting and managing hedgerows.
            </span>
          </p>
        </div>
      </a>
      <a
        href="https://www.tdag.org.uk/trees-in-hard-landscapes.html"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Trees in Hard Landscapes:{" "}
            <span className="text-sm text-black">
              Explores the challenges and solutions to integrating trees in 21st century streets,
              civic spaces and surface car parks, detailing process, design and technical options.
              By the Trees and Design Action Group (TDAG).
            </span>
          </p>
        </div>
      </a>
      <a href="https://www.treesforstreets.org/" target="_blank" rel="noreferrer noopener">
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Trees For Streets:{" "}
            <span className="text-sm text-black">
              The national street tree sponsorship scheme. Set up by the charity, Trees for Cities,
              and civic innovator, Start with Local.
            </span>
          </p>
        </div>
      </a>
      <a
        href="https://www.woodlandtrust.org.uk/plant-trees/woodland-creation-guide/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Woodland Creation Guide:{" "}
            <span className="text-sm text-black">
              A guide by the Woodland Trust to delivering woodland creation projects at any scale,
              in rural or urban settings.
            </span>
          </p>
        </div>
      </a>
      <a
        href="https://www.woodlandtrust.org.uk/support-us/act/tree-charter/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="bg-white rounded-xl border border-brand-green-dark py-2 px-4 mx-4 hover:shadow-lg mb-2">
          <p className="text-base text-brand-green-dark leading-tight">
            Charter for Trees, Woods and People:{" "}
            <span className="text-sm text-black">
              Resources for communities to celebrate and care for trees. Produced to commemorate the
              800 year anniversary of the Charter of the Forest, in 2018.
            </span>
          </p>
        </div>
      </a>
      <div className="h-6"></div>
    </AccordionItem>
    <AccordionItem
      title="Contact Us"
      variant="primary"
      className="text-black font-semibold lg:text-title text-xl border-t-2 border-uk-green py-5 text-left leading-tight"
    >
      <ul className="list-disc pl-10">
        <li className="pt-2">
          For general feedback and questions about partnerships, goals, uses and implementation
          related to Tree Equity Score UK, please contact{" "}
          <a
            href="mailto:treeequity@woodlandtrust.org.uk"
            className="text-brand-green-dark hover:text-brand-green"
            target="_blank"
            rel="noreferrer noopener"
          >
            treeequity@woodlandtrust.org.uk
          </a>
          .
        </li>
        <li className="pt-2">
          For enquiries from healthcare staff or institutions, please contact{" "}
          <a
            href="mailto:info@sustainablehealthcare.org.uk"
            className="text-brand-green-dark hover:text-brand-green"
            target="_blank"
            rel="noreferrer noopener"
          >
            info@sustainablehealthcare.org.uk
          </a>
          .
        </li>
        <li className="pt-2">
          To report bugs, or for technical or data-related questions, please contact{" "}
          <a
            href="mailto:treeequityscore@americanforests.org"
            className="text-brand-green-dark hover:text-brand-green"
            target="_blank"
            rel="noreferrer noopener"
          >
            treeequityscore@americanforests.org
          </a>
          .
        </li>
        <li className="pt-2 pb-6">
          For media enquiries, please reach out to{" "}
          <a
            href="mailto:treeequity@woodlandtrust.org.uk"
            className="text-brand-green-dark hover:text-brand-green"
            target="_blank"
            rel="noreferrer noopener"
          >
            treeequity@woodlandtrust.org.uk
          </a>{" "}
          at the Woodland Trust and{" "}
          <a
            href="mailto:media@americanforests.org"
            className="text-brand-green-dark hover:text-brand-green"
            target="_blank"
            rel="noreferrer noopener"
          >
            media@americanforests.org
          </a>{" "}
          at American Forests.
        </li>
      </ul>
    </AccordionItem>
  </AccordionWithChildren>
)

const DownloadOptionsDropdown = ({ label, s3key }: { label: string; s3key: string }) => {
  return (
    <div className="pb-2">
      <DropdownMenu.Root key={s3key}>
        <DropdownMenu.Trigger asChild>
          <button className="text-brand-green-dark no-underline hover:text-brand-green text-left">
            {label}
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white rounded-lg shadow-lg min-w-[150px]">
            <p className="capitalize text-gray-700 font-bold pt-2 px-2 ">{label}</p>
            <div className="border-gray-700 border-t" />
            <DropdownMenu.Item className="DropdownMenuItem">
              <a
                className="text-gray-700 no-underline p-2 hover:text-brand-green"
                download
                href={`https://tes-uk-app-data-share.s3.amazonaws.com/${s3key}/${s3key}_shp.zip`}
              >
                Shapefile
              </a>
            </DropdownMenu.Item>
            <div className="border-gray-500 border-t" />
            <DropdownMenu.Item className="DropdownMenuItem">
              <a
                className="text-gray-700 no-underline p-2 hover:text-brand-green"
                download
                href={`https://tes-uk-app-data-share.s3.amazonaws.com/${s3key}/${s3key}_geojson.zip`}
              >
                GeoJSON
              </a>
            </DropdownMenu.Item>
            <div className="border-gray-500 border-t" />
            <DropdownMenu.Item className="DropdownMenuItem">
              <a
                className="text-gray-700 no-underline p-2 hover:text-brand-green"
                download
                href={`https://tes-uk-app-data-share.s3.amazonaws.com/${s3key}/${s3key}_csv.zip`}
              >
                CSV
              </a>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

const DataDownload = () => (
  <div className="border-b-2 border-b-uk-green">
    <div className="text-black font-semibold lg:text-title text-xl text-left pt-3 pb-5 pl-4">
      Data Downloads
    </div>
    <p className="pl-4 lg:text-base text-sm">
      Download the latest raw geospatial data that powers Tree Equity Score UK in geospatial or
      spreadsheet formats. Click on a country from the list below to access download options. A data
      dictionary is included with each download.
    </p>
    <div className="pl-10">
      <div className="flex flex-row pt-4">
        <DownloadOptionsDropdown label={"UK"} s3key={"national"} />
      </div>
      <div className="flex flex-row">
        <DownloadOptionsDropdown label={"England"} s3key={"england"} />
      </div>
      <div className="flex flex-row">
        <DownloadOptionsDropdown label={"Northern Ireland"} s3key={"northern_ireland"} />
      </div>
      <div className="flex flex-row">
        <DownloadOptionsDropdown label={"Scotland"} s3key={"scotland"} />
      </div>
      <div className="flex flex-row">
        <DownloadOptionsDropdown label={"Wales"} s3key={"wales"} />
      </div>
    </div>
    <p className="pl-4 lg:text-base text-sm">
      You can cite these data as "Tree Equity Score UK. 2025. American Forests. Last accessed
      [date]".
    </p>
    <div className="h-5"></div>
  </div>
)

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("methods")
  const handleTabSelection = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLButtonElement
    setActiveTab(target.innerText.toLowerCase())
  }, [])
  return (
    <div>
      <div className="bg-brand-gradient-ltblue">
        <div className="xl:w-1/2 lg:w-2/3 md:w-4/5 w-11/12 m-auto flex flex-row h-full items-center justify-between">
          {TAB_LIST.map((tab, i) => (
            <Tab
              label={tab}
              handleClick={handleTabSelection}
              isSelected={activeTab === tab}
              key={i}
            />
          ))}
        </div>
      </div>
      <div className="xl:w-1/2 lg:w-2/3 md:w-4/5 w-11/12 mx-auto my-16 border-t-2 border-t-uk-green">
        {activeTab === "methods" && <Methods />}
        {activeTab === "data glossary" && <DataGlossary />}
        {activeTab === "data download" && <DataDownload />}
        {activeTab === "more info" && <MoreInfo />}
      </div>
    </div>
  )
}

export default Tabs

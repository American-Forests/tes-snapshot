import type { HelpWidgetContent, HelpWidgetPanel, AccordionItemType } from "ui"

const quickStartPanelItems: AccordionItemType[] = [
  /**
   * Formatting tips:
   * - use \n to create a new line
   * - use \" to include a double quote in the string
   */
  {
    title: "Navigate the map",
    type: "list",
    content:
      "1. To navigate to a location, simply type a location into the search bar such as an address, place name, town or city, and select an option that matches from the list. Or simply zoom and pan the map.\n2. Continue to navigate the map by zooming and dragging it to center your location of interest.\n3. Hover or click over shaded areas on the map to view scores for different locations.\n4. Each local authority (for example, a town, city or county) is assigned a Composite Score. This score provides a simplified assessment of overall tree distribution fairness within a community.\n5. As you zoom in, local authorities will subdivide into neighbourhoods—each with a unique Tree Equity Score indicating the geographic pattern of tree canopy need within your community. Lower Tree Equity Scores indicate greater tree canopy need. Scores of 100 indicate areas with enough trees.\n6. To learn more details about an area within your local authority, simply click on a neighbourhood to highlight it. Additional information about your highlighted neighbourhood will appear in the sidebar, including the measures of tree canopy, socioeconomic factors, health, and environmental data that determine its Tree Equity Score.",
  },
  {
    title: "Interpret data in the sidebar",
    type: "accordion",
    content:
      "Simply click on a shaded neighbourhood, and summary information will update in the left sidebar, including the measures of tree canopy, demographics, health, and environment that determine your location's Tree Equity Score.",
    nestedAccordionContent: [
      {
        title: "What is a neighbourhood?",
        content:
          "- Tree Equity Score is calculated for every urban neighbourhood in the UK that has tree canopy data available.\n- A neighbourhood is a collective term for the geographic areas where government statistics are presented across the UK. Neighbourhoods are defined as the Lower Super Output Area (LSOA) in England and Wales, the Data Zone (DZ) in Scotland, and the Super Output Area (SOA) in Northern Ireland. These are equivalent small geographic areas used in the reporting of small area statistics, including the Indices of Multiple Deprivation.",
      },
      {
        title: "Decode the neighbourhood rank",
        content:
          '- Every local authority (e.g., a town, city or county) has a unique landscape of Tree Equity Scores. The neighbourhood rank helps you quickly identify areas in your community with the lowest rank and greatest priority.\n- For each local authority, all neighbourhoods are ranked in order of their Tree Equity Scores. Neighbourhoods ranked "1st" have the highest Tree Equity Scores (usually 100), meaning those locations have enough trees.\n- The bigger the rank, the lower the Tree Equity Score. A neighbourhood ranked 270th out of 271 neighbourhoods, for example, can be considered among the highest priority within a local authority based on Tree Equity Score.',
      },
      {
        title: "Determine a neighbourhood's priority level",
        content:
          "- Each local authority is subdivided into Census neighbourhoods—each with a unique Tree Equity Score indicating the geographic pattern of tree canopy need within your community. Scores of 100 indicate areas with enough trees. The lower the Tree Equity Score, the greater tree canopy need and thus the greater the priority.\n- Tree Equity Score priority levels are defined to provide a broad decision aid to help you interpret your Tree Equity Score. Priority levels are mapped directly from Tree Equity Scores: Highest (0-69), High (70-79), Moderate (80-89), Low (90-99), None (100). You may choose to adjust the prioritisation in your community based on your unique range of Tree Equity Scores and other relevant local information.\n- Within each local authority, all neighbourhoods are ranked in order of their Tree Equity Scores. Neighbourhood ranks help you make comparisons only among neighbourhoods in the same community. The neighbourhood rank serves as an additional tool to easily identify areas of higher priority within a community.",
      },
      {
        title: "Decipher the spider chart",
        content:
          "- Tree Equity Score is a combined measure of tree canopy need and an index comprised of six priority indicators. The spider chart, also known as a radar chart, provides a visual breakdown of the indicators that influence the score for each neighbourhood.\n- **Axes:** The spider chart consists of multiple axes radiating from a central point, like spokes on a wheel. Each axis represents a different priority indicator. Each axis is a scale that represents the range of each indicator value for the local authority overall (all indicators are standardised for visual comparison).\n- **Data points:** Priority indicator values for your highlighted neighbourhood are mapped as red points along each axis. The position of the dot reveals where the data points fall within the overall range of values within the local authority. The further the point is from the center of the chart, the more that indicator contributes to lowering the Tree Equity Score for the neighbourhood.\n- **Shape:** All data points are connected with lines, forming a shaded web shape within the spider chart. In general, the larger the shaded area, the lower the Tree Equity Score and higher the priority. Comparing the shape of the spider web across different neighbourhoods can help you relatively quickly assess the drivers of Tree Equity Score.\n- Once you learn how to read it, the spider chart is a valuable tool to gain insights. Quickly assess patterns for different variables in your local authority. Tease out the variables that have the most influence on Tree Equity Score for each priority neighbourhood.",
      },
      {
        title: "Understand the tree canopy goal",
        content:
          "- The red status bar at the bottom of the sidebar represents the canopy cover goal for the highlighted neighbourhood. It shows the current canopy cover level as a measure of progress, with a gap indicating the amount of additional tree canopy needed to reach the goal.\n- The canopy cover goal represents a minimum percentage of tree canopy required to deliver the requisite benefits of trees to a neighbourhood. In the UK, the baseline tree canopy goal is 30%, which is then scaled based population density to reflect increased human population levels that could limit plantable area.\n- Neighbourhoods with canopy cover that meets or surpasses their tree canopy goal are assigned a Tree Equity Score of 100.\n- Tree canopy goals represent a minimum standard of tree cover for all neighbourhoods that is considered appropriate to local urban ecologies and are not based on goals set by cities.",
      },
    ],
  },
  {
    title: "Explore map layers",
    type: "list",
    content:
      'Think of map layers as sheets of paper in a stack. Each layer represents different information, stacked one above the other. By toggling different layers on or off, you can choose what information, or "sheet," you want to see on the map. Map layers can help you gain a deeper understanding of the patterns and trends unique to your area.\n1. Click on "Layers," then click on one of the layers in the list to change the layer view.\n2. Hover or click over the shaded areas on the map to view data for the selected layer in a pop-up.\n3. Exploring the map layers can help you gain insights into geographic patterns and the hidden story behind tree canopy distribution in your area. Toggle through layers for each specific variable to see how it relates to the tree canopy distribution.',
  },
  {
    title: "Filter map layers",
    type: "list",
    content:
      'A map filter is a tool that allows you to narrow down or prioritise the information displayed on the map based on specific criteria. Map filters help you focus on the geographic areas that are most relevant to your needs or interests.\n1. Click on “Filters” to open the filter menu.\n2. Adjust the sliders from either end or enter cutoff values. The filter will modify the map display accordingly, "filtering out" the areas that do not meet your criteria, and leaving only the areas that match visible on the map. You can set one or more filters.\n3. Filters will remain applied even if you close the filters menu and change the map layers. Tap “Reset” to set the sliders back to their original positions.\n4. Map filters are a deceptively simple tool with a myriad of uses! Use filters to minimise the amount of information your brain has to process. Use filters to look for patterns and isolate areas of interest. Filters are a helpful tool to make informed decisions. Test prioritisation criteria against your local knowledge of an area. You can also filter Tree Equity Score based on issues that are important locally, for example by setting the Heat Disparity filter to identify neighbourhoods endangered by extreme heat.',
  },
  {
    title: "Get the most out of dynamic reports",
    type: "accordion",
    content:
      "Dynamic reports can help you communicate what it takes to raise Tree Equity Scores at a regional level. Dynamic reports are available at three administrative scales: local authority (e.g., a town, city or county), parliamentary constituency and country. Each report provides valuable summary metrics, interactive visualisations to help you gain insights for your area of interest, and computational tools to help you assess scenarios and highlight the numerous benefits that can be gained by raising Tree Equity Scores within your community.",
    nestedAccordionContent: [
      {
        title: "Access dynamic reports",
        type: "accordion",
        content:
          '**From the map**\n1. Click on a shaded neighbourhood on the map. The "Dynamic Reports" menu will open in the upper right corner, showing all available reports for the highlighted neighbourhood.\n2. Choose a scale: Dynamic reports are available at up to three administrative scales from every neighbourhood: local authority (e.g., a town, city or county), parliamentary constituency and country.\n3. Click on a link to open a dynamic report\n\n**Alternatively, you can search for reports anywhere in the UK. Click "Search all reports."**\n\n_To search for dynamic reports by the name of a local authority or country:_\n1. Open the "Find local authority and country reports" tab.\n2. Start typing the name of a local authority or country into the search bar.\n3. Select the best match from the list to open the dynamic report.\n4. If you don\'t know the local authority name, return to the map. Use the search bar located in the upper left of the map to search for your address. Click on your neighbourhood. Now your local authority report will display in the "Reports" menu.\n\n_To search for parliamentary constituency reports:_\n1. Open the "Find parliamentary constituency reports" tab.\n2. Select your country from the dropdown menu.\n3. Select a local authority to narrow the results.\n4. Choose a constituency from the list to open the dynamic report.\n5. If you don\'t know your constituency, return to the map. Use the search bar located in the upper left of the map to search for your address. Click on your neighbourhood. Now your constituency report will display in the "Reports" menu.',
      },
      {
        title: "Interpret the demographic summary",
        type: "list",
        content:
          "1. When you open a dynamic report, the first section provides an overview of population, health and environmental characteristics to help you understand the context of the urban areas in your selected geography.\n2. The summary is specific to the coverage of Tree Equity Score, which includes only the urban areas within each local authority, constituency or country.",
      },
      {
        title: "Interact with the charts",
        type: "list",
        content:
          "**Left Chart**\n- **Tree Equity Scores:** This chart shows the distribution of Tree Equity Scores in your selected geography. The scores are divided into different priority levels: Highest (0-69), High (70-79), Moderate (80-89), Low (90-99), and None (100).\n- **Tooltips:** Hover or tap to view tooltips that display the number of neighbourhoods in each score category.\n\n**Right Chart**\n- **Canopy Cover Distribution:** This chart evaluates tree canopy cover per capita against selected parameters in your chosen area.\n- **Default View:** The default view clusters neighbourhoods based on 5-degree increments of heat disparity and displays the average tree canopy cover per capita for each cluster.\n- **Tooltips:** Hover or tap to view tooltips that display the percent difference in tree canopy per capita for neighbourhoods in each cluster compared to the overall average.\n- **Change Chart Parameters:** To explore different parameters, use the dropdown menu to select a different clustering parameter for the X-axis of the chart.",
      },
      {
        title: "Explore scenarios (slider)",
        type: "list",
        content:
          "The green Tree Equity Score slider is a computational tool designed to help you explore what it takes to raise Tree Equity Scores in your selected geography.\n1. **Set the minimum score:** Move the slider to set a minimum Tree Equity Score for all neighbourhoods in your chosen area. The default target score is 75, but you can adjust it to your preference.\n2. As you adjust the slider, the following information will automatically change:\n- _Number of neighbourhoods currently below the target score:_ How many neighbourhoods currently have scores lower than your chosen minimum.\n- _Planting need:_ The estimated area of additional tree cover required to raise all neighbourhoods to your target score. The tree count equivalency assumes an average urban tree with a canopy area of 55.74 square meters.\n- _Benefits of adding new trees:_ The economic, health, and environmental advantages associated with meeting the Tree Equity Score target.\n\nBy using the slider, you can explore different scenarios to get estimations of tree planting need and communicate the benefits of raising Tree Equity Scores in your selected geography.",
      },
      {
        title: "Understand the tree canopy benefits",
        type: "list",
        content:
          "The benefits panel is a computational tool designed to help you communicate the critical health, economic and environmental benefits of raising Tree Equity Scores.\n- **Set the minimum score:** Adjust the slider to set a minimum Tree Equity Score for all neighbourhoods in your selected geography.\n- **View the benefits:** As you move the slider, the benefits of expanding the tree canopy will automatically update in the benefits panel below. These are annual benefits and include the economic, health and environmental advantages associated with planting the estimated number of new trees.\n- **Learn more:** Each benefit measure is explained in detail in the information tooltip. You can access this tooltip in the lower right of each benefit bubble.\n\nThe benefit measures in the calculator are designed to help you effectively communicate the value of planting and protecting urban trees. They can be valuable in presentations, grant applications, community engagement materials and conversations with stakeholders and community members.",
      },
      {
        title: "Share a dynamic report",
        type: "list",
        content:
          '**Share as a web page**\n- To share the dynamic report as a web page, simply click "Share Report" to copy the URL (web address). Share the copied URL with others.\n- The benefit of sharing the dynamic report as a web page is that others can interact with the visualisations and computational tools.\n\n**Share as a PDF**\n1. From your browser, click "File" > "Print."\n2. Alternatively, you can press Ctrl+P (Windows) or Cmd+P (macOS) on your keyboard.\n3. To customise the appearance of the report when printing, navigate to the "More Settings" option and make adjustments to the "Scale" setting.\n4. In the "Print" settings under "Destination," choose "Save as PDF." \n5. Click the "Save" button and select a name and location for your PDF file.\n6. You can now share the saved PDF file with others.',
      },
    ],
  },
  {
    title: "Export a map",
    type: "list",
    content:
      'Maps are highly versatile and can help communicate patterns in tree inequity. They can be useful in a number of ways, including in grant applications, presentations to a committee, fliers for a tree planting event, conversations local stakeholders and community members.\n\n**Print a PDF of the map**\n1. On the top-left corner of the map, click on camera button.\n2. This will capture a screenshot of the map, and prompt you to save a PDF on your computer.\n\n**Copy/save an image of the map**\n1. Right click on the map, and select "Copy Image" (available on most browsers).\n2. Paste the image into your document or slide deck.\n3. Or select "Save Image As" and import the image into your document or slide deck.\n\n**Take a screenshot on your device**\n- On Windows, press Alt + PrtScn to capture the screen.\n- On Mac, press Command-Shift-3 to capture the entire screen.',
  },
]

const quickStartPanel: HelpWidgetPanel = {
  tabSlug: "quick-start",
  accordionItems: quickStartPanelItems,
}

const dataGlossaryPanelItems: AccordionItemType[] = [
  {
    title: "Tree Equity Score",
    type: "accordion",
    nestedAccordionContent: [
      {
        title: "Tree Equity Score",
        content:
          "Tree Equity Score UK is a UK-wide, neighbourhood-level score ranging from 0 to 100 that highlights inequitable access to trees. The lower the score, the greater priority for tree planting. A score of 100 means the neighbourhood has met a minimum standard for tree cover appropriate for that area.",
      },
      {
        title: "Composite scores (for local authorities)",
        content:
          "Each local authority is assigned a composite score from 0 to 100, which provides a simplified assessment of overall tree distribution fairness. The score for each local authority is aggregated from all neighbourhood Tree Equity Scores within the boundaries of that local authority. The composite score will increase faster if neighbourhoods with lower Tree Equity Scores are raised.",
      },
    ],
  },
  {
    title: "Places",
    type: "accordion",
    nestedAccordionContent: [
      {
        title: "Neighbourhood",
        content:
          "A neighbourhood is a collective term for the geographic areas where government statistics are presented across the UK. Neighbourhoods are defined as the Lower Super Output Area (LSOA) in England and Wales, the Data Zone (DZ) in Scotland, and the Super Output Area (SOA) in Northern Ireland. These are equivalent small geographic areas used in the reporting of small area statistics, including the Indices of Multiple Deprivation. These geographic areas comprise groups of typically four to six contiguous Output Areas and are delineated to be as consistent in population size as possible.",
      },
      {
        title: "Local authority",
        content:
          "A local authority is a government body responsible for administering and providing public services at the local level within a specific geographical area, such as a city, town, or county. These authorities are empowered to make decisions and enact policies related to areas like planning and local infrastructure to serve the needs of their communities. Local authorities are typically governed by elected officials and play a crucial role in local governance and service delivery.",
      },
      {
        title: "Constituency",
        content:
          "The UK is divided into parliamentary constituencies, where one Member of Parliament (MP) in the House of Commons represents a single constituency. There are currently 533 constituencies in England, 59 in Scotland, 40 in Wales and 18 in Northern Ireland. Constituencies vary in population and geographic size.",
      },
      {
        title: "Country",
        content:
          "The four constituent countries of the UK are England, Scotland, Northern Ireland and Wales.",
      },
      {
        title: "Urban areas",
        content:
          "Tree Equity Scores are calculated solely for the urbanised areas within neighbourhoods for the purpose of guiding urban forestry work. By delineating urban areas for all neighbourhoods, the calculation excludes peripheral areas characterised by agriculture, non-forested natural, or other land covers that would not be targeted in an urban forestry program. Urban boundaries were determined using urban classifications for LSOAs, SOAs and Data Zones overlaid on built-up area classifications from the NERC EDS Environmental Information Data Centre Land Cover Map 2021.",
      },
    ],
  },
  {
    title: "Tree canopy measures",
    type: "accordion",
    nestedAccordionContent: [
      {
        title: "Tree canopy cover (%)",
        content:
          "The footprint of existing tree canopy when viewed from above—the bird's eye view of tree crowns (leaves, branches and stems).\n\n_Data Source: Google Environmental Insights Explorer (34,349 LSOAs), iTree Landscape (526 LSOAs)_",
      },
      {
        title: "Neighbourhood tree canopy goal",
        content:
          "The minimum percentage of tree canopy required to deliver the requisite benefits of trees to a neighbourhood, based on a 30% baseline target and adjusted for population density to reflect increased human population levels that could limit plantable area. Tree canopy goals represent minimum standard of tree cover for all neighbourhoods. They may differ from goals set by local authorities.",
      },
      {
        title: "Tree canopy gap (%)",
        content:
          "The percent area of a neighbourhood that could be planted to reach the neighbourhood tree canopy goal. A measure of need, calculated as the difference between the percentage of existing tree canopy cover and the tree canopy goal.",
      },
    ],
  },
  {
    title: "Demographic measures",
    type: "accordion",
    nestedAccordionContent: [
      {
        title: "Children (0-17)",
        content:
          "Percentage of children, ages 0 to 17.\n\n_Data Sources: England and Wales Census 2021, Northern Ireland Census 2011, Scotland Census 2011._",
      },
      {
        title: "Dependency ratio",
        content:
          "Older people (age 65+) and children (0-17) as a proportion of working age adults (18-64).\n\n_Data Sources: England and Wales Census 2021, Northern Ireland Census 2011, Scotland Census 2011._",
      },
      {
        title: "Indices of Multiple Deprivation - Employment Domain",
        content:
          "A neighbourhood's relative deprivation in its country based on several indicators of employment, measured as a rank with 1 being the most deprived and larger numbers being the least deprived. England ranks 32,844 LSOAs, Wales 1,909 LSOAs, Scotland 6,976 Data Zones, and Northern Ireland 890 SOAs.\n\n_Data Sources: English Indices of Multiple Deprivation (2019), Scottish Index of Multiple Deprivation (2020), Northern Ireland Multiple Deprivation Measures (2017), Welsh Index of Multiple Deprivation 2019._\n\n_For England and Wales, 2019 IMD ranks were mapped from the 2011 LSOA boundaries to the 2021 boundaries. If two 2011 LSOAs merged into one 2021 LSOA, the mean rank was assigned. If a 2011 LSOA was split, its rank was assigned to both new LSOAs. The few cases where there were no equivalents were dropped._",
      },
      {
        title: "Indices of Multiple Deprivation - Income Domain",
        content:
          "A neighbourhood's relative deprivation in its country based on several indicators of income, measured as a rank with 1 being the most deprived and larger numbers being the least deprived. England ranks 32,844 LSOAs, Wales 1,909 LSOAs, Scotland 6,976 Data Zones, and Northern Ireland 890 SOAs.\n\n_Data Sources: English Indices of Multiple Deprivation (2019), Scottish Index of Multiple Deprivation (2020), Northern Ireland Multiple Deprivation Measures (2017), Welsh Index of Multiple Deprivation 2019._\n\n_For England and Wales, 2019 IMD ranks were mapped from the 2011 LSOA boundaries to the 2021 boundaries. If two 2011 LSOAs merged into one 2021 LSOA, the mean rank was assigned. If a 2011 LSOA was split, its rank was assigned to both new LSOAs. The few cases where there were no equivalents were dropped._",
      },
      {
        title: "Older People (+65)",
        content:
          "Percentage of adults, ages 65 and older.\n\n_Data Sources: England and Wales Census 2021, Northern Ireland Census 2011, Scotland Census 2011._",
      },
      {
        title: "People from minoritised ethnic groups",
        content:
          "The proportion of the population identifying with Census-defined minoritised ethnic groups. Available as a Supplementary Layer, this dataset may be locally important when considering how to increase Tree Equity and where to target action for increasing tree cover.\n\n_Data Sources: 2021 Census of England and Wales, Northern Ireland Census 2011, Scotland Census 2011._",
      },
    ],
  },
  {
    title: "Tree canopy benefits",
    type: "accordion",
    nestedAccordionContent: [
      {
        title: "Ecosystem services",
        content:
          "Ecosystem services are beneficial contributions that trees provide to the environment, the economy, and human well-being, health and safety. Key ecosystem services provided by urban trees include carbon sequestration, air quality improvement, water regulation, temperature regulation, biodiversity support, nutrient cycling, and aesthetic and cultural value. Urban trees are infrastructure&#8212;they play a crucial role in making communities more inclusive, safe, resilient and sustainable.",
      },
      {
        title: "Annual ecosystem service value",
        content:
          "Total annual economic benefit (monetary value) for all of the ecosystem services, including all carbon sequestration, air pollutant removal, and stormwater absorption provided by trees.\n\n_Data Source: iTree Landscape_",
      },
      {
        title: "Carbon sequestration",
        content:
          "The atmospheric carbon dioxide captured and stored by trees, measured in annual tonnes.\n\n_Data Source: iTree Landscape_",
      },
      {
        title: "Nitrogen dioxide absorption",
        content:
          "Annual tonnes or kilograms of nitrogen dioxide absorption by trees. Nitrogen dioxide is an air pollutant, the most prominent source coming from the burning of fossil fuels. Breathing air with a high concentration of NO&#8322; can irritate airways in the human respiratory system. Exposures over short periods can aggravate respiratory diseases, particularly asthma, leading to respiratory symptoms (such as coughing, wheezing or difficulty breathing), hospital admissions and visits to accident & emergency. Longer exposures to elevated concentrations of NO&#8322; may contribute to the development of asthma and potentially increase susceptibility to respiratory infections. People with asthma, as well as children and the elderly are generally at greater risk for the health effects of NO&#8322;.\n\n_Data Source: iTree Landscape_",
      },
      {
        title: "PM2.5 absorption",
        content:
          "Annual tonnes or kilograms of absorption of particulate matter less than 2.5 microns in size by trees. PM2.5 is a smaller size class of airborne microscopic particles that can be inhaled and deposit deeper in the lungs and even enter the bloodstream, potentially causing serious health problems.\n\n_Data Source: iTree Landscape_",
      },
      {
        title: "Stormwater runoff prevented",
        content:
          "Annual litres of reduced stormwater surface runoff (and associated pollutants) that would be absorbed by trees and no longer require management.\n\n_Data Source: iTree Landscape_",
      },
      {
        title: "Sulphur dioxide absorption",
        content:
          "Annual tonnes or kilograms of sulphur dioxide absorption by trees. Sulphur dioxide is a toxic gas released by burning sulphur-containing fuels such as coal, oil, or diesel and as a byproduct of mining. Short-term exposures to SO&#8322; can harm the human respiratory system and make breathing difficult. Continued exposure increases respiratory symptoms and affects lung function. High concentrations of SO&#8322; in the air generally also convert to other sulphur oxides that react with other compounds to form small particles that may penetrate deeply into the lungs and in sufficient quantity can contribute to health problems. People with asthma, particularly children, are sensitive to these effects of SO&#8322;.\n\n_Data Source: iTree Landscape_",
      },
    ],
  },
  {
    title: "Climate & public health",
    type: "accordion",
    nestedAccordionContent: [
      {
        title: "Air pollution index",
        content:
          "The air pollution index is a combined measure of annual emissions of PM2.5 and NO&#8322; concentrations in micrograms/cubic metre, normalised independently by country, then averaged to create a single index from 0 to 1.\n\n_Data Source: Department for Environment, Food & Rural Affairs&#8212;Emissions of air pollutants_",
      },
      {
        title: "Heat disparity",
        content:
          "Compares average neighbourhood heat extremity with the local authority average to measure variance in heat severity across neighbourhoods.\n\n_Data Source: USGS Earth Explorer&#8212;Landsat 8 Collection 2 Level 2 Surface Temperature_",
      },
      {
        title: "Heat extremity",
        content:
          "Surface temperature is a good estimate of where excess heat is generated in urban areas. Heat extremity is a measure of urban heat severity, based on the highest extremities of 2020-2023 summer surface temperatures averaged by neighbourhood.\n\n_Data Source: USGS Earth Explorer&#8212;Landsat 8 Collection 2 Level 2 Surface Temperature_",
      },
      {
        title: "Indices of Multiple Deprivation - Health Domain",
        content:
          "A neighbourhood's relative deprivation in its country based on several indicators of poor health, measured as a rank with 1 being the most deprived and larger numbers being the least deprived. England ranks 32,844 LSOAs, Wales 1,909 LSOAs, Scotland 6,976 Data Zones, and Northern Ireland 890 SOAs.\n\n_Data Sources: English Indices of Multiple Deprivation (2019), Scottish Index of Multiple Deprivation (2020), Northern Ireland Multiple Deprivation Measures (2017), Welsh Index of Multiple Deprivation 2019._\n\n_For England and Wales, 2019 IMD ranks were mapped from the 2011 LSOA boundaries to the 2021 boundaries. If two 2011 LSOAs merged into one 2021 LSOA, the mean rank was assigned. If a 2011 LSOA was split, its rank was assigned to both new LSOAs. The few cases where there were no equivalents were dropped._",
      },
      {
        title: "Air pollution: NO2 Index",
        content:
          "Annual emissions of nitrogen dioxide (NO&#8322;) concentrations in the air measured in micrograms/cubic metre, scaled from 0 to 1 by country. Nitrogen dioxide is an air pollutant, the most prominent source coming from the burning of fossil fuels. Breathing air with a high concentration of NO&#8322; can irritate airways in the human respiratory system. Exposures over short periods can aggravate respiratory diseases, particularly asthma, leading to respiratory symptoms (such as coughing, wheezing or difficulty breathing), hospital admissions and visits to accident & emergency. Longer exposures to elevated concentrations of NO&#8322; may contribute to the development of asthma and potentially increase susceptibility to respiratory infections. People with asthma, as well as children and the elderly are generally at greater risk for the health effects of NO&#8322;.\n\n_Data Source: Department for Environment, Food & Rural Affairs&#8212;Emissions of air pollutants_",
      },
      {
        title: "Air pollution: PM2.5 Index",
        content:
          "Annual emissions of PM2.5 concentrations in the air measured in micrograms/cubic metre, scaled from 0 to 1 by country. Defined as particulate matter less than 2.5 microns in size, PM2.5 is a smaller size class of airborne microscopic particles that can be inhaled and deposit deeper in the lungs and even enter the bloodstream, potentially causing serious health problems.\n\n_Data Source: Department for Environment, Food & Rural Affairs&#8212;Emissions of air pollutants_",
      },
    ],
  },
  {
    title: "Other",
    type: "accordion",
    nestedAccordionContent: [
      {
        title: "Peat",
        content:
          "The UK has nearly 3 million hectares of peatland habitat and is one of the world's top ten countries for peatland area. Peat soils store 3.2 billion tonnes of carbon and can support a range of unique open and wooded habitats and wildlife. Trees on peaty soils can result in net ecosystem carbon loss through a range of soil-plant-atmosphere interactions such as drying out of peat and oxidation of organic matter. In northern England, Northern Ireland and Scotland peatland habitats occurr both in remote areas and near major population centres covered by Tree Equity Score. Available as a Base Layer, the peat layer can assist users to avoid targeting areas of peatland for tree planting efforts.\n\n_Data Sources: [1] British Geological Survey, Cranfield University (NSRI), and Ordnance Survey. 2021. Moorland Deep Peat AP Status. Natural England Open Data. [2] Welsh Government. 2022 Peatlands of Wales Maps. DataMapWales. [3] Scottish Natural Heritage. 2016. Carbon and Peatland 2016 map. NatureScor Maps. [4] Cruickshank, M.M. & Tomlinson, R.W. 1988. Northern Ireland Peatland Survey. Department of the Environment for Northern Ireland Countryside and Wildlife Branch. Belfast._",
      },
    ],
  },
]

const dataGlossaryPanel: HelpWidgetPanel = {
  tabSlug: "data-glossary",
  accordionItems: dataGlossaryPanelItems,
}

export const HELP_WIDGET_CONTENT: HelpWidgetContent = {
  panels: [quickStartPanel, dataGlossaryPanel],
  tabs: [
    {
      title: "Quick Start",
      slug: "quick-start",
    },
    {
      title: "Data Glossary",
      slug: "data-glossary",
    },
  ],
}

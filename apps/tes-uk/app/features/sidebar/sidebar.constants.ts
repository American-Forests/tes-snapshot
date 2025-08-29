export type SidebarHints = {
  tree_equity_score: string
  population: string
  tree_equity_score_priority: string
  tree_canopy_goal: string
  tree_canopy: string
  priority_index: string
}

export const SIDEBAR_HINTS = {
  tree_equity_score: `Tree Equity Score is a nationwide, neighbourhood-level score ranging from 0 to 100 
  that highlights inequitable access to trees. The score is calculated based on tree 
  canopy cover, climate, health and socioeconomic data. The lower the score, the 
  greater priority for tree planting. A score of 100 means the neighbourhood has met 
  a minimum standard for tree cover appropriate for that area.`,
  tree_equity_score_priority: `Tree Equity Score priority levels are provided as a broad decision aid to help with 
  the interpretation of Tree Equity Scores. You may choose to adjust the prioritisation 
  based on the range of Tree Equity Scores in your community and other relevant 
  local information. HIGHEST: 0-69; HIGH: 70-79; MODERATE: 80-89; LOW: 90-99; 
  NONE: 100.`,
  population: `The total population residing in this neighbourhood.`,
  percent_urban: `Tree Equity Scores are calculated solely for the urbanised areas within 
  neighbourhoods for the purpose of guiding urban forestry work. The score excludes 
  peripheral areas characterised by agriculture as well as non-forested or other 
  natural land covers that would not be targeted in an urban forestry program. To 
  view urban boundaries on the map, select “urban areas” from the Layers list.`,
  tree_canopy_goal: `The minimum percentage of tree canopy required to deliver the requisite benefits of
  trees to a neighbourhood, based on a 30% baseline target and adjusted for 
  population density. Tree canopy goals represent minimum standard of tree cover for 
  all neighbourhoods. They may differ from goals set by local authorities.`,
  tree_canopy: `The existing percent tree canopy cover, that is, the footprint of trees when viewed 
  from above—the bird's eye view of tree crowns (leaves, branches and stems), 
  calculated as a percentage of the urban area of each neighbourhood`,
  priority_index: `The Priority Index is made up of equally-weighted climate and socioeconomic 
  characteristics that are integrated into Tree Equity Score. The Priority Index 
  helps prioritise the need for planting to achieve Tree Equity. The higher the Priority 
  Index, the higher the measures of social deprivation and/or risk relative to 
  environmental hazards that could be reduced with benefits of trees. For more 
  information on each indicator, open the help button and view the Data Glossary, or view tool tips in the Layers 
  and Filters menus.`,
}

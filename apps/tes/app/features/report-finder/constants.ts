import { State } from "db"
export const COUNTY_REPORT_TYPE = "COUNTY_REPORT_TYPE"
export const STATE_REPORT_TYPE = "STATE_REPORT_TYPE"
export const LOCALITY_REPORT_TYPE = "LOCALITY_REPORT_TYPE"
export const DISTRICT_REPORT_TYPE = "DISTRICT_REPORT_TYPE"

export const REPORT_TYPES = {
  COUNTY_REPORT_TYPE,
  STATE_REPORT_TYPE,
  LOCALITY_REPORT_TYPE,
  DISTRICT_REPORT_TYPE,
}

export const COUNTY_REPORT_SUBPATH = "county"
export const STATE_REPORT_SUBPATH = "state"
export const LOCALITY_REPORT_SUBPATH = "place"
export const DISTRICT_REPORT_SUBPATH = "congressional"

export const REPORT_SUBPATHS = {
  COUNTY_REPORT_TYPE: COUNTY_REPORT_SUBPATH,
  STATE_REPORT_TYPE: STATE_REPORT_SUBPATH,
  LOCALITY_REPORT_TYPE: LOCALITY_REPORT_SUBPATH,
  DISTRICT_REPORT_TYPE: DISTRICT_REPORT_SUBPATH,
}

export const REPORT_FINDER_SEARCHTABS = [
  { title: "location-insights:search.find_locality", id: "0" },
  { title: "location-insights:search.find_congressional", id: "1" },
]

export type StateAbbreviation = State["abbreviation"]

export const STATES_NAMES_DICT: Record<StateAbbreviation, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
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
  DC: "District of Columbia",
}

import { Routes } from "@blitzjs/next"

export const TES_HOME_LINK = "https://www.treeequityscore.org"
export const AF_LINK = "https://www.americanforests.org"
export const WOODLAND_TRUST_LINK = "https://www.woodlandtrust.org.uk"
export const CSH_LINK = "https://sustainablehealthcare.org.uk/"
export const PRIVACY_POLICY_LINK = "https://www.treeequityscore.org/privacy"

export const STATIC_ASSETS_CLOUDFRONT_URL = "https://dj7u33mjqnxzp.cloudfront.net"
export const getAssetUrl = (assetPath: string) => `${STATIC_ASSETS_CLOUDFRONT_URL}/${assetPath}`

export const UK_MENU_ITEMS = [
  {
    name: "Launch UK Map",
    link: Routes.Map(),
    flag: "uk",
  },
  {
    name: "TreeEquityScore.org [US]",
    link: TES_HOME_LINK,
    flag: "us",
  },
]

export const NAV_MENU_ITEMS = [
  {
    name: "Home",
    link: Routes.Home(),
  },
  {
    name: "Methods & Data",
    link: { ...Routes.Home(), hash: "methods" },
  },
]

export const BENEFITS_PANNEL_TOOLTIP_CONTENT = new Map([
  [
    1,
    "Setting a Tree Equity Score target approximates the canopy expansion needed to bring any LSOAs below your target score up to that target score. Canopy area is roughly translated to number of trees based on a 55.74 sq-meter tree (a standard medium-sized tree). Estimated total annual benefits are tabulated based on the total targeted trees for all LSOAs , using multipliers applied to canopy values. If you customized the number of trees when setting a target for any LSOA, the targeted trees total and benefits estimation will reflect your custom inputs.",
  ],
  [
    2,
    "Total annual economic benefit (monetary value) for all of the ecosystem services, including all carbon sequestration, air pollutant removal, and stormwater absorption provided by trees. Conversion sourced from i-Tree Landscape.",
  ],
  [3, "Increased percentage of tree canopy with the current target."],
])

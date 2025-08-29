export type BlockgroupType = {
  label: string
  displayValue?: string
  value: string
  unit: string
  hint: string
  valueType?: string
}

export type BlockgroupStackType = {
  title: string
  info: string
  averages: BlockgroupType[]
  blockgroups: BGDataType[]
}

export type GenericComp<T = object> = React.VFC<
  {
    className: string
    item: BlockgroupType
  } & T
>

export type BGDataType = {
  id: string
  values: BlockgroupType[]
}

export type MakeBGDataType = () => BGDataType

export type ComponentHashKeys =
  | "treeEquityScore"
  | "treesNeeded"
  | "population"
  | "treeCanopyCover"
  | "peopleOfColor"
  | "peopleInPoverty"
  | "childrenAndSeniors"
  | "healthBurdenIndex"
  | "heatDisparity"
  | "unemployment"
  | "linguisticIsolation"

export type ComponentHash = {
  [key in ComponentHashKeys]: GenericComp
}

export type BlockgroupStackProps = {
  data: BlockgroupStackType
  maxItems?: number
  onDelete?: (bg: BGDataType) => void
  content?: {
    title: string
    subtitle: string
  }
}

export const BGData: MakeBGDataType = () => ({
  name: "Block Group",
  id: "000000000000",
  values: [
    {
      valueType: "treeEquityScore",
      label: "Tree Equity Score",
      value: "88",
      unit: "",
      hint: "",
    },
    {
      valueType: "treesNeeded",
      label: "Trees needed",
      value: "500",
      unit: "",
      hint: "",
    },
    {
      valueType: "population",
      label: "Population",
      value: "1,600",
      unit: "",
      hint: "",
    },
    {
      valueType: "treeCanopyCover",
      label: "Tree canopy",
      value: "40",
      unit: "%",
      hint: "",
    },
    {
      valueType: "peopleOfColor",
      label: "People of color",
      value: "30",
      unit: "%",
      hint: "",
    },
    {
      valueType: "peopleInPoverty",
      label: "People in poverty",
      value: "80",
      unit: "%",
      hint: "",
    },
    {
      valueType: "childrenAndSeniors",
      label: "Children and Seniors",
      value: "50",
      unit: "%",
      hint: "",
    },
    {
      valueType: "unemployment",
      label: "Unemployment",
      value: "70",
      unit: "%",
      hint: "",
    },
    {
      valueType: "linguisticIsolation",
      label: "Linguistic Isolation",
      value: "50",
      unit: "%",
      hint: "",
    },
    {
      valueType: "healthBurdenIndex",
      label: "Health burden index",
      value: "90",
      unit: "",
      hint: "",
    },
    {
      valueType: "heatDisparity",
      label: "Heat disparity",
      value: "+1.5",
      unit: " F",
      hint: "",
    },
  ],
})

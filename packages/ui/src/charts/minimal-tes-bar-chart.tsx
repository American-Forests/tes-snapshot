enum Ranges {
  First = "0-69",
  Second = "70-79",
  Third = "80-89",
  Fourth = "90-99",
  Fifth = "100",
}

function getGraphData(values: number[]) {
  const numberOfValuesInRange = new Map([
    [Ranges.First, 0],
    [Ranges.Second, 0],
    [Ranges.Third, 0],
    [Ranges.Fourth, 0],
    [Ranges.Fifth, 0],
  ])

  values.forEach((val) => {
    let range
    if (val <= 69) range = Ranges.First
    else if (val <= 79) range = Ranges.Second
    else if (val <= 89) range = Ranges.Third
    else if (val <= 99) range = Ranges.Fourth
    else range = Ranges.Fifth

    numberOfValuesInRange.set(range, numberOfValuesInRange.get(range)! + 1)
  })

  return numberOfValuesInRange
}

function Tooltip({ value, tooltipStrings }: { value: number; tooltipStrings: { singular: string; plural: string } }): React.ReactElement {
  return (
    <div className="absolute z-10 mb-8 w-full min-w-max -translate-y-full transform rounded-md bg-brand-green-darker px-2 py-1 text-annotation text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
      {value > 1 ? `${value} ${tooltipStrings.plural}` : `${value} ${tooltipStrings.singular}`}
    </div>
  )
}

function Bar({
  range,
  value,
  heightPercentage,
  tooltipStrings,
}: {
  range: Ranges
  value: number
  heightPercentage: number
  tooltipStrings: { singular: string; plural: string }
}) {
  const colorVariant = {
    [Ranges.First]: "bg-[#F99D3E]",
    [Ranges.Second]: "bg-[#DEA44F]",
    [Ranges.Third]: "bg-[#C6AA5E]",
    [Ranges.Fourth]: "bg-[#99B67A]",
    [Ranges.Fifth]: "bg-[#6CC296]",
  }[range]

  return (
    <div className="group relative flex h-28 w-full cursor-pointer flex-col items-center justify-end pt-2">
      <Tooltip value={value} tooltipStrings={tooltipStrings} />
      <div
        style={{ height: heightPercentage }}
        className={`w-full  ${colorVariant} group transition-all duration-300`}
      ></div>
      <p className="pt-1 text-annotation font-medium text-neutral-500">
        {range}
      </p>
    </div>
  )
}

export function MinimalTesBarChart({
  values,
  tooltipStrings,
}: {
  values: number[]
  tooltipStrings: { singular: string; plural: string }
}) {
  const dataMap = getGraphData(values)
  const maxValue = Math.max(...Array.from(dataMap.values()))

  return (
    <div className="w-full max-w-xs min-w-[200px]">
      <div className="flex justify-around gap-1">
        {[...Array.from(dataMap.entries())].map(([range, value]) => {
          const heightPercentage = Math.floor((value / maxValue) * 100)
          return (
            <Bar
              range={range}
              heightPercentage={heightPercentage}
              value={value}
              key={range}
              tooltipStrings={tooltipStrings}
            />
          )
        })}
      </div>
    </div>
  )
}

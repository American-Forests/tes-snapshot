import { Fragment, useState } from "react"
import { Tooltip, TooltipRoot, TooltipProvider, TooltipTrigger } from "ui"
import GuideLine from "./components/guide-line"
import Stop from "./components/header-item"
import CategoryName from "./components/category-name"
import ColorBlock from "./components/color-block"
import { scaleLinear, color } from "d3"
import { twMerge } from "tailwind-merge"

function generateColors(
  domain: Array<number>,
  range: Array<string>,
  data: Array<number | null>
) {
  const colorScale = scaleLinear<string, string>().range(range).domain(domain)

  return data.map((value) =>
    value === null ? "transparent" : color(colorScale(value))?.formatHex()
  )
}

export interface Item {
  categoryName: string
  data: (number | null)[]
  domain: number[]
  range: string[]
  unit: string
  manuallyHyphenatedElement?: JSX.Element
  elementsCount: number[]
}

export interface HeatMapProps {
  title: string
  stops: string[]
  items: Array<Item>
}

export function HeatMap(props: HeatMapProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [lastHoveredRow, setLastHoveredRow] = useState<number | null>(null) // This is for the tooltip offset.

  const handleHover = (row: number | null, col: number | null): void => {
    setHoveredRow(row)
    setHoveredCol(col)
    setIsHovering(row !== null && col !== null)
    if (row !== null) setLastHoveredRow(row)
  }

  const itemsWithColors = props.items.map((item) => ({
    ...item,
    colors: generateColors(item.domain, item.range, item.data),
  }))

  const beforeArrowCx =
    "before:w-[16px] before:h-[3px] before:right-[0px] before:-top-[4px] before:rounded-full before:rotate-[30deg] before:block before:absolute before:bg-brand-green-darker"
  ;("before:w-[16px] before:h-[3px] before:right-[0px] before:-top-[4px] before:rounded-full before:rotate-[30deg] before:block before:absolute before:bg-brand-green-darker")
  const afterArrowCx =
    "after:w-[16px] after:h-[3px] after:right-[0px] after:top-[5px] after:rounded-full after:rotate-[150deg] after:block after:absolute after:bg-brand-green-darker"
  ;("after:w-[16px] after:h-[3px] after:right-[0px] after:top-[5px] after:rounded-full after:rotate-[150deg] after:block after:absolute after:bg-brand-green-darker")

  const TooltipCategoryText = ({
    categoryName,
    unit,
    value,
  }: {
    categoryName: string
    unit: string
    value: number
  }) => {
    const isHeatDisparity = categoryName === "Heat disparity"
    const suffix = value >= 0 ? "hotter" : "cooler"
    const sign = value > 0 ? "+" : ""
    const verb = isHeatDisparity ? "are" : "have"
    const formattedValue = isHeatDisparity
      ? `${sign}${value.toFixed(1)}${unit}`
      : `${value.toFixed(1)}${unit}`
    const formattedString = isHeatDisparity
      ? `${suffix} than the urban area average`
      : `${categoryName.toLowerCase()}`

    return (
      <>
        {" "}
        {verb}, on average, <span className="font-bold">{formattedValue}</span>{" "}
        {formattedString}
      </>
    )
  }

  return (
    <div className="z-10 w-full text-annotation leading-none text-brand-green-darker">
      <div className="relative grid grid-cols-10 grid-rows-[2rem_1rem] gap-[3px]">
        <div className="col-start-1 col-end-3 items-center justify-start text-right lg:pr-3 pt-10 md:pt-8 font-bold text-xs leading-none md:text-sm md:leading-none 2xl:text-base 2xl:leading-none sm:max-w-full md:pt-11">
          <p>{props.title}</p>
        </div>
        {props.stops.map((stop, i) => {
          return (
            <Stop
              key={stop}
              stop={stop}
              isHovering={isHovering}
              isHovered={hoveredCol === i}
            />
          )
        })}
        <div className="h-1 col-start-3 col-end-11 mt-6 relative ">
          <div
            className={twMerge(
              "w-full rounded-full h-1 bg-brand-green-darker rounded-full",
              beforeArrowCx,
              afterArrowCx
            )}
          />
        </div>
        {itemsWithColors.map(
          (
            {
              categoryName,
              data,
              colors,
              unit,
              manuallyHyphenatedElement,
              elementsCount,
            },
            rowIndex
          ) => {
            return (
              <Fragment key={categoryName}>
                <CategoryName
                  rowIndex={rowIndex}
                  length={itemsWithColors.length}
                  isHovering={isHovering}
                  isHovered={hoveredRow === rowIndex}
                  categoryName={categoryName}
                  manuallyHyphenatedElement={manuallyHyphenatedElement}
                />
                <GuideLine
                  rowIndex={rowIndex}
                  length={itemsWithColors.length}
                  isHovered={hoveredRow === rowIndex}
                  isHovering={isHovering}
                />
                {colors.map((color, colIndex) => {
                  return (
                    <Fragment key={colIndex}>
                      <TooltipProvider>
                        <TooltipRoot delayDuration={100}>
                          <TooltipTrigger className="z-10 cursor-default flex">
                            <ColorBlock
                              color={color!}
                              rowIndex={rowIndex}
                              colIndex={colIndex}
                              handleHover={handleHover}
                              isHovering={isHovering}
                              isHovered={
                                hoveredCol === colIndex ||
                                hoveredRow === rowIndex
                              }
                            />
                          </TooltipTrigger>
                          {color !== "transparent" && (
                            <Tooltip
                              sideOffset={
                                lastHoveredRow === 0 ||
                                lastHoveredRow === itemsWithColors.length - 1
                                  ? -35
                                  : -10
                              }
                              className="p-4 bg-brand-green-darker text-white "
                            >
                              <div>
                                <p className="text-caption font-light">
                                  Neighborhoods that score{" "}
                                  <span className="font-bold">
                                    {props.stops.at(colIndex)!}
                                  </span>
                                  <TooltipCategoryText
                                    {...{
                                      categoryName,
                                      unit,
                                      value: data.at(colIndex)!,
                                    }}
                                  />
                                  .
                                </p>
                                <p className="pt-3 text-xs font-light">
                                  {`There are ${elementsCount.at(
                                    colIndex
                                  )!} block groups with a score of ${props.stops.at(
                                    colIndex
                                  )!}`}
                                </p>
                              </div>
                            </Tooltip>
                          )}
                        </TooltipRoot>
                      </TooltipProvider>
                    </Fragment>
                  )
                })}
              </Fragment>
            )
          }
        )}
      </div>
    </div>
  )
}

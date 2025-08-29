// @TODO: we need to make a proper shareable component, this is copy pasted from the UI package
import React, { FC, useLayoutEffect, useRef, useState } from "react"
import { scaleLinear, scaleOrdinal } from "d3"
import { min, max, range } from "d3-array"
import { twMerge } from "tailwind-merge"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { pick } from "utils"
import { useTranslation } from "react-i18next"
import { getAxisLabelTooltip } from "./utils"

export type BarChartData = {
  label: {
    value: string
    element?: JSX.Element
    tooltip?: string | JSX.Element
    displayLabelTooltip?: boolean
    facet: string
    min: number
    max: number
  }
  value: number
  fill: string
  tooltip?: JSX.Element | string
  binSize: number
}

export interface BarChartProps {
  xLabel?: string
  yLabel?: string
  data: BarChartData[]
  averageValue?: number
  averageLabel?: string
  gridLines?: boolean
  yDomain?: [number, number]
  formatValue?: (vaue: number) => string
  formatAverageValue?: (value: number) => string
  formatTickValue?: (value: number) => string
  width?: number
  height?: number
  className?: string
  svgClassName?: string
  labelClassName?: string
}

export const BarChart: FC<BarChartProps> = ({
  data,
  xLabel,
  yLabel,
  averageLabel,
  averageValue,
  gridLines,
  yDomain,
  formatValue,
  formatAverageValue,
  formatTickValue,
  width: defaultWidth = 400,
  height = 400,
  className,
  svgClassName,
  labelClassName,
}) => {
  const { t } = useTranslation(["location-insights", "facets"])
  const [width, setWidth] = useState(defaultWidth)
  const [tooltipVisible, setTooltipVisible] = useState(-1)
  const [tooltip, setTooltip] = useState<JSX.Element | string | null>(null)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const isMobile = useMediaQuery("(max-width: 640px)")
  const isHandHeld = useMediaQuery("(max-width: 1535px)")

  const padding = {
    left: 30 + (yLabel ? 20 : 0) + (gridLines ? 30 : 0),
    top: 30,
    right: 20, //isMobile ? 15 : 30,
    bottom: 130,
  }

  const divRef = useRef<HTMLDivElement>(null)
  const zeroValues = data.map(pick("value")).every((d) => d === 0)

  // Replace useLayoutEffect with useEffect
  useLayoutEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        setWidth(Math.max(divRef.current.clientWidth, defaultWidth))
      }
    }

    // Attach the resize event listener
    window.addEventListener("resize", handleResize)

    // Call the handleResize function immediately
    handleResize()

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [divRef])

  const values = data.map((d) => d.value)

  const xScale = scaleOrdinal()
    .domain(data.map((d) => d.label?.value))
    .range(
      range(
        padding.left,
        width - padding.right,
        (width - padding.left - padding.right) / data.length,
      ),
    )

  const yScale = scaleLinear()
    .domain(yDomain ? yDomain : ([min(values), max(values)] as [number, number]))
    .range([height - padding.bottom, padding.top])

  const barSpacing = isMobile ? 5 : 15
  const barWidth =
    (width - padding.left - padding.right - barSpacing * data.length) / data.length -
    (isHandHeld ? 0 : 40)

  const handleMouseOver = (e: React.MouseEvent<SVGElement, MouseEvent>, i: number) => {
    setTooltipVisible(i)
    const tooltipElement = data[i]?.tooltip
    if (tooltipElement) setTooltip(tooltipElement)
  }

  const handleMouseLeave = () => {
    setHoveredBar(null)
    setTooltipVisible(-1)
  }

  let yTicks = yScale.ticks(4)
  yTicks = yTicks.length > 3 ? yTicks.slice(1, yTicks.length) : yTicks
  const tooltipWidth = 250
  const tooltipCX =
    "absolute shadow-md border border-brand-green-darker rounded-md bg-brand-green-darker text-white text-sm p-4 z-50"
  const tooltipSizeCX = twMerge("max-w-[250px]", "print:max-w-[100%]")
  const labelCX =
    "relative w-fit translate-x-[-50%] whitespace-nowrap pt-1 font-semibold text-xs text-[#2C2C2C] lg:text-[13px]"

  const mouseProps = (i: number) => ({
    onMouseOver: (e: React.MouseEvent<SVGElement, MouseEvent>) => handleMouseOver(e, i),
    onMouseOut: () => handleMouseLeave(),
  })

  return (
    <div ref={divRef} className={twMerge("flex flex-col items-center", className)}>
      <svg width={width} height={height} className={twMerge("z-10", svgClassName)}>
        {/** grid lines */}
        {gridLines && (
          <g className="grid-lines">
            {yTicks.map((tick, index) => (
              
              <g key={index}>
                <text
                  fontSize={13}
                  className="font-semibold text-xs sm:text-sm"
                  x={padding.left - 5}
                  y={yScale(tick) + 7}
                  textAnchor="end"
                >
                  {formatTickValue
                    ? formatTickValue(tick)
                    : formatValue
                      ? formatValue(tick)
                      : tick}
                </text>
                <line
                  key={index}
                  x1={padding.left}
                  y1={yScale(tick)}
                  x2={width - padding.right}
                  y2={yScale(tick)}
                  stroke="#F5F5F5"
                />
              </g>
            ))}
          </g>
        )}

        {/** bars */}
        {data.map((d, i) => {
          if (!d.label) return null
          const x = (xScale(d.label?.value) as number) + barSpacing / 2
          const y = yScale(d.value) as number
          const barHeight = height - padding.bottom - y
          const centered = x + barWidth / 2
          const bottom = y + barHeight

          const axisLabelTooltip = getAxisLabelTooltip({min: d.label.min, max: d.label.max, label: t(d.label.facet)})

          return (
            <g key={i}>
              {/* hide bar if all values are 0 */}
              {!zeroValues && (
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={d.fill}
                  style={{ transition: "all 0.3s" }}
                  opacity={hoveredBar !== null && hoveredBar !== i ? 0.2 : 1}
                  {...mouseProps(i)}
                />
              )}
              <foreignObject
                width={barWidth}
                height={height}
                x={centered}
                y={bottom}
                style={{ overflow: "visible", zIndex: 10 }}
              >
                <div
                  className={twMerge(
                    labelCX,
                    labelClassName,
                    d.label.displayLabelTooltip ? "tooltip cursor-pointer relative" : "no-underline",
                  )}
                  data-tooltip={axisLabelTooltip}
                >
                  <span>{d.label!.element ?? t(d.label!.value) ?? ""}</span>
                </div>
              </foreignObject>
            </g>
          )
        })}
        {/* base line */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="#E0E0E0"
        />
        {/** y average trendline */}
        {averageValue && (
          <g>
            <text
              className="font-semibold"
              x={width - padding.right}
              y={yScale(averageValue) - 10}
              textAnchor="end"
              fill="#333335"
            >
              {formatAverageValue ? formatAverageValue(averageValue) : averageValue}{" "}
              {averageLabel ? t(averageLabel) : yLabel ? t(yLabel) : ""}
            </text>
            <line
              x1={padding.left}
              y1={yScale(averageValue)}
              x2={width - padding.right}
              y2={yScale(averageValue)}
              stroke="#212121"
              strokeDasharray="3"
              strokeWidth="2"
            />
          </g>
        )}
        {/** y axis label, fill text-brand-green-dark */}
        {yLabel && (
          <g transform={`translate(${40}, ${(height - padding.bottom) / 2}) rotate(-90)`}>
            <text fill="#2C2C2C" textAnchor="middle" className="font-semibold text-sm">
              {t(yLabel)}
            </text>
          </g>
        )}
        {/** bar tooltips */}
        {data.map((d, j) => {
          if (!d.label) return null
          const x = (xScale(d.label?.value) as number) + barSpacing / 2
          const isRightside = j >= data.length - 2
          const offsetX = 30
          const offsetY = 50
          return tooltipVisible === j ? (
            <foreignObject
              key={j}
              width={`${tooltipWidth}px`}
              height="66%"
              x={isRightside ? x + barWidth - offsetX - tooltipWidth : x + offsetX}
              y={offsetY}
              {...mouseProps(j)}
            >
              <div className={twMerge(tooltipCX, tooltipSizeCX)}>{tooltip}</div>
            </foreignObject>
          ) : null
        })}
      </svg>
      {xLabel && <div className="font-semibold text-sm relative -top-20 z-0">{t(xLabel)}</div>}
    </div>
  )
}

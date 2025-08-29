import React, { FC, useLayoutEffect, useRef, useState } from "react"
import { line, scaleLinear, scaleOrdinal } from "d3"
import { min, max, range } from "d3-array"
import { twMerge } from "tailwind-merge"

import useMediaQuery from "@material-ui/core/useMediaQuery"

export type BarChartData = {
  label: {
    value: string
    element?: JSX.Element
  }
  value: number
  fill: string
  tooltip?: string
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
  const [width, setWidth] = useState(defaultWidth)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipText, setTooltipText] = useState("")
  const [tooltipPosition, setTooltipPosition] = useState<[number, number]>([
    0, 0,
  ])

  const isMobile = useMediaQuery("(max-width: 640px)")

  const padding = {
    left: 30 + (yLabel ? 20 : 0) + (gridLines ? 30 : 0),
    top: 40,
    right: isMobile ? 15 : 30,
    bottom: 80,
  }

  const divRef = useRef<HTMLDivElement>(null)

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
    .domain(data.map((d) => d.label.value))
    .range(
      range(
        padding.left,
        width - padding.right,
        (width - padding.left - padding.right) / data.length
      )
    )

  const yScale = scaleLinear()
    .domain(
      yDomain ? yDomain : ([min(values), max(values)] as [number, number])
    )
    .range([height - padding.bottom, padding.top])

  const barSpacing = isMobile ? 5 : 15
  const barWidth =
    (width - padding.left - padding.right - barSpacing * data.length) /
    data.length

  const handleMouseOver = (
    e: React.MouseEvent<SVGRectElement, MouseEvent>,
    i: number
  ) => {
    const tooltipText = data[i]!.tooltip
    if (tooltipText) {
      if (!tooltipVisible) setTooltipVisible(true)

      setTooltipText(tooltipText)
      setTooltipPosition([e.pageX, e.pageY])
    }
  }

  const handleMouseMove = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    setTooltipPosition([e.pageX, e.pageY])
  }

  const handleMouseLeave = (
    e: React.MouseEvent<SVGRectElement, MouseEvent>
  ) => {
    setTooltipVisible(false)
  }

  const numGridlines = 3
  const yTicks = yScale.ticks(numGridlines)
  const cx =
    "absolute p-2 shadow-md bg-white max-w-[250px] border rounded-md print:max-w-[100%]"
  const visibleCX = tooltipVisible ? "" : "invisible"
  const labelCX =
    "relative w-fit translate-x-[-50%] whitespace-nowrap pt-2 font-semibold text-xs sm:text-sm"

  return (
    <div ref={divRef} className={className}>
      <div
        className={twMerge(cx, visibleCX, className)}
        style={{
          top: tooltipPosition[1] - 50,
          left: tooltipPosition[0] + 10,
        }}
      >
        {tooltipText}
      </div>
      <svg width={"100%"} height={height} className={svgClassName}>
        {/** grid lines */}
        {gridLines && (
          <g className="grid-lines">
            {yTicks.map(
              (tick, index) =>
                index > 0 && (
                  <g key={index}>
                    <text
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
                      stroke="#ccc"
                    />
                  </g>
                )
            )}
          </g>
        )}

        {/** bars */}
        {data.map((d, i) => {
          const x = (xScale(d.label.value) as number) + barSpacing / 2
          const y = yScale(d.value) as number
          const barHeight = height - padding.bottom - y
          const centered = x + barWidth / 2
          const bottom = y + barHeight
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={d.fill}
                onMouseOver={(e) => handleMouseOver(e, i)}
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseOut={(e) => handleMouseLeave(e)}
              />
              <g>
                <path
                  d={`${line()([
                    [padding.left, height - padding.bottom],
                    [width - padding.right, height - padding.bottom],
                  ])}`}
                  stroke="#000"
                  fill="none"
                ></path>
              </g>
              <path
                d={`${line()([
                  [centered, bottom],
                  [centered, bottom + 5],
                ])}`}
                stroke="#000"
                fill="none"
              ></path>
              <foreignObject
                width={barWidth}
                height={height}
                x={centered}
                y={bottom}
                style={{ overflow: "visible" }}
              >
                <div className={twMerge(labelCX, labelClassName)}>
                  {d.label.element ? d.label.element : d.label.value}
                </div>
              </foreignObject>
            </g>
          )
        })}

        {/** y average trendline */}
        {averageValue && (
          <g>
            <text
              className="font-semibold"
              x={width - padding.right}
              y={yScale(averageValue) - 10}
              textAnchor="end"
            >
              {averageLabel ? averageLabel : yLabel ? yLabel : ""} average:{" "}
              {formatAverageValue
                ? formatAverageValue(averageValue)
                : averageValue}
            </text>
            <line
              x1={padding.left}
              y1={yScale(averageValue)}
              x2={width - padding.right}
              y2={yScale(averageValue)}
              stroke="black"
              strokeDasharray="4"
              strokeWidth="2"
            />
          </g>
        )}

        {/** y axis label, fill text-brand-green-dark */}
        {yLabel && (
          <g transform={`translate(${30}, ${height / 2}) rotate(-90)`}>
            <text
              fill="#33966d"
              textAnchor="middle"
              fontSize="16"
              className="font-semibold"
            >
              {yLabel}
            </text>
          </g>
        )}

        {/** x axis label */}
        {xLabel && (
          <g transform={`translate(${width / 2}, ${height - 20})`}>
            <text textAnchor="middle" fontSize="16" className="font-semibold">
              {xLabel}
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}

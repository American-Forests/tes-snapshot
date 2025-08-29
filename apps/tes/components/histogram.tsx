import * as React from "react"
import useDimensions from "react-cool-dimensions"
import { max, scaleLinear, scaleBand, bin } from "d3"
import { Axis, Orient } from "d3-axis-for-react"

const GREEN = "#6CC296"
const ORANGE = "#f99d3e"

const colorScale = scaleLinear<number, string>()
  .domain([0, 100])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .range([ORANGE, GREEN] as any)

function Histogram({ data }: { data: number[] }) {
  const { observe, width } = useDimensions()
  const margin = { top: 10, left: 10, right: 10, bottom: 50 }
  const height = 360
  const thresholds = [0, 64, 80, 90, 100]
  const bins = bin().domain([0, 100]).thresholds(thresholds)(data)
  const xScale = scaleBand()
    .domain(thresholds.map((x) => String(x)))
    .padding(0.05)
    .range([margin.left, width - margin.right])
  const yScale = scaleLinear()
    .domain([0, max(bins, (d) => d.length)!])
    .nice()
    .range([height - margin.bottom, margin.top])

  return (
    <div ref={observe}>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <g transform={`translate(0, ${height - margin.bottom})`} className="axis">
          <Axis
            orient={Orient.bottom}
            scale={xScale}
            tickFormat={(value: string) => {
              const idx = thresholds.indexOf(+value)
              if (idx === thresholds.length - 1) return `${value}`
              return `${value}-${thresholds[idx + 1]! - 1}`
            }}
          />
          <g transform={`translate(${width / 2}, ${margin.bottom / 1.5})`} textAnchor="middle">
            <text fontSize="11">Tree Equity Score</text>
          </g>
        </g>
        {bins.map((d, i) => {
          return (
            <rect
              key={i}
              fill={colorScale(d.x0!)}
              x={xScale(String(d.x0))}
              width={xScale.bandwidth()}
              y={yScale(d.length)}
              height={yScale(0) - yScale(d.length)}
            >
              <title>{d.length} Block Groups</title>
            </rect>
          )
        })}
      </svg>
    </div>
  )
}

export default React.memo(Histogram)

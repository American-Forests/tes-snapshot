import { FC, createRef } from "react"
import { line } from "d3-shape"

const getRadarVertices = (numSides: number, radius: number) => {
  const points: [number, number][] = []
  for (let i = 0; i < numSides; i++) {
    const angle = (i / numSides) * 2 * Math.PI
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    points.push([x, y])
  }
  return points
}

const getRadarPoints = (
  data: RadarChartData[],
  radius: number,
  center: [number, number]
) => {
  const numSides = data.length
  const points: [number, number][] = []
  for (let i = 0; i < numSides; i++) {
    const r = radius * data[i]!.value
    const angle = (i / numSides) * 2 * Math.PI
    const x = center[0] + r * Math.cos(angle)
    const y = center[1] + r * Math.sin(angle)
    points.push([x, y])
  }
  return points
}

const getRadarPolygon = (vertices: [number, number][]) => {
  return line()([...vertices, vertices[0]!])
}

export type RadarChartData = {
  label: string
  /**
   * the human readable value to display
   */
  valueLabel: string
  /**
   * value between 0 and 1 representing the percentage of the radius to draw the point
   */
  value: number
}

export interface RadarChartProps {
  width: number
  height: number
  radius: number
  data: RadarChartData[]
}

export const RadarChart: FC<RadarChartProps> = ({
  data,
  width,
  height,
  radius,
}) => {
  const NUM_SIDES = data.length
  const CENTER = [width / 2, height / 2] as [number, number]
  const divRef = createRef<HTMLDivElement>()
  const vertices = getRadarVertices(NUM_SIDES, radius)
  const labelVertices = getRadarVertices(NUM_SIDES, radius + 15)
  const radarPoints = getRadarPoints(data, radius, CENTER)
  return (
    <div style={{ width: width, height: height }} ref={divRef}>
      <svg width={width} height={height}>
        <path
          d={`${getRadarPolygon(
            vertices.map((v) => [CENTER[0] + v[0], CENTER[1] + v[1]])
          )}`}
          stroke="#ccc"
          fill="none"
        ></path>
        {data.map((d, i) => {
          const vertex = [
            CENTER[0] + vertices[i]![0],
            CENTER[1] + vertices[i]![1],
          ] as [number, number]
          const labelVertex = [
            CENTER[0] + labelVertices[i]![0],
            CENTER[1] + labelVertices[i]![1],
          ] as [number, number]
          return (
            <g key={i}>
              <path
                d={`${line()([CENTER, vertex])}`}
                stroke="#ccc"
                fill="none"
              ></path>
              <text
                x={labelVertex[0]}
                y={labelVertex[1]}
                textAnchor={vertices[i]![0] < 0 ? "end" : "start"}
                fontSize="11"
              >
                {d.label}
              </text>
              <text
                x={labelVertex[0]}
                y={labelVertex[1]}
                textAnchor={vertices[i]![0] < 0 ? "end" : "start"}
                fontSize="11"
                dy={12}
                fontWeight="bold"
              >
                {d.valueLabel}
              </text>
            </g>
          )
        })}
        {data.map((_, i) => {
          return (
            <circle
              cx={radarPoints[i]![0]}
              cy={radarPoints[i]![1]}
              r="3"
              fill="#f36d53"
              key={i}
            />
          )
        })}
        <path
          d={`${line()([...radarPoints, radarPoints[0]!])}`}
          stroke="#f36d53"
          fill="#f36d53"
          fillOpacity={0.5}
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

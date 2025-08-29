import type { Blockgroup } from "db"
import type { Facet } from "data/facets"
import { facetsAtom } from "app/state"
import { useAtomValue } from "jotai"
import { getPriorityFacets } from "data/facets"
import { useTranslation } from "react-i18next"

export default function RadarChart({
  properties,
  onMouseOver,
  onMouseOut,
  hovered,
}: {
  properties: Blockgroup
  onMouseOver: (arg0: Facet) => void
  onMouseOut: () => void
  hovered?: Facet | null
}) {
  const { t, i18n } = useTranslation(["facets", "map"])
  const sides = 7
  const range = [0, 1, 2, 3, 4, 5, 6]
  const width = 360
  const height = 200
  const padRadius = 55
  const isSpanish = i18n.language?.startsWith("es")
  const LABEL_WIDTH = isSpanish ? 100 : 90
  const LABEL_FONT_SIZE = isSpanish ? 10 : 10.5
  const LABEL_RADIUS_MULTIPLIER = 1.25
  const SINGLE_LINE_LABELS = isSpanish ? ["unemployment_rate", "temperature"] : ["unemployment_rate", "temperature", "poverty_percent", "poc_percent"]
  const DOUBLE_LINE_LABELS = isSpanish ? ["linguistic_isolation", "poc_percent", "health_normalized"] : ["linguistic_isolation", "dependent_ratio", "health_normalized"]
  const TRIPLE_LINE_LABELS = isSpanish ? ["poverty_percent", "dependent_ratio"] : []
  const getTransformY = (field: string) => {
    if (SINGLE_LINE_LABELS.includes(field)) return 5
    if (DOUBLE_LINE_LABELS.includes(field)) return 15
    if (TRIPLE_LINE_LABELS.includes(field)) return 24
    return 24
  }
  const getLabelPositioning = (field: string, point: { x: number, y: number }) => {
    if (field === "poverty_percent" && isSpanish) return point.y - 20
    if (point.y < 0) return point.y - 10
    return point.y
  }
  const facets = useAtomValue(facetsAtom)
  const priorityFacets = getPriorityFacets(facets)

  const hexagon = range.map((i) => {
    const angle = (i / sides) * Math.PI * 2
    return [Math.cos(angle) * padRadius, Math.sin(angle) * padRadius]
  })

  const offset = range.map((i) => {
    const angle = ((i - 0.5) / sides) * Math.PI * 2
    const nextAngle = ((i + 0.5) / sides) * Math.PI * 2
    return {
      facet: priorityFacets[i]!,
      position: [
        [Math.cos(angle) * padRadius * 2, Math.sin(angle) * padRadius * 2],
        [Math.cos(nextAngle) * padRadius * 2, Math.sin(nextAngle) * padRadius * 2],
      ],
    }
  })

  const lines = range
    .map((i) => {
      const angle = (i / sides) * Math.PI * 2
      return `M0 0 L ${Math.cos(angle) * padRadius} ${Math.sin(angle) * padRadius}`
    })
    .join("")

  function labels(properties: Blockgroup) {
    const hexagon = range.map((i) => {
      const facet = priorityFacets[i]!
      const value = properties[`${facet.field}_normalized` as keyof Blockgroup] as number
      const r = padRadius * LABEL_RADIUS_MULTIPLIER
      const angle = (i / sides) * Math.PI * 2
      const x = Math.cos(angle) * r
      const y = Math.sin(angle) * r
      return {
        point: { x, y },
        direction: x < 0 ? "end" : "start",
        dominantBaseline: "middle",
        value,
        facet,
      }
    })
    return hexagon
  }

  function radar(properties: Blockgroup) {
    const hexagon = range.map((i) => {
      const facet = priorityFacets[i]!
      const value = properties[
        (facet.field?.field === "health_normalized"
          ? facet.field?.field
          : `${facet.field?.field}_normalized`) as keyof Blockgroup
      ] as number
      const r = padRadius * value
      const angle = (i / sides) * Math.PI * 2
      return {
        point: [Math.cos(angle) * r, Math.sin(angle) * r],
        facet,
      }
    })
    return hexagon
  }
  return (
    <div className="cursor-pointer">
      <svg
        style={{
          width,
          height,
        }}
      >
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          <path
            d={`M ${hexagon.map((pt) => pt.join(" ")).join("L")} Z`}
            fill="none"
            stroke="#ccc"
            strokeWidth="1"
          />

          <path d={lines} fill="none" stroke="#ccc" strokeWidth="1" />
          <path
            d={`M ${radar(properties)
              .map((pt) => pt.point.join(" "))
              .join("L")} Z`}
            fill="#f36d53"
            fillOpacity="0.5"
            stroke="#f36d53"
            strokeWidth="1"
          />
          {radar(properties).map(({ point, facet }, i) => {
            return (
              <circle
                key={i}
                cx={point[0]}
                cy={point[1]}
                r={hovered === facet ? 4 : 3}
                fill="#f36d53"
                stroke="none"
              />
            )
          })}
          {offset.map(({ facet, position }, i) => {
            return (
              <path
                key={i}
                d={`M 0 0 L ${position.map((pt) => pt.join(" ")).join("L")} Z`}
                fill="transparent"
                onMouseOver={() => {
                  onMouseOver(facet)
                }}
                onMouseOut={() => onMouseOut()}
              />
            )
          })}
          {labels(properties).map(({ point, direction, dominantBaseline, facet }, i) => {
            return (
              <g
                key={i}
                transform={`translate(${point.x}, ${getLabelPositioning(facet.field.field, point)})`}
                onMouseOver={() => {
                  onMouseOver(facet)
                }}
                onMouseOut={() => onMouseOut()}
              >
                <foreignObject
                  x={direction === 'end' ? -LABEL_WIDTH : 0}
                  y={-14}
                  width={LABEL_WIDTH}
                  height={34}
                  requiredExtensions="http://www.w3.org/1999/xhtml"
                >
                  <div
                    className="font-semibold"
                    style={{
                      fontSize: LABEL_FONT_SIZE,
                      lineHeight: 1,
                      textAlign: direction === 'end' ? 'right' : 'left',
                      // overflow: 'hidden',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere',
                      maxHeight: 24,
                    }}
                  >
                    {t(`facets:${facet.field?.field}.name`)}
                  </div>
                </foreignObject>
                <text
                  transform={`translate(0, ${getTransformY(facet.field?.field)})`}
                  dominantBaseline={dominantBaseline}
                  textAnchor={direction}
                  fontSize="13"
                  className="font-semibold"
                >
                  {facet.formatter
                    ? facet.formatter(properties[facet.field?.field as keyof Blockgroup] as number)
                    : properties[facet.field?.field as keyof Blockgroup]}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

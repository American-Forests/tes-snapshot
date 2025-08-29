import React, { FC } from "react"

interface KeyProps {
  title: string
}

export interface ContinuousKeyProps extends KeyProps {
  startLabel: string
  endLabel: string
  gradient: string
}

export interface DiscreteKeyProps extends KeyProps {
  type: "enum" | "quantile"
  labels: string[]
  colors: string[]
  opacities?: number[]
  initialLabel?: string
  finalLabel?: string
}

const Key: FC<KeyProps & { children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="flex flex-col items-center pt-3 pb-1" data-testid="key">
      {children}
      <div className="p-2 text-sm font-semibold text-gray-600">{title}</div>
    </div>
  )
}

export const ContinuousKey: FC<ContinuousKeyProps> = ({
  title,
  startLabel,
  endLabel,
  gradient,
}) => {
  return (
    <Key title={title}>
      <div className="w-full flex flex-row items-center">
        <div className="text-sm text-gray-600 font-semibold px-2">
          {startLabel}
        </div>
        <div
          className="h-4 flex-grow rounded-md border border-gray-300"
          style={{ background: gradient }}
        />
        <div className="text-sm text-gray-600 font-semibold px-2">
          {endLabel}
        </div>
      </div>
    </Key>
  )
}

export const DiscreteKey: FC<DiscreteKeyProps> = ({
  title,
  labels,
  colors,
  opacities,
  finalLabel,
  initialLabel,
}) => {
  return initialLabel && finalLabel ? (
    <Key title={title}>
      <div className="flex flex-row flex-wrap ui-justify-center">
        <div className="text-xs text-gray-600 font-semibold pl-1 w-2/12">
          {initialLabel}
        </div>
        <div className="flex items-center shrink-0 w-8/12 justify-between">
          {labels.map((label, i) => (
            <div
              key={label}
              className="w-5 h-5 rounded-md border border-gray-300"
              style={{
                background: colors[i],
                opacity: opacities ? opacities[i] : 1,
              }}
            />
          ))}
        </div>
        <div className="text-xs text-gray-600 font-semibold pl-1 w-2/12">
          {finalLabel}
        </div>
      </div>
    </Key>
  ) : (
    <Key title={title}>
      <div className="flex flex-row flex-wrap">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center px-2 shrink-0">
            <div
              className="w-5 h-5 rounded-md border border-gray-300"
              style={{
                background: colors[i],
                opacity: opacities ? opacities[i] : 1,
              }}
            />
            <div className="text-sm text-gray-600 font-semibold pl-1">
              {label}
            </div>
          </div>
        ))}
      </div>
    </Key>
  )
}

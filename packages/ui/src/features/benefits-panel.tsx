import * as React from "react"
import { twMerge } from "tailwind-merge"

import { BenefitCard, HelpTooltip } from "ui"

const Section = ({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) => {
  const titleCX =
    "border-b-4 border-brand-gray-pale uppercase font-bold text-body mb-4"
  return (
    <section className={className}>
      <p className={titleCX}>{title}</p>
      {children}
    </section>
  )
}

export type Benefits = Array<{
  label: string
  value: string
  unit: string
  hint: string
  compare?: boolean
}>

export type BenefitsPanelData = {
  carbon: Benefits
  water: Benefits
  air: Benefits
}

type BenefitsKeys = keyof BenefitsPanelData

type BenefitsLayout = {
  grouped: number
  items: {
    border: Array<boolean>
  }
}

export type BenefitsLayouts = Map<keyof BenefitsPanelData, BenefitsLayout>

export type BenefitsStyles = {
  section: {
    carbon: string
    water: string
    air: string
  }
  sectionContainer: {
    carbon: string
    water: string
    air: string
  }
  sectionIntro: {
    carbon: string
    water: string
    air: string
  }
  block: {
    carbon: string
    water: string
    air: string
  }
}

type DataEntries = [keyof BenefitsPanelData, Benefits][]

export const BenefitsPanel = ({
  data,
  layout,
  classes,
}: {
  data: BenefitsPanelData
  layout: BenefitsLayouts
  classes: BenefitsStyles
}) => {
  const cx = "grid gap-4 grid-cols-1 md:grid-cols-4 print:grid-cols-4"
  const dataEntries: DataEntries = []
  for (const key of Array.from(layout.keys())) {
    dataEntries.push([
      key as keyof BenefitsPanelData,
      data[key as keyof BenefitsPanelData],
    ])
  }

  return (
    <div className={cx}>
      {dataEntries.map(([key, entries]) => {
        const layoutItem = layout.get(key as BenefitsKeys)!
        const grouped = layoutItem.grouped
        const groupedEntries = entries.slice(0, grouped)
        const restRentries = entries.slice(grouped, entries.length)
        const Intro =
          groupedEntries.length > 0
            ? ({ children }: { children: React.ReactNode }): JSX.Element => (
                <div className={classes.sectionIntro[key as BenefitsKeys]}>
                  {children}
                </div>
              )
            : React.Fragment
        return (
          <Section
            key={key}
            title={key}
            className={classes.section[key as BenefitsKeys]}
          >
            <div className={classes.sectionContainer[key as BenefitsKeys]}>
              <Intro>
                {groupedEntries.map((entry, i) => {
                  const border = Boolean(layoutItem.items.border[i])
                  return (
                    <BenefitCard
                      key={i}
                      label={entry.label}
                      value={entry.value}
                      unit={entry.unit}
                      hint={entry.hint}
                      compare={entry.compare}
                      border={border}
                    />
                  )
                })}
              </Intro>
              {restRentries.map((entry, i) => {
                const border = Boolean(
                  layoutItem.items.border[i + groupedEntries.length - 1]
                )
                return (
                  <div
                    className={classes.block[key as BenefitsKeys]}
                    key={`${key}-${i}`}
                  >
                    <BenefitCard
                      key={i}
                      label={entry.label}
                      value={entry.value}
                      unit={entry.unit}
                      hint={entry.hint}
                      compare={entry.compare}
                      border={border}
                    />
                  </div>
                )
              })}
            </div>
          </Section>
        )
      })}
    </div>
  )
}

///////////////////////////////////////////////////////////////////
///////////////// N E W  B E N E F I T S  P A N E L ///////////////
///////////////////////////////////////////////////////////////////
const Outer: React.FC<{ className?: string; children: React.ReactNode }> = ({
  children,
  className,
}) => {
  const colsCX = `grid h-full`
  const heightCX = ``
  const cx = twMerge("grid gap-4", colsCX, heightCX, className)
  return <div className={cx}>{children}</div>
}

const Column: React.FC<{ className?: string; children: React.ReactNode }> = ({
  children,
  className,
}) => (
  <div
    className={twMerge(
      "flex h-auto flex-col items-center justify-center",
      className
    )}
  >
    {children}
  </div>
)

type CardProps = {
  height?: number
  split?: boolean
  className?: string
}

const lineClasses =
  "after:z-10 after:absolute after:-bottom-2 after:h-[1px] after:bg-gray-300 after:w-[80%] after:left-[10%] last:after:h-0"

const Card: React.FC<CardProps & { children: React.ReactNode }> = ({
  split,
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "first:rounded-t-xl",
        "last:rounded-b-xl",
        split ? "my-3 last:pb-4 last:mb-0" : "py-4",
        split ? "rounded-xl" : "",
        split ? "" : twMerge("grid", lineClasses),
        className
      )}
    >
      {children}
    </div>
  )
}

export type BenefitsData = {
  carbon: {
    data: Benefits[][]
    classNames?: {
      columns?: string
      cards?: string
    }
  }
  water: {
    data: Benefits[][]
    classNames?: {
      columns?: string
      cards?: string
    }
  }
  air: {
    data: Benefits[][]
    classNames?: {
      columns?: string
      cards?: string
    }
  }
}

type BenfitsProps = {
  data: BenefitsData
  titles?: Record<keyof BenefitsData, string>
  className?: string
}

export function BenefitsComponent(props: BenfitsProps) {
  const { data, titles, className } = props
  return (
    <Outer className={`${className && className}`}>
      {Object.entries(data).map(([key, dataValues]) => {
        const values = dataValues.data
        const classNames = dataValues.classNames

        return (
          <section
            key={key}
            className={twMerge(
              "text-gray-800",
              classNames && classNames.columns
            )}
          >
            <p className="border-brand-gray-pale text-body mb-4 border-b-4 font-bold uppercase">
              {titles?.[key as keyof BenefitsData] || key}
            </p>
            <div className={twMerge("flex flex-col flex-wrap gap-x-4 h-full")}>
              {values.map((val, i: number) => {
                return (
                  <Column key={i}>
                    {val.map((block, j) => {
                      return (
                        <div
                          key={j}
                          className={twMerge("text-center", "w-full")}
                        >
                          {block.map((d, k) => {
                            const firstBlock = j === 0
                            const firstItem = k == 0
                            return (
                              <Card
                                key={k}
                                className={twMerge(
                                  "relative",
                                  classNames && classNames.cards,
                                  firstBlock
                                    ? firstItem
                                      ? "md:mt-0 pt-3"
                                      : "md:mt-0 pt-6"
                                    : "pt-4 md:pt-2"
                                )}
                                split={block.length === 1}
                              >
                                <p
                                  className={twMerge(
                                    "text-base font-bold first-letter:capitalize",
                                    "pt-2",
                                    k === 0 ? "pt-3" : "pt-2"
                                  )}
                                >
                                  {d.label.toLowerCase()}
                                </p>
                                <p className="text-headline pt-2">{d.value}</p>
                                <p className="text-base text-gray-600">
                                  {d.unit}
                                </p>
                                <HelpTooltip className="text-gray-400 hover:text-brand-green-dark absolute right-4 bottom-4">
                                  <span>{d.hint}</span>
                                </HelpTooltip>
                              </Card>
                            )
                          })}
                        </div>
                      )
                    })}
                  </Column>
                )
              })}
            </div>
          </section>
        )
      })}
    </Outer>
  )
}

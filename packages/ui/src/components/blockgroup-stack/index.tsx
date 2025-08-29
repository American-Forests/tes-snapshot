'use client'
import { twMerge } from "tailwind-merge"
import { HelpTooltip } from "ui"
import { TrashIcon } from "@radix-ui/react-icons"

import { BGData } from "./utils"
import type {
  ComponentHash,
  BlockgroupStackProps,
  ComponentHashKeys,
} from "./utils"

import { ValueWithUnit, Fragment, Progress, Percentile } from "./components"

const components: ComponentHash = {
  treeEquityScore: Progress,
  treesNeeded: Fragment,
  population: Fragment,
  treeCanopyCover: Percentile,
  peopleOfColor: Percentile,
  peopleInPoverty: Percentile,
  childrenAndSeniors: Percentile,
  healthBurdenIndex: Percentile,
  heatDisparity: Percentile,
  unemployment: Percentile,
  linguisticIsolation: Percentile,
}

const styles = {
  treeEquityScore: { unit: "" },
  treesNeeded: { unit: "" },
  population: { unit: "" },
  treeCanopyCover: { unit: "text-xs" },
  peopleOfColor: { unit: "" },
  peopleInPoverty: { unit: "" },
  childrenAndSeniors: { unit: "" },
  healthBurdenIndex: { unit: "" },
  heatDisparity: { unit: "" },
  unemployment: { unit: "" },
  linguisticIsolation: { unit: "" },
}

const rowColor = "border-b border-t border-gray-200/80"

const dummyBlockgroups = [BGData(), BGData(), BGData()]

export const BlockgroupStack: React.FC<BlockgroupStackProps> = ({
  data,
  maxItems,
  content,
  onDelete = (e) => e,
}) => {
  const { title, info, averages, blockgroups } = data
  const numCols = (maxItems ? maxItems : blockgroups.length) + 1
  const hasBlockgroups = Boolean(blockgroups.length)
  const h2Classes = "px-2 pb-3 lg:text-base text-sm text-gray-800 font-medium"
  const stickyCX = "bg-white sticky md:static left-0 z-[70] pr-4 md:pr-0"

  const renderBlockgroups = hasBlockgroups ? blockgroups : dummyBlockgroups
  return (
    <div className="bg-[#F9FCFC] pb-10 -mt-10 border-b border-gray-200 pt-7">
      <div className="overflow-x-auto md:overflow-x-hidden bg-white">
        <div className="min-w-[854px] md:w-full xl:w-11/12 2xl:w-4/5 m-auto bg-white xl:px-4 px-2 xl:pb-4 pb-2 pt-2 md:rounded-b-xl md:border-x md:border-b md:border-gray-300">
          <div
            className={twMerge(
              "grid text-gray-800 lg:text-base text-sm",
              `grid-cols-${numCols}`
            )}
          >
            <div
              className={twMerge(
                "flex flex-row items-end",
                `col-span-${numCols}`
              )}
            >
              <h2
                className={twMerge(
                  h2Classes,
                  "col-span-1 flex flex-col min-w-[25%] -mb-10 text-gray-800 lg:text-lg text-base font-semibold",
                  stickyCX
                )}
              >
                <span
                  style={{ fontVariant: "small-caps" }}
                  className="text-sm lowercase text-brand-green-darker font-bold tracking-wider -mb-1 pt-0"
                >
                  {content?.title}
                </span>
                {title}
              </h2>
              <h2
                className={twMerge(h2Classes, "col-span-3 w-full text-center")}
              >
                {info}
              </h2>
            </div>
            <div
              className={twMerge(
                "relative flex flex-row items-end",
                `col-span-${numCols}`
              )}
            >
              {!hasBlockgroups && (
                <div className="absolute left-1/3 top-1/2 w-3/5 flex align-center justify-center pt-10 z-50">
                  <div className="bg-brand-green-light text-brand-green-dark text-base font-medium tracking-wide leading-normal text-center md:rounded-md py-6 px-10 max-w-[600px] drop-shadow-sm">
                    {content?.subtitle}
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-4">
              {averages.map((avg, avgi) => (
                <div
                  key={avgi}
                  className={twMerge(
                    "grid grid-cols-subgrid gap-4",
                    `grid-cols-${numCols}`
                  )}
                >
                  <div
                    className={twMerge(
                      "col-span-1 flex justify-between items-center xl:text-sm text-xs font-semibold",
                      avgi % 2 === 0 ? rowColor : "",
                      "p-2",
                      avgi === 0 ? "h-[42px] mt-7" : "",
                      avg.hint ? `${stickyCX} xl:pr-2` : `${stickyCX} md:pr-6`
                    )}
                  >
                    <span>
                      {avg.label}
                      {avg.hint && (
                        <HelpTooltip className="ml-1 -mt-1 w-3 h-3 cursor-pointer">
                          {avg.hint}
                        </HelpTooltip>
                      )}
                    </span>
                    <ValueWithUnit
                      className={twMerge(
                        "text-[#005251]",
                        avgi < 3 ? "2xl:text-base text-sm" : ""
                      )}
                      unitClassName={
                        styles[`${avg.valueType as keyof typeof styles}`]
                          ?.unit || ""
                      }
                      item={avg}
                    />
                  </div>
                  {renderBlockgroups.map((_, bgi) => {
                    const blockgroup = renderBlockgroups[bgi]!
                    const item = blockgroup.values[avgi]!
                    const key = item.valueType as ComponentHashKeys
                    const Comp = components[key] || Fragment

                    return (
                      <div
                        className={twMerge(
                          "h-full col-span-1",
                          hasBlockgroups
                            ? ""
                            : "opacity-10 pointer-events-none select-none",
                          avgi === 0 && bgi > 3 ? stickyCX : ""
                        )}
                        key={bgi}
                      >
                        {avgi == 0 && (
                          <div className="flex justify-between pr-1 text-gray-600 leading-none mt-2">
                            <span className="font-semibold lg:text-sm text-xs">
                              BG {blockgroup.id}
                            </span>
                            <span
                              className="text-red-500 lg:text-xs text-annotation cursor-pointer font-semibold"
                              onClick={() => onDelete(blockgroup)}
                            >
                              <TrashIcon className="mt-1" />
                            </span>
                          </div>
                        )}
                        <div
                          className={twMerge(
                            "col-span-1 text-right",
                            avgi === 0 ? "p-2" : "p-2",
                            Comp === Percentile ? "px-0 py-0 h-full" : "",
                            avgi % 2 === 0
                              ? Comp === Percentile
                                ? ""
                                : rowColor
                              : ""
                          )}
                        >
                          <Comp
                            className={
                              avgi < 3
                                ? "2xl:text-base text-sm font-semibold"
                                : ""
                            }
                            item={item}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from "react"
import type { NeighborhoodLike } from "@prisma/client"

import { targetScoreAtom } from "app/features/report/report.state"
import { DEFAULT_TARGET_SCORE } from "app/features/report/report.constants"

import { Benefits } from "./benefits"
import { Slider } from "./slider"
import { useAtom } from "jotai"

export const EquityScore = ({ neighborhoods }: { neighborhoods: NeighborhoodLike[] }) => {
  const cx = "bg-white xl:w-4/5 w-full m-auto px-2 sm:px-10 py-8 pt-12"
  const [targetScore, setTargetScore] = useAtom(targetScoreAtom)
  const [neighborhoodsBelowTarget, setNeighborhoodsBelowTarget] = useState(neighborhoods)

  const handleSliderChange = (_: React.ChangeEvent<unknown>, newValue: number | number[]) => {
    setTargetScore(newValue as number)
  }

  useEffect(() => {
    setTargetScore(DEFAULT_TARGET_SCORE)
  }, [])

  useEffect(() => {
    if (!neighborhoods) return
    const filteredNeighborhoods = neighborhoods.filter((n) => n.tree_equity_score < targetScore)
    setNeighborhoodsBelowTarget(filteredNeighborhoods)
  }, [neighborhoods, targetScore])

  const neighborhoodType = neighborhoods?.[0]?.type ?? "neighborhood"

  return (
    <section className={cx}>
      {neighborhoodsBelowTarget && neighborhoods && (
        <>
          <Slider
            {...{
              neighborhoodType,
              targetScore,
              numberOfNeighborhoodsBelowTarget: neighborhoodsBelowTarget.length,
              totalNeighborhoods: neighborhoods.length,
              handleSliderChange,
            }}
          />
          <Benefits {...{ targetScore, neighborhoods, neighborhoodType }} />
        </>
      )}
    </section>
  )
}

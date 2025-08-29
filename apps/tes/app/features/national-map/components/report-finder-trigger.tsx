
import { useCallback, useEffect, useState } from "react"
import { ReportFinder } from "../../report-finder"
import { BLOCKGROUP_LEVEL_NAME, LevelName } from "app/constants"
import { useAtom, useAtomValue } from "jotai"
import { reportDropdownOpen, selectedFeatureAtom } from "app/state"
import { Blockgroup } from "db"
import { useQuery } from "@blitzjs/rpc"
import getBlockgroup from "app/blockgroups/queries/getBlockgroup"
import { twMerge } from "tailwind-merge"
import { useTranslation } from "react-i18next"

export function ReportFinderTrigger({ currentLevel }: { currentLevel: LevelName}) {
  const { t, i18n } = useTranslation(["location-insights"])
  const selectedFeature = useAtomValue(selectedFeatureAtom)
  const [open, setOpen] = useAtom(reportDropdownOpen)
  const [selectedBlockgroupId, setSelectedBlockgroupId] = useState<string | null>(null)
  const [blockgroup] = useQuery(
    getBlockgroup,
    { id: selectedBlockgroupId as string },
    { enabled: !!selectedBlockgroupId },
  )
  const handleClick = useCallback(() => {
    setOpen(!open)
  }, [open, setOpen])
  
  useEffect(() => {
    if (!selectedFeature) {
      setSelectedBlockgroupId(null)
      return
    }
    if (
      selectedFeature.source === "blockgroup" &&
      selectedFeature.properties &&
      selectedFeature.properties.id
    ) {
      setSelectedBlockgroupId(selectedFeature.properties.id)
    }
  }, [selectedFeature])

  useEffect(() => {
    if (currentLevel === BLOCKGROUP_LEVEL_NAME) setOpen(true)
  }, [currentLevel])

  const showBanner = i18n?.language === "en"
  const bannerCX = "absolute flex items-center text-[7px] bg-yellow-500 rounded-full px-2  text-white h-3  font-bold tracking-wider -top-[5px] left-6 uppercase"
  const buttonCX = "px-3 py-1 lg:px-5 lg:py-2 text-xs lg:text-sm font-semibold uppercase flex items-center gap-x-1 text-brand-green-dark hover:text-brand-green-darker transition-all"
  const buttonPrintCX = "print:hidden"

  return (
    <div className="relative">
      {showBanner && 
        <span className={bannerCX}>
          ★ new feature!
        </span>
      }
      <button onClick={handleClick} className={twMerge(buttonCX, buttonPrintCX)}>{t("location-insights:intro.button")}</button>
      {open && (
        <ReportFinder setOpen={setOpen} blockgroups={blockgroup ? [blockgroup as Blockgroup] : []} isNational={true}/>
      )}
    </div>
  )
}

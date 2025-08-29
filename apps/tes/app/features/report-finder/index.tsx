import { XMarkIcon } from "@heroicons/react/24/solid"
import { Dispatch, SetStateAction, Suspense, useCallback, useState } from "react"
import { twMerge } from "tailwind-merge"
import { Blockgroup } from "db"
import { ReportFinder as ReportFinderUI } from "ui"
import { OpenSearch } from "./components/open-search"
import { ReportLink } from "./components/report-link"
import { ReportType } from "./types"
import { getRelatedReportOptionsByReportType } from "./utils"
import { FilteredSearch } from "./components/filtered-search"
import { REPORT_FINDER_SEARCHTABS } from "./constants"
import Help from "components/help"
import { useTranslation } from "react-i18next"

const NationalHeader = ({ onReportFinderClose }: { onReportFinderClose: () => void }) => {
  const { t } = useTranslation(["location-insights"])
  return (
    <>
      <div className="flex flex-row justify-between w-full items-baseline pb-2">
        <p className="text-lg text-brand-green-dark font-semibold max-w-[70%]">
          {t("location-insights:finder.location_prompt")}
        </p>
        <Help className="-ml-4">
          <p>{t("location-insights:finder.intro")}</p>
          <p className="mt-2">{t("location-insights:finder.scale_info")}</p>
        </Help>
        <button
          className="text-gray-400 hover:text-black flex items-center"
          onClick={onReportFinderClose}
        >
          <XMarkIcon className="-mt-2 w-4 h-4 fill-brand-green-dark hover:fill-brand-green transition-colors duration-100" />
        </button>
      </div>
      <p className="text-sm font-semibold text-gray-700 pb-2 w-full">
        {t("location-insights:finder.map_selection")}
      </p>
    </>
  )
}

const ReportsHeader = ({ onReportFinderClose }: { onReportFinderClose: () => void }) => {
  const { t } = useTranslation(["location-insights"])
  return (
    <div className="flex flex-row justify-between w-full">
      <p className="text-sm font-semibold text-gray-700 pb-2 pt-1">
        {t("location-insights:finder.related_geographies")}
      </p>
      <button
        className="text-gray-400 hover:text-black flex items-center"
        onClick={onReportFinderClose}
      >
        <XMarkIcon className="-mt-2 w-4 h-4 fill-brand-green-dark hover:fill-brand-green transition-colors duration-100" />
      </button>
    </div>
  )
}
export const ReportFinder = ({
  setOpen,
  blockgroups,
  reportType,
  isNational,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>
  blockgroups: Blockgroup[]
  reportType?: ReportType
  isNational?: boolean
}) => {
  const { t } = useTranslation(["location-insights"])
  const translatedSearchTabs = REPORT_FINDER_SEARCHTABS.map((tab) => ({
    ...tab,
    title: t(tab.title),
  }))
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const relatedReportOptions = blockgroups
  ? getRelatedReportOptionsByReportType(blockgroups, reportType).map((option) => ({
    ...option,
    type: t(option.type as string),
  }))
    : []

  const onReportFinderClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <ReportFinderUI.Root
      className={twMerge("absolute top-10 right-0 z-10", !searchModalOpen && "p-2")}
    >
      {!searchModalOpen && (
        <>
          {isNational ? (
            <NationalHeader onReportFinderClose={onReportFinderClose} />
          ) : (
            <ReportsHeader onReportFinderClose={onReportFinderClose} />
          )}
          <ReportFinderUI.ReportOptionsMenu
            reportOptions={relatedReportOptions}
            fallbackText={t("location-insights:finder.map_instructions")}
            ReportLink={ReportLink}
            hideOptionsCategory={isNational}
          />
          <p className="text-xs font-semibold text-gray-700 pt-1 mb-2 w-full border-t lg:block">
            {t("location-insights:finder.looking_elsewhere")}
          </p>
        </>
      )}
      <ReportFinderUI.ReportSearchModal
        open={searchModalOpen}
        setOpen={setSearchModalOpen}
        tabs={translatedSearchTabs}
        onReportFinderClose={onReportFinderClose}
        triggerText={t("location-insights:finder.search_all")}
      >
        <ReportFinderUI.ModalTab id={REPORT_FINDER_SEARCHTABS[0].id}>
          <OpenSearch />
        </ReportFinderUI.ModalTab>
        <ReportFinderUI.ModalTab id={REPORT_FINDER_SEARCHTABS[1].id}>
          <Suspense fallback={null}>
            <FilteredSearch />
          </Suspense>
        </ReportFinderUI.ModalTab>
      </ReportFinderUI.ReportSearchModal>
    </ReportFinderUI.Root>
  )
}

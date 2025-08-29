import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { PaperPlaneIcon, ResetIcon } from "@radix-ui/react-icons"
import { PRINT_BLOCK } from "app/features/dashboard/dashboard.constants"
import { twMerge } from "tailwind-merge"
import { TesLogo } from "components/tes_logo"
import { useCopyRouteUrlToClipboard } from "react-hooks"
import { useState } from "react"
import { Blockgroup } from "@prisma/client"
import { ReportFinder } from "app/features/report-finder"
import { ReportType } from "app/features/report-finder/types"
import { useTranslation } from "react-i18next"

const buttonCX =
  "flex justify-center items-center text-white bg-brand-green-dark rounded-full hover:bg-brand-green w-[28px] h-[28px]"
const iconCX = "w-4 h-4"
const Logo = () => {
  return (
    <Link legacyBehavior href={Routes.Home()}>
      <TesLogo className="sm:w-20 sm:block hidden" />
    </Link>
  )
}

const Title = ({ location }: { location: string }) => {
  const { t } = useTranslation(["location-insights"])
  const cx = "sm:text-center flex-1"
  const titleCX = "text-brand-green-dark md:text-base sm:text-sm text-xs"
  const locationCx = "text-brand-gray-dark md:text-headline text-xl"

  return (
    <div className={cx}>
      <div className={titleCX}>{t("location-insights:header.title")}</div>
      <div className={locationCx}>{location}</div>
    </div>
  )
}

const CloseBTN = () => {
  const { t, i18n } = useTranslation(["location-insights"])
  const cx = "self-start flex-1 flex flex-row-reverse"
  const printCX = "print:hidden"
  return (
    <div className={twMerge(cx, printCX)}>
      <Link legacyBehavior href={`/map?lang=${i18n.language}`}>
        <a className={twMerge(buttonCX, "min-w-[32px] min-h-[30px] w-auto sm:px-2")}>
          <span className="uppercase text-annotation xl:inline mr-1 relative top-[1px] hidden text-white">
            {t("location-insights:search.back_to_map")}
          </span>
          <ResetIcon className={iconCX} />
        </a>
      </Link>
    </div>
  )
}

const CopyRouteURLButton = () => {
  const { t } = useTranslation(["location-insights"])
  const cx = "relative"
  const printCX = "print:hidden"
  const successCX = "absolute -top-1 left-3 border bg-white shadow rounded-lg text-xs p-2 z-10 min-w-[100px]"
  const { handleCopyClick, copySuccess } = useCopyRouteUrlToClipboard()

  return (
    <div className={twMerge(cx, printCX)}>
      <button onClick={handleCopyClick} className={buttonCX}>
        <PaperPlaneIcon className={iconCX} />
      </button>
      {copySuccess && <p className={successCX}>{t("location-insights:header.url_copied")}</p>}
    </div>
  )
}

const OpenReportFinderButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation(["location-insights"])
  return (
    <button onClick={onClick} className="underline text-gray-500 sm:text-sm text-xs">
      {t("location-insights:header.change_location")}
    </button>
  )
}

export const Header = ({
  title,
  reportType,
  blockgroups,
}: {
  title: string
  reportType: ReportType
  blockgroups: Blockgroup[]
}) => {
  const [reportFinderOpen, setReportFinderOpen] = useState(false)
  // flex items-center justify-center
  const topCX = "pt-8 bg-white xl:w-4/5 w-full m-auto px-2 sm:px-10 grid sm:grid-cols-3 grid-cols-2"

  const topPrintCX = twMerge(PRINT_BLOCK, "print:px-2")

  return (
    <>
      <section className={twMerge(topCX, topPrintCX)}>
        <Logo />
        <Title location={title} />
        <div className="flex flex-col justify-between items-end">
          <div className="flex flex-row gap-2 mb-4">
            <CloseBTN />
            <CopyRouteURLButton />
          </div>
          <div className="relative">
            <OpenReportFinderButton onClick={() => setReportFinderOpen(!reportFinderOpen)} />
            {reportFinderOpen && (
              <ReportFinder
                setOpen={setReportFinderOpen}
                reportType={reportType}
                blockgroups={blockgroups}
              />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

/* eslint-disable no-console */
import Link from "next/link"
import { useState, useEffect } from "react"
import { Routes } from "@blitzjs/next"
import { XCircleIcon } from "@heroicons/react/24/solid"
import { Share2Icon, FileTextIcon } from "@radix-ui/react-icons"
import {
  LOCALITY_REPORT_TYPE,
  REPORT_TYPE_TITLES,
  PRINT_BLOCK,
  REPORT_TYPE,
} from "app/features/report/report.constants"
import { twMerge } from "tailwind-merge"
import { getAssetUrl } from "app/constants"
import { RouteUrlObject } from "blitz"

const Logo = () => {
  const cx = "px-4 flex items-center flex-1"

  return (
    <div className={cx}>
      <Link legacyBehavior href={Routes.Home()}>
        <img src={getAssetUrl("tes-uk.svg")} />
      </Link>
    </div>
  )
}

const Title = ({ reportType }: { reportType: REPORT_TYPE }) => {
  const cx = "text-center flex-1"
  const titleCX = "text-gray-700 text-xs uppercase font-bold hidden sm:block"

  return (
    <div className={cx}>
      <div className={titleCX}>Tree Equity Score</div>
      <div className="text-brand-green-dark text-lg font-bold">
        {REPORT_TYPE_TITLES[reportType]} Report
      </div>
    </div>
  )
}

const CloseBTN = ({ closeRoute }: { closeRoute: { hash: string } & RouteUrlObject }) => {
  const cx = "self-start flex-1 flex flex-row-reverse"
  const printCX = "print:hidden"
  const iconCX = "text-gray-400 hover:text-brand-green"
  return (
    <div className={twMerge(cx, printCX)}>
      <Link legacyBehavior href={closeRoute}>
        <a className={iconCX}>
          <XCircleIcon className="w-6 h-6" />
        </a>
      </Link>
    </div>
  )
}
export const PrintReportButton = () => {
  const cx = "flex text-white bg-brand-green-dark rounded-full hover:shadow-lg px-4 py-1 mt-4"
  const printCX = "print:hidden"
  const iconCX = "mt-1 mr-2"

  const handlePrintClick = () => {
    window.print()
  }

  return (
    <button onClick={handlePrintClick} className={twMerge(cx, printCX)}>
      <FileTextIcon className={iconCX} />
      Export PDF
    </button>
  )
}

const CopyRouteURLButton = () => {
  const [copySuccess, setCopySuccess] = useState(false)
  const cx = "relative"
  const printCX = "print:hidden"
  const buttonCX = "flex text-white bg-brand-green-dark rounded-full hover:shadow-lg px-4 py-1"
  const iconCX = "mt-1 mr-2"
  const successCX = "absolute -top-1 left-3 border bg-white shadow rounded-lg text-xs p-2"

  const handleCopyClick = () => {
    const routeURL = window.location.href

    navigator.clipboard
      .writeText(routeURL)
      .then(() => {
        setCopySuccess(true)
      })
      .catch((error) => {
        console.error("Failed to copy route URL:", error)
      })
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(false)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [copySuccess])

  return (
    <div className={twMerge(cx, printCX)}>
      <button onClick={handleCopyClick} className={buttonCX}>
        <Share2Icon className={iconCX} />
        Share Report
      </button>
      {copySuccess && <p className={successCX}>Report URL Copied!</p>}
    </div>
  )
}

export const Header = ({ reportType, closeRoute, reportTitle, score }: { reportType: REPORT_TYPE, closeRoute: { hash: string } & RouteUrlObject, reportTitle: string, score: number }) => {
  const topCX =
    "pt-8 bg-white xl:w-4/5 w-full m-auto flex items-center justify-center px-2 sm:px-10"
  const bottomCX =
    "bg-white xl:w-4/5 w-full m-auto flex flex-col sm:flex-row items-center justify-between pt-8 sm:pt-16 pb-6 px-2 sm:px-10"
  const titleCX = "flex flex-col mb-4 sm:mb-0"
  const locationCX = "text-4xl text-gray-700 mb-2 sm:mb-4"
  const scoreCX = "text-2xl text-brand-green-dark font-bold"
  const buttonsCX = "flex flex-col justify-between"

  const topPrintCX = twMerge(PRINT_BLOCK, "print:px-2")
  const bottomPrintCX = twMerge(PRINT_BLOCK, "print:flex-row")
  return (
    <>
      <section className={twMerge(topCX, topPrintCX)}>
        <Logo />
        <Title reportType={reportType} />
        <CloseBTN closeRoute={closeRoute} />
      </section>

      <section className={twMerge(bottomCX, bottomPrintCX)}>
        <div className={titleCX}>
          <p className={locationCX}>{reportTitle}</p>
          {reportType === LOCALITY_REPORT_TYPE && (
            <p className={scoreCX}>Composite Score: {score}</p>
          )}
        </div>
        <div className={buttonsCX}>
          <div className="mb-2">
            <PrintReportButton />
          </div>
          <CopyRouteURLButton />
        </div>
      </section>
    </>
  )
}

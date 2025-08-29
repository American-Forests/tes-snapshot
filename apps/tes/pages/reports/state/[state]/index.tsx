import { BlitzPage, useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import { SymbolIcon } from "@radix-ui/react-icons"
import { StateReport } from "app/features/legacy-reports/state_report"
import { TES_NATIONAL_EXPLORER_TITLE } from "app/constants"

const StateReportPage: BlitzPage = () => {
  const stateAbbreviation = useParam("state", "string")!

  return (
    <Suspense
      fallback={
        <div className="p-2 flex items-center justify-center gap-x-2 py-4 text-gray-500">
          <SymbolIcon />
          Loading…
        </div>
      }
    >
      <StateReport abbreviation={stateAbbreviation} />
    </Suspense>
  )
}

StateReportPage.getLayout = (page) => <Layout title={TES_NATIONAL_EXPLORER_TITLE}>{page}</Layout>
export default StateReportPage

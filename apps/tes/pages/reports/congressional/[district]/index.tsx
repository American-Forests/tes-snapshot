import { BlitzPage, useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { Suspense } from "react"
import { SymbolIcon } from "@radix-ui/react-icons"
import { CongressionalDistrictReport } from "app/features/legacy-reports/congressional_report"
import { TES_NATIONAL_EXPLORER_TITLE } from "app/constants"

const CongressionalDistrictReportPage: BlitzPage = () => {
  const congressionalDistrictName = useParam("district", "string")!

  return (
    <Suspense
      fallback={
        <div className="p-2 flex items-center justify-center gap-x-2 py-4 text-gray-500">
          <SymbolIcon />
          Loading…
        </div>
      }
    >
      <CongressionalDistrictReport name={congressionalDistrictName} />
    </Suspense>
  )
}

CongressionalDistrictReportPage.getLayout = (page) => (
  <Layout title={TES_NATIONAL_EXPLORER_TITLE}>{page}</Layout>
)
export default CongressionalDistrictReportPage

import { useRouter } from "next/router"
import { BlitzPage, useParam } from "@blitzjs/next"
import { Routes } from "@blitzjs/next"
import { SymbolIcon } from "@radix-ui/react-icons"
import Layout from "app/core/layouts/Layout"
import { RegionalReport } from "app/features/legacy-reports/regional_report"
import React, { Suspense, useContext } from "react"
import { scenarioIdDecode } from "app/utils/formatting_utils"
import { styledButton2 } from "components/elements"
import { CityContext, WithCity } from "app/features/regional-map/regional-map.state"

const ReportPage: BlitzPage = () => {
  const id = useParam("id", "string")!
  const city = useParam("city", "string")!
  const router = useRouter()
  return (
    <WithCity>
      <Suspense
        fallback={
          <div className="p-2 flex items-center justify-center gap-x-2 py-4 text-gray-500">
            <SymbolIcon />
            Loading…
          </div>
        }
      >
        {scenarioIdDecode(id) ? (
          <RegionalReport id={scenarioIdDecode(id)!} />
        ) : (
          <div className="flex items-center justify-between flex-col h-20 mt-12">
            <div>This scenario no longer exists</div>
            <button
              className={styledButton2({ variant: "primary" })}
              type="button"
              onClick={() => {
                router.push(Routes.Map({ city: city as string }))
              }}
            >
              Return to map
            </button>
          </div>
        )}
      </Suspense>
    </WithCity>
  )
}

ReportPage.getLayout = (page) => {
  const ReportLayout = () => {
    const city = useContext(CityContext)
    return <Layout title={`TESA ${city?.shortTitle || ""} Report`}>{page}</Layout>
  }

  return (
    <WithCity>
      <ReportLayout />
    </WithCity>
  )
}

export default ReportPage

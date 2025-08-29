import { BlitzPage } from "@blitzjs/next"
import { TES_NATIONAL_EXPLORER_TITLE } from "app/constants"
import Layout from "app/core/layouts/Layout"
import NationalMap from "app/features/national-map"
import { NoSSR } from "components/nossr"
import { Suspense } from "react"
import { TESReleaseBanner } from "app/features/dashboard/components/release-banner"
import { useTranslation } from "react-i18next"

const NationalExplorer: BlitzPage = () => {
  const { i18n } = useTranslation()
  const showBanner = i18n?.language === "en"
  return (
    <Suspense fallback={null}>
      <NoSSR>
        {showBanner && <TESReleaseBanner />}
        <NationalMap />
      </NoSSR>
    </Suspense>
  )
}

NationalExplorer.getLayout = (page) => <Layout title={TES_NATIONAL_EXPLORER_TITLE}>{page}</Layout>
export default NationalExplorer

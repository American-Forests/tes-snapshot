import { BlitzPage } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout"
import { LocationLandingPage } from "components/location_landing_page"
import { useContext } from "react"
import { CityContext, WithCity } from "app/features/regional-map/regional-map.state"

const LandingPage: BlitzPage = () => {
  return (
    <WithCity>
      <LocationLandingPage />
    </WithCity>
  )
}

LandingPage.getLayout = (page) => {
  const LandingPageLayout = () => {
    const city = useContext(CityContext)
    return <Layout title={`TESA ${city?.shortTitle || ""}`}>{page}</Layout>
  }

  return (
    <WithCity>
      <LandingPageLayout />
    </WithCity>
  )
}
export default LandingPage

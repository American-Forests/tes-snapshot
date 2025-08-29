import { BlitzPage } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout"

const HealthPage: BlitzPage = () => {
  return (
    <div>
      <h1>Health Check</h1>
      <p>The application is running successfully.</p>
    </div>
  )
}

HealthPage.getLayout = (page) => <Layout title="Health Check">{page}</Layout>

export default HealthPage

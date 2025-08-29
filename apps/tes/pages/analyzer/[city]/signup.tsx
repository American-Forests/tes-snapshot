import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import SingleFormLayout from "app/core/layouts/single_form_layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { useContext } from "react"
import { CityContext } from "app/features/regional-map/regional-map.state"

const SignupPage: BlitzPage = () => {
  const city = useContext(CityContext)!
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push(Routes.Map({ city: city.id }))} />
      <style jsx global>{`
        html {
          min-height: 100%;
        }
        body {
          min-height: 100%;
          background-image: url(/mike-kurz-BN8wDkEmEWY-unsplash.jpg);
          background-size: cover;
          background-position: bottom;
        }
      `}</style>
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <SingleFormLayout title="Sign Up">{page}</SingleFormLayout>

export default SignupPage

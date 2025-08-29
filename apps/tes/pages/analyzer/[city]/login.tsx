import { BlitzPage } from "@blitzjs/next"
import { useRouter } from "next/router"
import SingleFormLayout from "app/core/layouts/single_form_layout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <SingleFormLayout title="Log In">{page}</SingleFormLayout>

export default LoginPage

import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { useContext } from "react"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import SingleFormLayout from "app/core/layouts/single_form_layout"
import { LocalCTA } from "components/local_cta"
import { CityContext } from "app/features/regional-map/regional-map.state"

const ForgotPasswordPage: BlitzPage = () => {
  const city = useContext(CityContext)!
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <div>
      <LocalCTA />

      <h1 className="pt-8 font-bold pb-2">Forgot your password?</h1>

      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </div>
      ) : (
        <Form
          submitText="Send Reset Password Instructions"
          schema={ForgotPassword}
          initialValues={{ email: "", city: city.id }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
            } catch (error) {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
        </Form>
      )}
    </div>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => (
  <SingleFormLayout title="Forgot Your Password?">{page}</SingleFormLayout>
)

export default ForgotPasswordPage

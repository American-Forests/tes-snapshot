import { useMutation } from "@blitzjs/rpc";
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { styledButton2 } from "components/elements"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { formWrapperDivClass, LoginSwitcher } from "./LoginForm"
import { TesLogo } from "components/tes_logo"
import { LocalCTA } from "components/local_cta"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="space-y-8">
      <TesLogo className="w-28" />
      <LocalCTA />
      <LoginSwitcher active="signup" />

      <Form
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <div className={formWrapperDivClass}>
          <LabeledTextField name="email" variant="noborder" label="Email" placeholder="Email" />
          <LabeledTextField
            name="password"
            variant="noborder"
            label="Password"
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="flex pt-8 items-center justify-between">
          <button className={styledButton2({ variant: "primary", size: "md" })} type="submit">
            Signup
          </button>
        </div>
      </Form>
    </div>
  )
}

export default SignupForm

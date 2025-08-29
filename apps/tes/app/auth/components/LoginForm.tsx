import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { A, styledButton2 } from "components/elements"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { TesLogo } from "components/tes_logo"
import { useContext } from "react"
import { CityContext } from "app/features/regional-map/regional-map.state"
import { LocalCTA } from "components/local_cta"
import { AuthenticationError } from "blitz"

type LoginFormProps = {
  onSuccess?: () => void
}

export const formWrapperDivClass =
  "space-y-3 mt-6 bg-white border border-gray-300 shadow-lg divide-y divide-gray-100"

export function LoginSwitcher({ active }: { active: "login" | "signup" }) {
  const city = useContext(CityContext)!
  const a = "text-sm uppercase font-semibold text-brand-green border-b-2 border-brand-green"
  const b = "text-sm uppercase font-semibold text-gray-500"

  return (
    <div className="flex gap-x-4">
      <Link legacyBehavior href={Routes.LoginPage({ city: city.id })}>
        <a className={active === "login" ? a : b}>Login</a>
      </Link>
      <Link legacyBehavior href={Routes.SignupPage({ city: city.id })}>
        <a className={active === "signup" ? a : b}>Sign up</a>
      </Link>
    </div>
  )
}

export const LoginForm = (props: LoginFormProps) => {
  const city = useContext(CityContext)!
  const [loginMutation] = useMutation(login)

  return (
    <div className="space-y-8">
      <TesLogo className="w-28" />
      <LocalCTA />
      <LoginSwitcher active="login" />

      <Form
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <div className={formWrapperDivClass}>
          <LabeledTextField variant="noborder" name="email" label="Email" placeholder="Email" />
          <LabeledTextField
            variant="noborder"
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="flex pt-8 items-center justify-between">
          <button className={styledButton2({ variant: "primary", size: "md" })} type="submit">
            Login
          </button>
          <Link legacyBehavior href={Routes.ForgotPasswordPage({ city: city.id })}>
            <A variant="quiet">Forgot password?</A>
          </Link>
        </div>
      </Form>

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

export default LoginForm

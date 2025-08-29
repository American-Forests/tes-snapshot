import { withBlitz } from "app/blitz-client"
import { useQueryErrorResetBoundary } from "@blitzjs/rpc"
import { AuthenticationError, AuthorizationError } from "blitz"
import { AppProps, ErrorBoundary, ErrorComponent, ErrorFallbackProps } from "@blitzjs/next"

import LoginForm from "app/auth/components/LoginForm"
import "styles/globals.css"
import "mapbox-gl/dist/mapbox-gl.css"
import SingleFormLayout from "app/core/layouts/single_form_layout"
import Observability from "app/features/observability"

import "app/features/i18n/i18n"

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      <Observability />
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return (
      <SingleFormLayout>
        <LoginForm onSuccess={resetErrorBoundary} />
      </SingleFormLayout>
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}

export default withBlitz(App)

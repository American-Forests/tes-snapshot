import Head from "next/head";
import { ReactNode } from "react"
import { WithCity } from "app/features/regional-map/regional-map.state"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const SingleFormLayout = ({ title, children }: LayoutProps) => {
  return (
    <WithCity>
      <Head>
        <title>{title || "TESA Login/Signup"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex">
        <div className="bg-gray-100 border-r border-gray-400 p-10 w-full max-w-xl">
          {children}
          <p className="pt-5 pl-2 pr-10 text-gray-700 text-sm">
            Welcome! Log in to get started. If this is your first time, sign up to create a free
            account. Your account ensures that your work on the platform is securely stored for
            future access.
          </p>
        </div>
      </div>
    </WithCity>
  )
}

export default SingleFormLayout

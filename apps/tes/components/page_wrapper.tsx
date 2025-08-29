import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Head from "next/head"
import Footer from "components/footer"
import dynamic from 'next/dynamic'
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })

const linkClass = (active: boolean) =>
  `p-4 text-lg text-center border-b-4 ${
    active
      ? "border-brand-green"
      : "border-gray-100 hover:border-brand-green text-gray-500 hover:text-black"
  }`

/*
 * https://unsplash.com/photos/01Qqkfz-ck8
 */

export default function PageWrapper({
  children,
  tabs,
  noProse,
  meta,
}: {
  children: React.ReactNode
  tabs?: boolean
  noProse?: boolean
  meta: {
    title: string
  }
}) {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>{meta.title} | Tree Equity Score</title>
      </Head>
      <div className="bg-gray-50">
        <Header />
      </div>
      <div
        className="border-t border-gray-200 bg-gray-100"
        style={{
          backgroundImage: `url(${router.pathname}.jpg)`,
          backgroundSize: "auto 300px",
          backgroundRepeat: "repeat-x",
        }}
      >
        <div className="max-w-3xl py-0 mx-auto md:py-10">
          <div className="p-10 bg-white rounded-none shadow-none sm:rounded-lg sm:shadow-md">
            {tabs ? (
              <div className="pb-4 -mt-4 md:pb-8">
                <div className="grid md:grid-cols-3">
                  <Link legacyBehavior href="/methodology">
                    <a className={linkClass(router.pathname === "/methodology")}>Methodology</a>
                  </Link>
                  <Link legacyBehavior href="/datasources">
                    <a className={linkClass(router.pathname === "/datasources")}>Data sources</a>
                  </Link>
                  <Link legacyBehavior href="/data">
                    <a className={linkClass(router.pathname === "/data")}>Data</a>
                  </Link>
                </div>
              </div>
            ) : null}
            <h1 className="pb-8 text-4xl font-bold">{meta.title}</h1>
            <div className={`${noProse ? "" : "prose lg:prose-lg"} max-w-none `}>{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

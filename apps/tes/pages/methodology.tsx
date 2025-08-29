import { useRouter } from "next/router"
import { BlitzPage } from "@blitzjs/next"
import dynamic from 'next/dynamic'
import Layout from "app/core/layouts/Layout"
import { MouseEvent, useCallback, useState, useEffect } from "react"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import { 
  FAQS_TRANSLATION_KEYS,
  LOCAL_DATA_GLOSSARY_TRANSLATION_KEYS
} from "app/features/i18n/i18n.constants"
// Dynamic import to avoid SSR and hydration errors
const Header = dynamic(() => import('components/header'), { ssr: false })
const DataDownload = dynamic(() => import('app/features/methods-and-data/components/data-download'), { ssr: false })
const MethodsPanel = dynamic(() => import('app/features/methods-and-data/components/methods'), { ssr: false })
import Footer from "components/footer"
import { TranslatedAccordion } from "app/features/methods-and-data/components/translated-accordion"

const tabs = [
  { label: "methods", slug: "methods" },
  { label: "data glossary", slug: "data-glossary" },
  { label: "faqs", slug: "faqs" },
  { label: "data download", slug: "data-download" },
]



const Tab = ({
  label,
  handleClick,
  isSelected,
  }: {
    label: string
    handleClick: (event: MouseEvent) => void
    isSelected: boolean
  }) => (
  <div className="relative">
    <button
      onClick={handleClick}
      className={`relative font-semibold uppercase tracking-wider h-12 md:px-4 px-2 text-white lg:text-base sm:text-sm text-xs focus:outline-none focus:ring focus:ring-brand-green ${
        isSelected ? "bg-brand-green-dark focus:ring-transparent" : "bg-transparent"
      }`}
    >
      {label}
    </button>
    {isSelected && (
      <div className="absolute bg-brand-green-dark h-12 w-full bottom-triangle -bottom-[calc(3rem-1px)]" />
    )}
  </div>
)


const Methodology: BlitzPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("methods")

  useEffect(() => {
    const tabParam = router?.query?.tab as string
    const foundTab = tabs.find((tab) => tab.slug === tabParam)
    foundTab && setActiveTab(foundTab.label.toLowerCase())
  }, [router])

  const handleTabSelection = useCallback(
    (event: MouseEvent, tab: (typeof tabs)[0]) => {
      event.preventDefault()
      setActiveTab(tab.label.toLowerCase())
      router.push(`/methodology?tab=${tab.slug}`, undefined, { shallow: true })
    },
    [router]
  )
  // ensure active tab updates when new link is clicked
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const tabParam = new URLSearchParams(url.split("?")[1]).get("tab")
      const foundTab = tabs.find((tab) => tab.slug === tabParam)
      if (foundTab) {
        setActiveTab(foundTab.label.toLowerCase())
      }
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router])


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#ECF5F2]">
      <div className="bg-white">
        <Header />
      </div>
      <div
        className="bg-white pt-32"
        style={{
          backgroundImage: `url(${STATIC_ASSETS_CLOUDFRONT_URL}/Parcel_Tree_Banner_DarkerGr_gdt.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          imageRendering: "crisp-edges",
        }}
      >
        <div className="md:w-4/5 w-11/12 m-auto flex flex-col h-full justify-between">
          <p className="xl:text-[46px] lg:text-[40px] text-3xl md:leading-snug font-medium text-white pb-14">
            Methods & Data
          </p>
          <div className="xl:w-3/5 lg:w-4/5 w-full m-auto flex flex-row justify-between">
            {tabs.map((tab) => (
              <Tab
                key={tab.slug}
                label={tab.label}
                handleClick={(event) => handleTabSelection(event, tab)}
                isSelected={activeTab === tab.label.toLowerCase()}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="xl:w-1/2 lg:w-2/3 md:w-4/5 w-11/12 mx-auto my-16 border-t-2 border-t-brand-green">
        {activeTab === "methods" && <MethodsPanel />}
        {activeTab === "data glossary" && 
        <TranslatedAccordion translationKeys={LOCAL_DATA_GLOSSARY_TRANSLATION_KEYS} />}
        {activeTab === "faqs" && 
        <TranslatedAccordion translationKeys={FAQS_TRANSLATION_KEYS} />}
        {activeTab === "data download" && <DataDownload />}
      </div>
      <Footer />
    </div>
  )
}

Methodology.suppressFirstRenderFlicker = true
Methodology.getLayout = (page) => <Layout title="Methods & Data">{page}</Layout>

export default Methodology

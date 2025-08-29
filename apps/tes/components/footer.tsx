import {
  AF_CAREER_RESOURCES_LINK,
  AF_LINK,
  ONE_T_ORG_LINK,
  TES_NATIONAL_EXPLORER_ABOUT_LINK,
  TES_NATIONAL_EXPLORER_CONTACT_LINK,
  TES_NATIONAL_EXPLORER_METHODOLOGY_LINK,
  TES_NATIONAL_EXPLORER_STORIES_LINK,
  TES_NATIONAL_EXPLORER_DATA_GLOSSARY_LINK,
  TES_NATIONAL_EXPLORER_FAQ_LINK,
  TES_NATIONAL_EXPLORER_DATA_DOWNLOAD_LINK,
  TES_NATIONAL_EXPLORER_DEMO_LINK,
  TES_NATIONAL_EXPLORER_STARTER_GUIDE_LINK,
  TES_NATIONAL_EXPLORER_RESOURCES_TAB_LINK,
  VIBRANT_CITIES_LAB_LINK,
  TES_UK_NATIONAL_EXPLORER_HOME_LINK,
} from "app/constants"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import Link from "next/link"
import { CITIES } from "app/features/regional-map/regional-map.constants"
import { TesLogo } from "./tes_logo"
import { clearMapPositionSessionStorage } from "hooks/use_map"

const MORE = [
  {
    name: "About Tree Equity Score",
    link: TES_NATIONAL_EXPLORER_ABOUT_LINK,
  },
  {
    name: "Methods",
    link: TES_NATIONAL_EXPLORER_METHODOLOGY_LINK,
  },
  {
    name: "Data Glossary",
    link: TES_NATIONAL_EXPLORER_DATA_GLOSSARY_LINK,
  },
  {
    name: "FAQs",
    link: TES_NATIONAL_EXPLORER_FAQ_LINK,
  },
  {
    name: "Data Download",
    link: TES_NATIONAL_EXPLORER_DATA_DOWNLOAD_LINK,
  },
  {
    name: "Stories",
    link: TES_NATIONAL_EXPLORER_STORIES_LINK,
  },
  {
    name: "Watch the Demo",
    link: TES_NATIONAL_EXPLORER_DEMO_LINK,
  },
  {
    name: "Starter Guide",
    link: TES_NATIONAL_EXPLORER_STARTER_GUIDE_LINK,
  },
  {
    name: "More Resources",
    link: TES_NATIONAL_EXPLORER_RESOURCES_TAB_LINK,
  },
  {
    name: "Contact Us",
    link: TES_NATIONAL_EXPLORER_CONTACT_LINK,
  },
]

const RESOURCES = [
  {
    name: "Vibrant Cities Lab",
    link: VIBRANT_CITIES_LAB_LINK,
  },
  {
    name: "1T.org",
    link: ONE_T_ORG_LINK,
  },
  {
    name: "Career Resources",
    link: AF_CAREER_RESOURCES_LINK,
  },
]

// sort cities alphabetically
CITIES.sort((a, b) => a.title.localeCompare(b.title))

export default function Footer() {
  const router = useRouter()
  return (
    <div
      className="bg-[#ECF5F2]"
      style={{
        backgroundImage: "url(/tes-footer-gradient.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        imageRendering: "crisp-edges",
      }}
    >
      <div className="lg:w-4/5 w-11/12 m-auto grid grid-cols-3 lg:grid-cols-6 md:grid-cols-5 gap-6 md:gap-10 pt-36 pb-16">
        <div>
          <h2 className="text-lg font-bold pb-3 text-brand-green-dark">National Explorer</h2>
          <button
            onClick={() => {
              clearMapPositionSessionStorage()
              router.push(Routes.NationalExplorer())
            }}
          >
            <a className="text-sm text-brand-green-dark hover:underline underline-offset-4 decoration-4 decoration-[#f9c793]">
              Explore the map
            </a>
          </button>
        </div>
        <div>
          <h2 className="text-lg font-bold pb-3 text-brand-green-dark">Local Analyzers</h2>
          {CITIES.filter((city) => city.id != "national").map(
            (city, i) => {
              return (
                <Link legacyBehavior key={i} href={Routes.LandingPage({ city: city.id })}>
                  <a>
                    <div className="text-sm text-brand-green-dark pb-1.5 hover:underline underline-offset-4 decoration-4 decoration-[#f9c793]">
                      {city.title}
                    </div>
                  </a>
                </Link>
              )
            }
          )}
          <Link legacyBehavior href="/analyzer">
            <a className="text-sm text-brand-green-dark hover:underline underline-offset-4 decoration-4 decoration-[#f9c793]">
              Learn about Analyzers
            </a>
          </Link>
        </div>
        <div>
          <h2 className="text-lg font-bold pb-3 text-brand-green-dark">International</h2>
          <Link legacyBehavior href={TES_UK_NATIONAL_EXPLORER_HOME_LINK}>
            <a className="text-sm">
              <div className="text-brand-green-dark pb-1.5 hover:underline underline-offset-4 decoration-4 decoration-[#f9c793]">
                UK
              </div>
            </a>
          </Link>
        </div>
        <div>
          <h2 className="text-lg font-bold pb-3 text-brand-green-dark">More</h2>
          {MORE.map((item, i) => {
            return (
              <Link legacyBehavior key={i} href={`${item.link}`}>
                <a className="text-sm">
                  <div className="text-brand-green-dark pb-1.5 hover:underline underline-offset-4 decoration-4 decoration-[#f9c793]">
                    {item.name}
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
        <div>
          <h2 className="text-lg font-bold pb-3 text-brand-green-dark">Resources</h2>
          {RESOURCES.map((item, i) => {
            return (
              <Link legacyBehavior key={i} href={`${item.link}`}>
                <a className="text-sm" target="_blank" rel="noreferrer noopener">
                  <div className="text-brand-green-dark pb-1.5 hover:underline underline-offset-4 decoration-4 decoration-[#f9c793]">
                    {item.name}
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
        <div className="font-bold text-slate-700 text-lg text-center col-span-3 md:col-span-1">
          <Link legacyBehavior href="https://give.americanforests.org/ways-to-give/donate-now/">
            <a
              target="blank"
              rel="noreferrer noopener"
              className="inline-block rounded-full transition duration-500 ease-in-out bg-brand-green hover:bg-[#005251] hover:text-white py-2.5 px-[1.75rem]"
            >
              Donate
            </a>
          </Link>
          <h2 className="pt-10 pb-1">Connect</h2>
          <div className="flex">
            <Link legacyBehavior href="http://twitter.com/AmericanForests">
              <a target="blank" rel="noreferrer noopener">
                <img
                  alt=""
                  src="/icons/social-twitter.svg"
                  className="hover:bg-brand-green rounded-full"
                />
              </a>
            </Link>
            <Link legacyBehavior href="http://facebook.com/AmericanForests">
              <a target="blank" rel="noreferrer noopener">
                <img
                  alt=""
                  src="/icons/social-facebook.svg"
                  className="hover:bg-brand-green rounded-full"
                />
              </a>
            </Link>
            <Link legacyBehavior href="http://instagram.com/AmericanForests">
              <a target="blank" rel="noreferrer noopener">
                <img
                  alt=""
                  src="/icons/social-instagram.svg"
                  className="hover:bg-brand-green rounded-full"
                />
              </a>
            </Link>
            <Link legacyBehavior href="https://www.linkedin.com/company/american-forests/">
              <a target="blank" rel="noreferrer noopener">
                <img
                  alt=""
                  src="/icons/social-linkedin.svg"
                  className="hover:bg-brand-green rounded-full"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-2 col-span-3 m-auto gap-x-4">
          <TesLogo className="w-28 inline md:ml-0 m-auto" />
          <Link legacyBehavior href={AF_LINK}>
            <img src="/af-logo.svg" className="w-48 inline md:ml-0 m-auto" />
          </Link>
          <p className="text-xs pt-2 pl-2 text-gray-600">
            Made possible with tree canopy provided by{" "}
            <img className="inline h-6" src="/google.png" />
          </p>
        </div>
        <div className="text-brand-green-dark leading-relaxed text-center md:text-right col-span-3 md:col-span-1 lg:col-span-2">
          <p className="font-semibold text-sm">American Forests</p>
          <p className="text-sm">
            1220 L Street, NW,
            <br />
            Suite 750
            <br />
            Washington, DC 20005
          </p>
        </div>
        <div className="text-xs leading-relaxed text-gray-600 lg:col-span-2 md:col-span-5 col-span-3">
          American Forests is a nonprofit, tax-exempt charitable organization under Section
          501(c)(3) of the U.S. Internal Revenue Code. Donations are tax-deductible as allowed by
          law.
          <br />
          <br />
          Copyright © {new Date().getFullYear()} American Forests. All Rights Reserved.
          <Link legacyBehavior href="/privacy">
            <a className="text-brand-green-dark"> Privacy Policy.</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

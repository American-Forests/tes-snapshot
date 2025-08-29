import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import { twMerge } from "tailwind-merge"
const sectionCX =
  "bg-brand-green-darker z-20 items-center text-center text-white font-base lg:flex hidden p-2"
const paragraphCX = "xl:text-[.9em] text-xs w-full"
export const ReleaseBanner = () => {
  return (
    <section className={sectionCX}>
      <p className={paragraphCX}>
        <span className="font-bold">FEATURE UPDATE!</span> Tree Equity Score 'Reports' are now
        'Location Insights.' All the features you know and love are still here, along with fresh
        insights, visuals, and never-before-seen data in this supercharged toolkit. Learn more{" "}
        <a
          href={`${STATIC_ASSETS_CLOUDFRONT_URL}/TreeEquityScoreLocationInsights_GetStartedGuide.pdf`}
          target="_blank"
          rel="noreferrer noopener"
          className="underline"
        >
          here.
        </a>
      </p>
    </section>
  )
}

export const TESReleaseBanner = () => {
  return (
    <section className={sectionCX}>
      <p className={paragraphCX}>
        <span className="font-bold">NEW SHADE DATA AVAILABLE!</span> We partnered with UCLA Luskin Center for Innovation to bring you 
        shade cover for 360+ of the largest US cities — now available in the map layers! Learn more{" "}
        <a
          href={`${STATIC_ASSETS_CLOUDFRONT_URL}/AmericanForests_TreeEquityScore_NewShadeData_1-Pager.pdf`}
          target="_blank"
          rel="noreferrer noopener"
          className="underline"
        >
          here.
        </a>
      </p>
    </section>
  )
}

export const TESAReleaseBanner = () => {
  return (
    <section className={sectionCX}>
      <p className={paragraphCX}>
        <span className="font-bold">NEW SHADE DATA AVAILABLE! </span>
        We partnered with UCLA Luskin Center for Innovation to bring you 
        shade cover estimates  — now available in the map layers!
      </p>
    </section>
  )
}

export const I18nReleaseBanner = ({ lng }: { lng: "en" | "es" }) => {
  const copy = lng === "en" ? 
  ['For the first time, Tree Equity Score is available in Spanish! Click on "EN" in the top right to switch.', 
    '¡Por primera vez, Tree Equity Score está disponible en español! Haz clic en “EN” en la parte superior derecha para cambiar.'] : 
    ['¡Por primera vez, Tree Equity Score está disponible en español! Haz clic en “ES” en la parte superior derecha para cambiar.',
    'For the first time, Tree Equity Score is available in Spanish! Click on "ES" in the top right to switch.']
  return (
    <section className={twMerge(sectionCX, "flex flex-col")}>
      {copy.map((text, index) => (
        <p className={paragraphCX} key={index}>
          {text}
        </p>
      ))}
    </section>
  )
}
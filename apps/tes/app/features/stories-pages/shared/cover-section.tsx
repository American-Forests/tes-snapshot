import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import { CoverSectionProps } from "./types"

const CoverSection = ({
  location,
  title,
  subtitle,
  coverImage,
  locationColor,
  titleColor,
  titleLength = "short"
}: CoverSectionProps) => (
  <section
    style={{
      backgroundColor: "#000000",
      color: "#FFFFFF",
    }}
  >
    <div className="grid lg:grid-cols-2 grid-cols-1 h-screen lg:h-screen">
      <div className="text-left w-4/5 xl:w-3/4 pl-0 lg:pl-12 m-auto h-[50vh] lg:h-screen flex-row content-center">
        <div className="flex flex-row h-[10%] -ml-2">
          <img
            src={`${STATIC_ASSETS_CLOUDFRONT_URL}/AF-Logo-Knockout-LtGreen-Horiz.png`}
            className="h-8 lg:h-10 xl:h-16 mr-2 inline -mt-2 md:mt-0"
            alt="American Forest Logo"
          />
          <img
            src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/LCILogo.svg`}
            className="h-6 lg:h-8 xl:h-12 pt-2 xl:pt-4 inline -mt-2 md:mt-0"
            alt="LCI Logo"
          />
        </div>
        <div className="h-[70%] content-center">
          <div className={`text-xs lg:text-base xl:text-xl font-bold tracking-wider text-[${locationColor}]`}>{location}</div>
          <div>
            <p
              id="shade-start"
              className={`${titleColor} ${
                titleLength === "long" 
                  ? "text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-6 lg:leading-8 xl:leading-9 2xl:leading-12" 
                  : "text-2xl sm:text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl leading-6 sm:leading-7 md:leading-11 xl:leading-11 2xl:leading-11"
              } font-bold tracking-wide pt-0 lg:pt-2`}
            >
              {title}
            </p>
            <div className="text-[0.82rem] md:text-sm lg:text-lg xl:text-xl pt-1 lg:pt-4 pr-0 lg:pr-12 leading-4 md:leading-4 lg:leading-5 xl:leading-6">
              {subtitle}
            </div>
          </div>
        </div>
        <div className="flex items-center mt-1 md:mt-0">
          <div className="text-xs lg:text-sm xl:text-base pb-1 pr-4 font-bold tracking-wider">SCROLL TO READ</div>
          <div className="animate-bounce">
            <img
              src={`${STATIC_ASSETS_CLOUDFRONT_URL}/icons/down-caret.svg`}
              className="h-2.5 md:h-3.5"
            />
          </div>
        </div>
      </div>
      <div>
        <img
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/stories/${coverImage}`}
          className="w-full h-[50vh] lg:h-screen object-cover object-center"
        />
      </div>
    </div>
  </section>
)

export default CoverSection
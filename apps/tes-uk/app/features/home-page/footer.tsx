import Link from "next/link";
import Logos from "app/features/home-page/logos"
import { PRIVACY_POLICY_LINK, getAssetUrl } from "app/constants"

const Footer = () => {
  return (
    <div
      className="bg-[#ECF5F2]"
      style={{
        backgroundImage: `url(${getAssetUrl("footer_pattern.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        imageRendering: "crisp-edges",
      }}
    >
      <div className="xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-3/5 w-11/12 m-auto pt-36 pb-16">
        <div className="flex place-content-center">
          <Logos />
        </div>
        <div className="pt-4 text-center text-black text-xs tracking-wide">
          <p className="pb-4">
            Made possible with tree canopy provided by{" "}
            <img className="inline h-6" src={getAssetUrl("google.png")} />
          </p>
          <p>
            Copyright © {new Date().getFullYear()} American Forests. All Rights Reserved.
            <Link legacyBehavior href={PRIVACY_POLICY_LINK}>
              <a className="text-brand-green-dark"> Privacy Policy.</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer

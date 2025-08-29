import Link from "next/link";
import { AF_LINK, WOODLAND_TRUST_LINK, CSH_LINK, getAssetUrl } from "app/constants"

const Logos = () => {
  return (
    <div className="flex xl:space-x-8 lg:space-x-5 space-x-2">
      <Link legacyBehavior href={WOODLAND_TRUST_LINK}>
        <a target="blank" rel="noreferrer noopener">
          <img
            alt=""
            src={getAssetUrl("woodland-trust-logo.svg")}
            className="inline-block w-[135px]"
          />
        </a>
      </Link>
      <Link legacyBehavior href={AF_LINK}>
        <a target="blank" rel="noreferrer noopener">
          <img alt="" src={getAssetUrl("af-logo.svg")} className="inline-block w-[250px] -mt-2" />
        </a>
      </Link>
      <Link legacyBehavior href={CSH_LINK}>
        <a target="blank" rel="noreferrer noopener">
          <img alt="" src={getAssetUrl("csh-logo.svg")} className="inline-block w-[190px]" />
        </a>
      </Link>
    </div>
  )
}

export default Logos

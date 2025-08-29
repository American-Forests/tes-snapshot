import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { CITIES } from "../app/features/regional-map/regional-map.constants"

// sort cities alphabetically
CITIES.sort((a, b) => a.title.localeCompare(b.title))

export default function ChooseAnalyzer(props: { text: string; className?: string }) {
  const router = useRouter()
  const { text, className } = props
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={`${className}`}>
          <span className="inline">{text} </span>
          <ChevronDownIcon className="inline -mt-1" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sideOffset={5}>
        <div className="shadow bg-white py-2 mr-4">
          {router.pathname !== Routes.TesaHome().pathname && (
            <DropdownMenu.Item key="analyzers">
              <Link legacyBehavior href={Routes.TesaHome()}>
                <a>
                  <p className="text-brand-green-dark font-extrabold py-1.5 pl-4 hover:underline underline-offset-8 decoration-4 decoration-[#f9c793]">
                    Explore analyzers
                  </p>
                </a>
              </Link>
            </DropdownMenu.Item>
          )}
          {CITIES.filter((city) => city.id != "national").map(
            (city, i) => {
              return (
                <DropdownMenu.Item key={city.id}>
                  <Link legacyBehavior key={i} href={Routes.LandingPage({ city: city.id })}>
                    <a>
                      <p className="text-brand-green-dark font-medium py-1.5 pl-4 pr-6 hover:underline underline-offset-8 decoration-4 decoration-[#f9c793]">
                        {city.title}
                      </p>
                    </a>
                  </Link>
                </DropdownMenu.Item>
              )
            }
          )}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

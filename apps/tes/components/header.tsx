import { RouteUrlObject } from "blitz"
import Link from "next/link"

import { TesLogo } from "./tes_logo"
import ChooseAnalyzer from "./choose_analyzer"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ChevronRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { MENU_ITEMS, STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import { env } from "lib/env"
import MainLanguageSwitch from "app/features/i18n/components/main-switch"
import { useTranslation } from "react-i18next"

export type MenuItem = {
  name: string
  link: RouteUrlObject | string
  image?: string
  action?: boolean
  type: "item"
}

export type NestedMenuItem = {
  name: string
  items: MenuItem[]
  type: "nested"
}

const DropdownMenuItem = (item: MenuItem) => {
  const { t } = useTranslation(["common"])
  return (
    <DropdownMenu.Item key={item.name}>
      <Link legacyBehavior href={item.link}>
        <a>
          <p className="text-brand-green-dark font-medium py-2 pl-4 pr-6 hover:underline underline-offset-8 decoration-4 decoration-[#f9c793] capitalize">
            {item.image && (
              <img
                className="w-5 inline mr-3 -mt-1"
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/${item.image}`}
              />
            )}
            {t(item.name)}
          </p>
        </a>
      </Link>
    </DropdownMenu.Item>
  )
}

function Menu() {
  const { t } = useTranslation(["common"])
  
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <HamburgerMenuIcon className="text-brand-green-dark hover:text-brand-green hover:transition-color duration-500 md:w-12 w-10 md:h-10 h-8" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sideOffset={5}>
        <div className="shadow bg-white lg:mr-28 mr-1 py-2 text-left">
          {MENU_ITEMS.map((item) =>
            item.type === "nested" ? (
              // Add key to Sub component
              <DropdownMenu.Sub key={item.name}>
                <DropdownMenu.SubTrigger className="text-brand-green-dark font-medium py-1.5 pl-4 pr-16 hover:underline underline-offset-8 decoration-4 decoration-[#f9c793]">
                  {t(item.name)} <ChevronRightIcon className="inline -mt-1" />
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <div className="shadow bg-white pt-1.5 text-left">
                    {item.items.map((subItem) => (
                      // Add key to div wrapper
                      <div key={subItem.name} className="pb-1.5">
                        <DropdownMenuItem {...subItem} />
                      </div>
                    ))}
                  </div>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            ) : (
              // Add key to non-nested items
              <DropdownMenuItem key={item.name} {...item} />
            )
          )}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default function Header() {
  const { t } = useTranslation(["common"])
  
  return (
    <div>
      <div className="py-1 flex justify-between items-center relative z-50">
        <div className="lg:pl-[10%] pl-[2%]">
          <Link legacyBehavior href="/">
            <a>
              <TesLogo className="md:w-28 sm:w-24 w-20 pr-[4%] md:inline border-r border-gray-300 md:border-solid border-none " />
              <img className="w-52 md:inline hidden" src="/af-logo.svg" alt={t("common:american_forests")} />
            </a>
          </Link>
        </div>
        <div className="lg:pr-[10%] pr-[2%] flex items-center sm:pl-0 pl-4 py-5 gap-x-4 lg:gap-x-10 xl:gap-x-20">
          <Link legacyBehavior href="/map?lang=en">
            <a className="text-brand-green-dark font-bold text-right md:text-lg sm:text-sm text-xs leading-tight hover:underline underline-offset-8 decoration-4 decoration-[#f9c793]">
              {t("common:national_map")}
            </a>
          </Link>
          <ChooseAnalyzer
            className="text-brand-green-dark font-bold md:text-lg sm:text-sm text-xs text-left leading-tight hover:underline underline-offset-8 decoration-[#f9c793]"
            text={t("common:local_analyzers")}
          />
          {env.NEXT_PUBLIC_LANGUAGE_FEATURE_FLAG_ACTIVE === "true" && <MainLanguageSwitch />}
          <Menu />
        </div>
      </div>
    </div>
  )
}

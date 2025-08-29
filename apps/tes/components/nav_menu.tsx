import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { StyledDropdownMenuTrigger } from "components/elements"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import {
  STATIC_ASSETS_CLOUDFRONT_URL,
  TES_NATIONAL_EXPLORER_DATA_GLOSSARY_LINK,
  TES_NATIONAL_EXPLORER_FAQ_LINK,
  TES_NATIONAL_EXPLORER_DATA_DOWNLOAD_LINK,
  TES_NATIONAL_EXPLORER_DEMO_LINK,
  TES_NATIONAL_EXPLORER_STARTER_GUIDE_LINK,
  TES_NATIONAL_EXPLORER_RESOURCES_TAB_LINK,
  TES_NATIONAL_EXPLORER_METHODOLOGY_LINK,
  TES_NATIONAL_EXPLORER_HOME_LINK,
  TES_NATIONAL_EXPLORER_CONTACT_LINK,
} from "app/constants"
import { useContext, useEffect, useState } from "react"
import { useSetAtom } from "jotai"
import { reportDropdownOpen } from "app/state"
import { CityContext } from "app/features/regional-map/regional-map.state"
import logout from "app/auth/mutations/logout"
import { MapMenuSwitchButton } from "app/features/i18n/components/map-menu-switch-button"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { RouteUrlObject } from "blitz"
import { env } from "lib/env"
import { useCurrentLanguage } from "app/features/i18n/i18n.hooks"
import { useTranslation } from "react-i18next"
import { DEFAULT_LANGUAGE } from "app/features/i18n/i18n.constants"

export type MenuItem = {
  name?: string
  link: RouteUrlObject | string
  image?: string
  component?: React.FC<{ link: string }>
  type: "item"
}

export type NestedMenuItem = {
  name: string
  items: MenuItem[]
  type: "nested"
}

const HOME_ITEM: MenuItem[] = [
  {
    name: "common:home",
    link: TES_NATIONAL_EXPLORER_HOME_LINK,
    type: "item",
  },
]

const CONTACT_ITEM: MenuItem[] = [
  {
    name: "common:contact_us",
    link: TES_NATIONAL_EXPLORER_CONTACT_LINK,
    type: "item",
  },
]

const METHODS_AND_DATA_ITEMS: NestedMenuItem[] = [
  {
    name: "common:methods_and_data",
    items: [
      {
        name: "common:methods",
        link: TES_NATIONAL_EXPLORER_METHODOLOGY_LINK,
        type: "item",
      },
      {
        name: "common:data_glossary",
        link: TES_NATIONAL_EXPLORER_DATA_GLOSSARY_LINK,
        type: "item",
      },
      {
        name: "common:faqs",
        link: TES_NATIONAL_EXPLORER_FAQ_LINK,
        type: "item",
      },
      {
        name: "common:data_download",
        link: TES_NATIONAL_EXPLORER_DATA_DOWNLOAD_LINK,
        type: "item",
      },
    ],
    type: "nested",
  },
]

const RESOURCES_ITEMS: NestedMenuItem[] = [
  {
    name: "common:resources",
    items: [
      {
        name: "common:watch_demo",
        link: TES_NATIONAL_EXPLORER_DEMO_LINK,
        type: "item",
      },
      {
        name: "common:starter_guide",
        link: TES_NATIONAL_EXPLORER_STARTER_GUIDE_LINK,
        type: "item",
      },
      {
        name: "common:more_resources",
        link: TES_NATIONAL_EXPLORER_RESOURCES_TAB_LINK,
        type: "item",
      },
    ],
    type: "nested",
  },
]

const LANGUAGE_ITEMS: NestedMenuItem[] = [
  {
    name: "common:change_language",
    items: [
      {
        component: MapMenuSwitchButton,
        link: "en",
        type: "item",
      },
      {
        component: MapMenuSwitchButton,
        link: "es",
        type: "item",
      },
    ],
    type: "nested",
  },
]

const DropdownMenuItem = (item: MenuItem) => {
  const { t } = useTranslation(["common"])
  return item?.component ? (
    <DropdownMenu.Item key={item.name}>
      {item.component({ link: item.link as string })}
    </DropdownMenu.Item>
  ) : (
    <DropdownMenu.Item key={item.name}>
      <Link legacyBehavior href={item.link}>
        <a>
          <p className="text-brand-green-dark font-medium py-2 pl-4 pr-6 hover:underline underline-offset-8 decoration-4 decoration-[#f9c793]">
            {item.image && (
              <img
                className="w-5 inline mr-3 -mt-1"
                src={`${STATIC_ASSETS_CLOUDFRONT_URL}/${item.image}`}
              />
            )}
            {item?.name && t(item.name)}
          </p>
        </a>
      </Link>
    </DropdownMenu.Item>
  )
}

export default function NavMenu({ displayText }: { displayText?: string }) {
  const [open, setOpen] = useState(false)
  const setReportDropdownOpen = useSetAtom(reportDropdownOpen)
  const city = useContext(CityContext)!
  const isNational = !city?.id
  const [logoutMutation] = useMutation(logout)
  const [lang] = useCurrentLanguage()
  const isEnglishMap = lang === DEFAULT_LANGUAGE
  const { t } = useTranslation(["common"])
  const NATIONAL_MAP_MENU_ITEMS: (MenuItem | NestedMenuItem)[] = [
    ...HOME_ITEM,
    ...(isEnglishMap ? [...METHODS_AND_DATA_ITEMS, ...RESOURCES_ITEMS, ...CONTACT_ITEM] : []),
    ...(env.NEXT_PUBLIC_LANGUAGE_FEATURE_FLAG_ACTIVE === "true" && isNational ? LANGUAGE_ITEMS : []),
  ]
  
  useEffect(() => {
    if (open) setReportDropdownOpen(false)
  }, [open])

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <StyledDropdownMenuTrigger>{displayText}</StyledDropdownMenuTrigger>
      <DropdownMenu.Content className="z-10 pr-4 text-body" align="start">
        <div className="shadow-lg bg-white rounded mt-4 py-2 text-left">
          {NATIONAL_MAP_MENU_ITEMS.map((item) =>
            item.type === "nested" ? (
              <DropdownMenu.Sub key={item.name}>
                <DropdownMenu.SubTrigger className="text-brand-green-dark font-medium py-1.5 pl-4 pr-16 hover:underline underline-offset-8 decoration-4 decoration-[#f9c793] cursor-default">
                  {t(item.name)} <ChevronRightIcon className="inline -mt-1" />
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <div className="shadow bg-white pt-1.5 text-left">
                    {item.items.map((subItem) => (
                      <div key={subItem.name} className="pb-1.5">
                        <DropdownMenuItem {...subItem} key={subItem.name}/>
                      </div>
                    ))}
                  </div>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            ) : (
              <DropdownMenuItem key={item.name} {...item} />
            )
          )}
          {city && city.id !== "national" ? (
            <DropdownMenu.Item
              className="text-brand-green-dark text-base font-medium py-2 pl-4 pr-16 hover:underline underline-offset-8 decoration-4 decoration-[#f9c793] cursor-pointer"
              onSelect={() => {
                logoutMutation()
              }}
            >
              {t("common:logout")}
            </DropdownMenu.Item>
          ) : null}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

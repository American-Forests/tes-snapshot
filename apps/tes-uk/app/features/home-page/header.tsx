import Link from "next/link"
import { Routes } from "@blitzjs/next"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import styled from "styled-components"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"
import { UK_MENU_ITEMS, getAssetUrl } from "app/constants"

const DropdownMenuItem = styled(DropdownMenu.Item)`
  &:hover,
  &:focus {
    outline: none;
  }
`

const Menu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <HamburgerMenuIcon className="text-brand-green-dark hover:text-brand-green hover:transition-color duration-500 md:w-12 w-10 md:h-10 h-8" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sideOffset={5}>
        <div className="shadow bg-white lg:mr-48 mr-1 pt-4 pb-2 text-left pl-4">
          {UK_MENU_ITEMS.map((item, i) => (
            <div className="pb-4" key={i}>
              <DropdownMenuItem key={item.name}>
                <Link legacyBehavior href={item.link}>
                  <a>
                    <img
                      className="w-5 inline mr-3 -mt-1"
                      src={getAssetUrl(`${item.flag}-flag.svg`)}
                    ></img>
                    <span className="text-brand-green-dark font-medium py-2 pr-6 hover:underline underline-offset-8 decoration-4 decoration-[#006554]">
                      {item.name}
                    </span>
                  </a>
                </Link>
              </DropdownMenuItem>
            </div>
          ))}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const Header = () => {
  return (
    <div>
      <div className="bg-uk-green p-2 text-white text-center">
        <p>
          <img
            src={`${STATIC_ASSETS_CLOUDFRONT_URL}/pin_orange.svg`}
            className="inline -mt-2 mr-1 md:h-7 h-6"
          ></img>
          <span className="font-bold">Exciting Update!</span> The UK Tree Equity Score now includes
          new data for over 500 additional urban LSOAs, thanks to the Woodland Trust. This update
          completes coverage across Scotland, Wales, and Northern Ireland!
        </p>
      </div>
      <div className="lg:py-2 py-0 flex justify-between items-center">
        <div className="lg:pl-[10%] pl-[2%]">
          <Link legacyBehavior href={Routes.Home()}>
            <a>
              <img
                className="xl:w-[8vw] lg:w-[12vw] md:w-[18vw] sm:w-[18vw] w-[28vw]"
                src={getAssetUrl("tes-uk.svg")}
                alt="Tree Equity Score UK"
              />
            </a>
          </Link>
        </div>
        <div className="lg:pr-[10%] pr-[2%] py-5">
          <Menu />
        </div>
      </div>
    </div>
  )
}

export default Header

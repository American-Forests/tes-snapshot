import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useCallback } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { useTranslation } from "react-i18next"

type Language = {
  code: string
  name: string
  href: string
}

const languages: Language[] = [
  { code: "en", name: "English (US)", href: "/" },
  { code: "es", name: "Español", href: "/es" },
]

export default function MainLanguageSwitch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const toggleOpen = useCallback(() => setOpen(!open), [open])
  const { t } = useTranslation()

  // Determine current language based on path
  const currentLang = router.pathname.startsWith("/es") ? "es" : "en"

  return (
    <DropdownMenu.Root open={open} onOpenChange={toggleOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="rounded-full border border-gray-700 w-7 h-7 flex items-center justify-center text-gray-700 text-annotation focus:outline-none uppercase">
          {currentLang}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="bg-white rounded shadow-lg w-40 overflow-hidden mt-1"
        align="end"
        sideOffset={5}
      >
        <div>
          {languages.map((language) => (
            <DropdownMenu.Item key={language.code} className="focus:outline-none">
              <Link
                href={language.href}
                className={`flex items-center justify-between text-annotation px-2 py-1  ${
                  currentLang === language.code ? "bg-brand-green text-white" : "hover:bg-gray-100"
                }`}
                onClick={toggleOpen}
              >
                <span>{t(`common:${language.code}`)}</span>
                {currentLang === language.code && <CheckCircledIcon className="w-5 h-5" />}
              </Link>
            </DropdownMenu.Item>
          ))}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

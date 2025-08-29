import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "./i18n.constants"

export const useCurrentLanguage = (): [string, (lang: string) => void] => {
  const router = useRouter()
  const { i18n } = useTranslation()
  const [language, setCurrentLanguage] = useState<string>("")

  const updateQueryLanguage = (lang: string): void => {
    router.push({
      query: {
        ...router.query,
        lang,
      },
    })
  }

  // TODO: implement language detection before translation release
  useEffect(() => {
    const defaultLang = DEFAULT_LANGUAGE
    const browserLang = navigator.language.split("-")[0]
    const lang = router?.query?.lang as string
    const isBrowserLangSupported = SUPPORTED_LANGUAGES.includes(browserLang)
    const language = lang || (isBrowserLangSupported ? browserLang : defaultLang)
    i18n.changeLanguage(language)
    setCurrentLanguage(language)
  }, [router, i18n])
  return [language, updateQueryLanguage]
}

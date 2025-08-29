import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import Backend from "i18next-http-backend"
import { DEFAULT_LANGUAGE } from "./i18n.constants"

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    debug: false,
    ns: ["common", "facets", "location-insights", "map", "data"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: false,  // to avoid hydration errors
    },
  })

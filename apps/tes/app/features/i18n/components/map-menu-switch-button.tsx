import { useCurrentLanguage } from "../i18n.hooks"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import { CircleIcon } from "@radix-ui/react-icons"
import { useTranslation } from "react-i18next"

export const MapMenuSwitchButton: React.FC<{ link: string }> = ({ link }) => {
  const { t } = useTranslation()
  const [language, updateQueryLanguage] = useCurrentLanguage()

  const activeLanguage = language === link
  return (
    <div className="flex items-center gap-x-2 p-2 y">
      {activeLanguage ? (
        <CheckCircledIcon className={`text-brand-green`} />
      ) : (
        <CircleIcon className={`text-brand-green`} />
      )}
      <button
        className="text-brand-green-dark hover:underline underline-offset-8 decoration-4 decoration-[#f9c793]"
        type="button"
        onClick={() => {
          updateQueryLanguage(link)
        }}
      >
        {t(`common:${link}`)}
      </button>
    </div>
  )
}

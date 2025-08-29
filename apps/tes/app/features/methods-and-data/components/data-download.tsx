import { STATES_LOOKUP } from "app/constants"
import DownloadOptionsDropdown from "components/download_options_dropdown"
import { AccordionItem, AccordionWithChildren } from "ui"
import { MarkdownWithCustomStyles } from "./markdow-with-styles"
import { useTranslation } from "react-i18next"

export const DataDownload = () => {
  const { t } = useTranslation(["data", "common"])
  return (
    <AccordionWithChildren className="border-b-2 border-brand-green">
      <AccordionItem
        title={t("data:data_download.data.title")}
        variant="primary"
        className="text-black font-semibold text-title py-5"
      >
        <p className="pl-4 pb-4">{t("data:data_download.data.description")}</p>
        <div className="flex flex-row w-4/5 m-auto pt-8">
          <DownloadOptionsDropdown label={t("common:nationwide")} s3key={"national"} />
        </div>
        <div className="grid pt-2 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2 w-4/5 m-auto pb-12">
          {Object.entries(STATES_LOOKUP).map((pair) => {
            return <DownloadOptionsDropdown label={pair[1]} s3key={pair[0].toLowerCase()} />
          })}
        </div>
        <p className="pl-4 pb-4 text-sm">{t("data:data_download.data.description")}</p>
        <p className="pl-4 pb-4 text-sm">{t("data:data_download.data.note")}</p>
      </AccordionItem>
      <AccordionItem
        title={t("data:data_download.change_log.title")}
        variant="primary"
        type="list"
        className="text-black font-semibold text-title border-t-2 border-brand-green py-5"
      >
        <p className="pl-8 pb-4">
          <MarkdownWithCustomStyles>
            {t("data:data_download.change_log.description")}
          </MarkdownWithCustomStyles>
        </p>
      </AccordionItem>
    </AccordionWithChildren>
  )
}

export default DataDownload

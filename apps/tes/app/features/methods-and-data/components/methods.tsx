import { Trans, useTranslation } from "react-i18next"
import { AccordionItem, AccordionWithChildren } from "ui"
import { MarkdownWithCustomStyles } from "./markdow-with-styles"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

const styles = {
  formula:
    "border-l-8 border-brand-green-dark bg-brand-green-pale inline-block text-brand-green-dark font-semibold p-4",
  orderedList:
    "before:absolute before:text-black before:w-8 before:h-8 before:bg-brand-green-light before:text-body before:rounded-full before:flex before:items-center before:justify-center before:font-extrabold",
  unorderedList:
    "relative before:absolute before:bg-black before:w-[6px] before:h-[6px] before:rounded-full before:content-[''] before:top-2.5 before:left-0 before:inline-block before:mr-2",
}

export const MethodsPanel = () => {
  const { t, i18n } = useTranslation(["data"])
  const TREE_EQUITY_FORMULA_IMAGE_LOCALIZED =
    i18n.language === "es" ? "calc-es.png" : "tes-formula-new.svg"
  const getLocalizedChart = (biomeName: string) =>
    i18n.language === "es" ? `${STATIC_ASSETS_CLOUDFRONT_URL}/es_${biomeName}` : biomeName
  const methodsNamespace = "data:methods"

  return (
    <AccordionWithChildren className="border-b-2 border-b-brand-green">
      <AccordionItem
        title={t(`${methodsNamespace}.tree_equity_score.title`)}
        variant="primary"
        className="text-black font-semibold text-title py-5"
      >
        <p className="pl-4 pb-4 pt-2">{t(`${methodsNamespace}.tree_equity_score.description`)}</p>
        <MarkdownWithCustomStyles>
          {t(`${methodsNamespace}.tree_equity_score.points`)}
        </MarkdownWithCustomStyles>
        <img
          className="m-auto my-12"
          src={`${STATIC_ASSETS_CLOUDFRONT_URL}/${TREE_EQUITY_FORMULA_IMAGE_LOCALIZED}`}
          alt="American forests"
        />
      </AccordionItem>

      <AccordionItem
        title={t(`${methodsNamespace}.priority_index.title`)}
        variant="primary"
        className="text-black font-semibold text-title border-t-2 border-brand-green py-5"
      >
        <p className="pl-4 pb-6 pt-2">{t(`${methodsNamespace}.priority_index.description`)}</p>
        <div className="mb-8">
          <AccordionWithChildren>
            <AccordionItem
              title={
                <p className="text-black text-body text-left font-bold">
                  <span>{t(`${methodsNamespace}.priority_index.variables.age.title`)}: </span>
                  <span className="text-brand-green-dark font-medium">
                    {t(`${methodsNamespace}.priority_index.variables.age.subtitle`)}
                  </span>
                </p>
              }
              variant="secondary"
              className="border-t border-t-gray-200"
            >
              <MarkdownWithCustomStyles>
                {t(`${methodsNamespace}.priority_index.variables.age.description`)}
              </MarkdownWithCustomStyles>
            </AccordionItem>

            <AccordionItem
              title={
                <p className="text-black text-body text-left font-bold">
                  <span>
                    {t(`${methodsNamespace}.priority_index.variables.employment.title`)}:{" "}
                  </span>
                  <span className="text-brand-green-dark font-medium">
                    {t(`${methodsNamespace}.priority_index.variables.employment.subtitle`)}
                  </span>
                </p>
              }
              variant="secondary"
            >
              <MarkdownWithCustomStyles>
                {t(`${methodsNamespace}.priority_index.variables.employment.description`)}
              </MarkdownWithCustomStyles>
            </AccordionItem>

            <AccordionItem
              title={
                <p className="text-black text-body text-left font-bold">
                  <span>{t(`${methodsNamespace}.priority_index.variables.health.title`)}: </span>
                  <span className="text-brand-green-dark font-medium">
                    {t(`${methodsNamespace}.priority_index.variables.health.subtitle`)}
                  </span>
                </p>
              }
              variant="secondary"
            >
              <MarkdownWithCustomStyles>
                {t(`${methodsNamespace}.priority_index.variables.health.description`)}
              </MarkdownWithCustomStyles>
            </AccordionItem>

            <AccordionItem
              title={
                <p className="text-black text-body text-left font-bold">
                  <span>
                    {t(`${methodsNamespace}.priority_index.variables.heat_severity.title`)}:{" "}
                  </span>
                  <span className="text-brand-green-dark font-medium">
                    {t(`${methodsNamespace}.priority_index.variables.heat_severity.subtitle`)}
                  </span>
                </p>
              }
              variant="secondary"
            >
              <MarkdownWithCustomStyles>
                {t(`${methodsNamespace}.priority_index.variables.heat_severity.description`)}
              </MarkdownWithCustomStyles>
            </AccordionItem>

            <AccordionItem
              title={
                <p className="text-black text-body text-left font-bold">
                  <span>{t(`${methodsNamespace}.priority_index.variables.income.title`)}: </span>
                  <span className="text-brand-green-dark font-medium">
                    {t(`${methodsNamespace}.priority_index.variables.income.subtitle`)}
                  </span>
                </p>
              }
              variant="secondary"
            >
              <MarkdownWithCustomStyles>
                {t(`${methodsNamespace}.priority_index.variables.income.description`)}
              </MarkdownWithCustomStyles>
            </AccordionItem>

            <AccordionItem
              title={
                <p className="text-black text-body text-left font-bold">
                  <span>{t(`${methodsNamespace}.priority_index.variables.language.title`)}: </span>
                  <span className="text-brand-green-dark font-medium">
                    {t(`${methodsNamespace}.priority_index.variables.language.subtitle`)}
                  </span>
                </p>
              }
              variant="secondary"
            >
              <MarkdownWithCustomStyles>
                {t(`${methodsNamespace}.priority_index.variables.language.description`)}
              </MarkdownWithCustomStyles>
            </AccordionItem>

            <AccordionItem
              title={
                <p className="text-black text-body text-left font-bold">
                  <span>{t(`${methodsNamespace}.priority_index.variables.race.title`)}: </span>
                  <span className="text-brand-green-dark font-medium">
                    {t(`${methodsNamespace}.priority_index.variables.race.subtitle`)}
                  </span>
                </p>
              }
              variant="secondary"
            >
              <MarkdownWithCustomStyles>
                {t(`${methodsNamespace}.priority_index.variables.race.description`)}
              </MarkdownWithCustomStyles>
            </AccordionItem>
          </AccordionWithChildren>
        </div>
      </AccordionItem>

      <AccordionItem
        title={t(`${methodsNamespace}.tree_canopy_benefits.title`)}
        variant="primary"
        className="text-black font-semibold text-title border-t-2 border-brand-green py-5"
      >
        <p className="pb-4 pt-2 pl-4">
          {t(`${methodsNamespace}.tree_canopy_benefits.description`)}
        </p>
        <div className="relative">
          <p
            className={`pl-24 pb-2 text-black text-body ${styles.orderedList} before:text-caption before:content-['1'] before:left-12`}
          >
            {t(`${methodsNamespace}.tree_canopy_benefits.steps.step1.description`)}
          </p>
          <MarkdownWithCustomStyles
            className={`pl-24 pb-2 text-black text-body ${styles.orderedList} before:text-caption before:content-['2'] before:left-12`}
          >
            {t(`${methodsNamespace}.tree_canopy_benefits.steps.step2.description`)}
          </MarkdownWithCustomStyles>
          <p
            className={`pl-24 pb-2 text-black text-body ${styles.orderedList} before:text-caption before:content-['3'] before:left-12`}
          >
            {t(`${methodsNamespace}.tree_canopy_benefits.steps.step3.description`)}
          </p>
        </div>
      </AccordionItem>

      <AccordionItem
        title={t(`${methodsNamespace}.jobs_supported.title`)}
        variant="primary"
        className="text-black font-semibold text-title border-t-2 border-brand-green py-5"
      >
        <p className="pl-4 pb-4 pt-2">{t(`${methodsNamespace}.jobs_supported.description`)}</p>
        <MarkdownWithCustomStyles>
          {t(`${methodsNamespace}.jobs_supported.points`)}
        </MarkdownWithCustomStyles>
      </AccordionItem>

      <AccordionItem
        title={t(`${methodsNamespace}.detailed_methods.title`)}
        variant="primary"
        className="text-black font-semibold text-title border-t-2 border-brand-green py-5"
      >
        <AccordionWithChildren>
          <div>
            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['1']  ${styles.orderedList} before:top-[8px] before:left-4`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step1.title`)}
                  </p>
                }
                variant="secondary"
                className="border-t border-t-gray-200 pb-4"
              >
                <p className="pl-4 pt-2 pb-6">
                  {t(`${methodsNamespace}.detailed_methods.steps.step1.description`)}
                </p>
                <div>
                  <p
                    className={`pl-24 pb-2 text-black text-body ${styles.orderedList} before:text-caption before:content-['1A'] before:left-12`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step1.substeps.1a.title`)}
                  </p>
                  <MarkdownWithCustomStyles listIndentation="pl-32">
                    {t(`${methodsNamespace}.detailed_methods.steps.step1.substeps.1a.points`)}
                  </MarkdownWithCustomStyles>
                </div>

                <div>
                  <p
                    className={`pl-24 pb-6 text-black text-body ${styles.orderedList} before:text-caption before:content-['1B'] before:left-12`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step1.substeps.1b.title`)}
                  </p>
                </div>

                <div>
                  <p
                    className={`pl-24 pb-3 text-black text-body ${styles.orderedList} before:text-caption before:content-['1C'] before:left-12`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step1.substeps.1c.title`)}
                  </p>
                  <MarkdownWithCustomStyles listIndentation="pl-32">
                    {t(`${methodsNamespace}.detailed_methods.steps.step1.substeps.1c.points`)}
                  </MarkdownWithCustomStyles>
                  <div className="sm:pl-24 pl-0 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <img src={`${getLocalizedChart("forest_chart.png")}`} />
                    <img src={`${getLocalizedChart("grassland_chart.png")}`} />
                    <img src={`${getLocalizedChart("mediterranean_chart.png")}`} />
                    <img src={`${getLocalizedChart("desert_chart.png")}`} />
                  </div>
                </div>

                <div>
                  <p
                    className={`pl-24 pb-4 text-black text-body ${styles.orderedList} before:text-caption before:content-['1D'] before:left-12`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step1.substeps.1d.title`)}
                  </p>
                  <p className={`${styles.formula} mt-4 mb-10 ml-24`}>
                    {t(`${methodsNamespace}.detailed_methods.steps.step1.substeps.1d.formula`)}
                  </p>
                </div>

                <div className="hidden md:block">
                  <p
                    className={`pl-24 pb-8 text-black text-body ${styles.orderedList} before:text-caption before:content-['1E'] before:left-12`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step1.substeps.1e.title`)}
                  </p>

                  <table className="text-center w-96 border-t-2 border-brand-green sm:ml-24 ml-0">
                    <thead className="border-b-2 font-medium text-xs border-brand-green">
                      <tr>
                        <th scope="col" className="px-2 py-2 bg-brand-green-light">
                          {`${t("common:building_density")} (%)`}
                        </th>
                        <th scope="col" className="px-2 py-2">
                          {t("common:forest")}
                          <br />
                          {`(% ${t("common:canopy")})`}
                        </th>
                        <th scope="col" className="px-2 py-2">
                          {t("common:grassland")}
                          <br />
                          {`(% ${t("common:canopy")})`}
                        </th>
                        <th scope="col" className="px-2 py-2">
                          {t("common:mediterranean")}
                          <br />
                          {`(% ${t("common:canopy")})`}
                        </th>
                        <th scope="col" className="px-2 py-2">
                          {`${t("common:desert")} (% ${t("common:canopy")})`}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-semibold">
                      <tr>
                        <td className="whitespace-nowrap px-6 py-2 bg-brand-green-light">{`<14%`}</td>
                        <td className="whitespace-nowrap px-6 py-2">
                          50% <span className="font-light">[1.25]</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          30% <span className="font-light">[1.5]</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          30% <span className="font-light">[1.5]</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">15%</td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-2 bg-brand-green-light">{`14-22%`}</td>
                        <td className="whitespace-nowrap px-6 py-2">40%</td>
                        <td className="whitespace-nowrap px-6 py-2">
                          30% <span className="font-light">[1.5]</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          25% <span className="font-light">[1.25]</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">15%</td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-2 bg-brand-green-light">{`22-30%`}</td>
                        <td className="whitespace-nowrap px-6 py-2">
                          30% <span className="font-light">[0.75]</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">
                          25% <span className="font-light">[1.25]</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">20%</td>
                        <td className="whitespace-nowrap px-6 py-2">15%</td>
                      </tr>
                      <tr className="border-b-2 border-brand-green">
                        <td className="whitespace-nowrap px-6 py-2 bg-brand-green-light">{`>30%`}</td>
                        <td className="whitespace-nowrap px-6 py-2">
                          20% <span className="font-light">[0.5]</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">20%</td>
                        <td className="whitespace-nowrap px-6 py-2">
                          15% <span className="font-light">[0.75]</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-2">15%</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs pl-5 mb-8 sm:ml-24 -ml-16">
                    {t(`${methodsNamespace}.detailed_methods.steps.step1.substeps.1e.note`)}
                  </p>
                </div>
              </AccordionItem>
            </div>

            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['2']  ${styles.orderedList} before:top-[8px] before:left-4`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step2.title`)}
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <div
                  className={`pl-24 pb-4 pt-3 text-black text-body ${styles.orderedList} before:text-caption before:content-['2A'] before:left-12`}
                >
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step2.substeps.2a.title`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
                <div className={`${styles.unorderedList} left-28 pl-3 pb-4`}>
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step2.substeps.2a.points`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>

                <div className={`${styles.formula} mb-8 ml-24`}>
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step2.substeps.2a.formula`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
              </AccordionItem>
            </div>

            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['3']  ${styles.orderedList} before:top-[8px] before:left-4`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step3.title`)}
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p className="pl-12 pt-2 pb-6">
                  {t(`${methodsNamespace}.detailed_methods.steps.step3.description`)}
                </p>
                <p
                  className={`pl-24 pb-6 text-black text-body ${styles.orderedList} before:text-caption before:content-['3A'] before:left-12`}
                >
                  {t(`${methodsNamespace}.detailed_methods.steps.step3.substeps.3a.title`)}
                </p>
                <p className={`${styles.formula} mb-8 ml-24`}>
                  {t(`${methodsNamespace}.detailed_methods.steps.step3.substeps.3a.formula`)}
                </p>
              </AccordionItem>
            </div>

            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['4']  ${styles.orderedList} before:top-[8px] before:left-4`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step4.title`)}
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p className="pl-12 pt-2 pb-6">
                  {t(`${methodsNamespace}.detailed_methods.steps.step4.description`)}
                </p>
                <p
                  className={`pl-24 pb-6 text-black text-body ${styles.orderedList} before:text-caption before:content-['4A'] before:left-12`}
                >
                  {t(`${methodsNamespace}.detailed_methods.steps.step4.substeps.4a.title`)}
                </p>
                <div
                  className={`pl-24 pb-6 text-black text-body ${styles.orderedList} before:text-caption before:content-['4B'] before:left-12`}
                >
                  <MarkdownWithCustomStyles className="text-black text-body pl-0 pt-0">
                    {t(`${methodsNamespace}.detailed_methods.steps.step4.substeps.4b.title`)}
                  </MarkdownWithCustomStyles>
                </div>
                <p
                  className={`pl-24 pb-6 text-black text-body ${styles.orderedList} before:text-caption before:content-['4C'] before:left-12`}
                >
                  {t(`${methodsNamespace}.detailed_methods.steps.step4.substeps.4c.title`)}
                </p>

                <div
                  className={`pl-24 pb-4 text-black text-body ${styles.orderedList} before:text-caption before:content-['4D'] before:left-12`}
                >
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step4.substeps.4d.title`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
                <ul className={`relative left-24 pl-6 pb-4 list-disc`}>
                  <li>
                    <Trans
                      i18nKey={`${methodsNamespace}.detailed_methods.steps.step4.substeps.4d.point1`}
                      components={{ sub: <sub></sub> }}
                    />
                  </li>
                  <li>
                    <Trans
                      i18nKey={`${methodsNamespace}.detailed_methods.steps.step4.substeps.4d.point2`}
                      components={{ sub: <sub></sub> }}
                    />
                  </li>
                </ul>
                <div className={`${styles.formula} mb-6 ml-24`}>
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step4.substeps.4d.formula`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
                <p className={`pl-28 pb-6 ${styles.unorderedList} before:left-24`}>
                  {t(`${methodsNamespace}.detailed_methods.steps.step4.substeps.4d.note`)}
                </p>
              </AccordionItem>
            </div>

            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['5']  ${styles.orderedList} before:top-[8px] before:left-4`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step5.title`)}
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p className="pl-12 pt-2 pb-6">
                  {t(`${methodsNamespace}.detailed_methods.steps.step5.description`)}
                </p>
                <p
                  className={`pl-24 pb-4 text-black text-body ${styles.orderedList} before:text-caption before:content-['5A'] before:left-12`}
                >
                  {t(`${methodsNamespace}.detailed_methods.steps.step5.substeps.5a.title`)}
                </p>
                <div className="pl-20">
                  <MarkdownWithCustomStyles>
                    {t(`${methodsNamespace}.detailed_methods.steps.step5.substeps.5a.points`)}
                  </MarkdownWithCustomStyles>
                </div>
                <div
                  className={`pl-24 pb-4 text-black text-body ${styles.orderedList} before:text-caption before:content-['5B'] before:left-12`}
                >
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step5.substeps.5b.title`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
                <ul className={`relative left-24 pl-6 pb-4 list-disc`}>
                  <li>
                    <Trans
                      i18nKey={`${methodsNamespace}.detailed_methods.steps.step5.substeps.5b.point1`}
                      components={{ sub: <sub></sub> }}
                    />
                  </li>
                  <li>
                    <Trans
                      i18nKey={`${methodsNamespace}.detailed_methods.steps.step5.substeps.5b.point2`}
                      components={{ sub: <sub></sub> }}
                    />
                  </li>
                  <li>
                    <Trans
                      i18nKey={`${methodsNamespace}.detailed_methods.steps.step5.substeps.5b.point3`}
                      components={{ sub: <sub></sub> }}
                    />
                  </li>
                </ul>
                <div className={`${styles.formula} my-6 ml-24`}>
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step5.substeps.5b.formula`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
                <p className="pl-32 pb-8 text-sm">
                  {t(`${methodsNamespace}.detailed_methods.steps.step5.substeps.5b.note`)}
                </p>
                <div
                  className={`pl-24 pb-6 text-black text-body ${styles.orderedList} before:text-caption before:content-['5C'] before:left-12`}
                >
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step5.substeps.5c.title`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
                <div className={`${styles.formula} mb-8 ml-24`}>
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step5.substeps.5c.formula`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
              </AccordionItem>
            </div>

            <div className="relative">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['6'] ${styles.orderedList} before:top-[8px] before:left-4`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step6.title`)}
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p className="pl-12 pt-2 pb-6">
                  {t(`${methodsNamespace}.detailed_methods.steps.step6.description`)}
                </p>
                <p
                  className={`pl-24 pb-4 text-black text-body ${styles.orderedList} before:text-caption before:content-['6A'] before:left-12`}
                >
                  {t(`${methodsNamespace}.detailed_methods.steps.step6.substeps.6a.title`)}
                </p>
                <ul className={`relative left-24 pl-6 pb-4 list-disc`}>
                  <li>
                    <Trans
                      i18nKey={`${methodsNamespace}.detailed_methods.steps.step6.substeps.6a.point1`}
                      components={{ sub: <sub></sub> }}
                    />
                  </li>
                  <li>
                    <Trans
                      i18nKey={`${methodsNamespace}.detailed_methods.steps.step6.substeps.6a.point2`}
                      components={{ sub: <sub></sub> }}
                    />
                  </li>
                  <li>
                    <Trans
                      i18nKey={`${methodsNamespace}.detailed_methods.steps.step6.substeps.6a.point3`}
                      components={{ sub: <sub></sub> }}
                    />
                  </li>
                </ul>
                <div className={`${styles.formula} mb-6 ml-24`}>
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step6.substeps.6a.formula`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
                <p className="pl-32 pb-8 text-sm">
                  {t(`${methodsNamespace}.detailed_methods.steps.step6.substeps.6a.note`)}
                </p>
                <p
                  className={`pl-24 pb-6 text-black text-body ${styles.orderedList} before:text-caption before:content-['6B'] before:left-12`}
                >
                  {t(`${methodsNamespace}.detailed_methods.steps.step6.substeps.6b.title`)}
                </p>
                <div className={`${styles.formula} mb-8 ml-24`}>
                  <Trans
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step6.substeps.6b.formula`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
              </AccordionItem>
            </div>

            <div className="relative pb-12">
              <AccordionItem
                title={
                  <p
                    className={`pl-12 text-brand-green-dark text-body text-left font-medium before:content-['7'] ${styles.orderedList} before:top-[8px] before:left-4`}
                  >
                    {t(`${methodsNamespace}.detailed_methods.steps.step7.title`)}
                  </p>
                }
                variant="secondary"
                className="pb-4"
              >
                <p className="pl-12 pt-2 pb-6">
                  {t(`${methodsNamespace}.detailed_methods.steps.step7.description`)}
                </p>
                <p
                  className={`pl-24 pb-4 text-black text-body ${styles.orderedList} before:text-caption before:content-['7A'] before:left-12`}
                >
                  {t(`${methodsNamespace}.detailed_methods.steps.step7.substeps.7a.title`)}
                </p>
                <ul className={`relative left-24 pl-6 pb-4 list-disc`}>
                  <li>
                    <Trans
                      tOptions={{ interpolation: { escapeValue: true } }}
                      shouldUnescape={true}
                      i18nKey={`${methodsNamespace}.detailed_methods.steps.step7.substeps.7a.point1`}
                      components={{ sub: <sub></sub> }}
                    />
                  </li>
                  <li>
                    <Trans
                      i18nKey={`${methodsNamespace}.detailed_methods.steps.step7.substeps.7a.point2`}
                      components={{ sub: <sub></sub> }}
                    />
                  </li>
                </ul>
                <div className={`${styles.formula} mb-8 ml-24`}>
                  <Trans
                    tOptions={{ interpolation: { escapeValue: true } }}
                    shouldUnescape={true}
                    i18nKey={`${methodsNamespace}.detailed_methods.steps.step7.substeps.7a.formula`}
                    components={{ sub: <sub></sub> }}
                  />
                </div>
              </AccordionItem>
            </div>
          </div>
        </AccordionWithChildren>
      </AccordionItem>
    </AccordionWithChildren>
  )
}

export default MethodsPanel

import { AccordionItem, AccordionWithChildren, HelpWidgetPanel } from "ui"
import { TranslatedAccordion } from "./translated-accordion"
import { STATIC_ASSETS_CLOUDFRONT_URL } from "app/constants"

const GUIDES = [
    {
        title: "Descubre Tree Equity Score",
        description: "Explorador Nacional del Índice de Equidad Arbórea, guía paso a paso.",
        guideUrl: `${STATIC_ASSETS_CLOUDFRONT_URL}/ES-Explorador-Nacional.pdf`
    },
    {
        title: "Hallazgos de la Ubicación del Índice de Equidad Arbórea",
        description: "Una herramienta útil e innovadora que proporciona información personalizada sobre cada una de las zonas que forman parte del Índice de Equidad Arbórea.",
        guideUrl: `${STATIC_ASSETS_CLOUDFRONT_URL}/ES-Hallazgos-de-la-Ubicacion.pdf`
    }
]
const FAQS:HelpWidgetPanel = {
    tabSlug: "faqs",
    accordionItems: [
  {
    title: "FAQs",
    type: "accordion",
    content: "",
    nestedAccordionContent: [
      {
        title: "data:faqs.national.tes_importance.title",
        content: "data:faqs.national.tes_importance.description",
      },
      {
        title: "data:faqs.national.tes_origins.title",
        content: "data:faqs.national.tes_origins.description",
      },
      {
        title: "data:faqs.national.tes_values.title",
        content: "data:faqs.national.tes_values.description",
      },
      {
        title: "data:faqs.national.data_availability.title",
        content: "data:faqs.national.data_availability.description",
      },
      {
        title: "data:faqs.national.data_procedence.title",
        content: "data:faqs.national.data_procedence.description",
      },
      {
        title: "data:faqs.national.canopy_goal.title",
        content: "data:faqs.national.canopy_goal.description",
      },
      {
        title: "data:faqs.national.data_updates.title",
        content: "data:faqs.national.data_updates.description",
      },
      {
        title: "data:faqs.national.plantable_area.title",
        content: "data:faqs.national.plantable_area.description",
      },
      {
        title: "data:faqs.national.gentrification.title",
        content: "data:faqs.national.gentrification.description",
      },
    ],
  },
]
}
export const GuidesAndFAQs = () => {
    return (
    <AccordionWithChildren className="border-brand-green">
      <AccordionItem
        title="Vea la demo"
        variant="primary"
        className="text-black font-semibold text-title py-5"
      >
        <div className="w-full m-auto py-12">
          <p className="text-subtitle pb-6">
            Cómo usar Tree Equity Score, guía paso a paso.
          </p>
          <iframe 
            width="560"
            height="315"
            src="https://www.youtube.com/embed/njoZgKPuRQY?si=YNZcAouFjVhgjsYk?hl=es&cc_lang_pref=es&cc_load_policy=1"
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </AccordionItem>
      <AccordionItem
        title="Guías de uso"
        variant="primary"
        type="list"
        className="text-black font-semibold text-title border-t-2 border-brand-green py-5"
        
      >
        {GUIDES.map((guide) => (
          <a key={guide.title} href={guide.guideUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col justify-between rounded-lg border-2 border-brand-blue-dark py-5 px-4 my-4 cursor-pointer hover:bg-brand-blue-dark hover:bg-opacity-10">
            <p className="text-body uppercase text-brand-blue-dark">Guía</p>
            <h3 className="text-subtitle">{guide.title}</h3>
            <p className="text-caption">{guide.description}</p>
          </a>
        ))}
      </AccordionItem>

      <TranslatedAccordion
        translationKeys={FAQS}
        className="text-black font-semibold text-title border-t-2 border-brand-green py-5"
        
      />
    </AccordionWithChildren>
    
  )}

export default GuidesAndFAQs
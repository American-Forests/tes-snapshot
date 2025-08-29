import { useEffect, useRef, useState } from "react"
import Head from "next/head"
import { BlitzPage } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons"
import dynamic from 'next/dynamic'
import { SPANISH_METHODS_AND_DATA_TABS } from "app/features/methods-and-data/methods-and-data.constants"
import { Tab } from "app/features/methods-and-data/components/tab"
import { TranslatedAccordion } from "app/features/methods-and-data/components/translated-accordion"
import { LOCAL_DATA_GLOSSARY_TRANSLATION_KEYS } from "app/features/i18n/i18n.constants"
import Link from "next/link"
import { TesLogo } from "components/tes_logo"
import { env } from "lib/env"
import MainLanguageSwitch from "app/features/i18n/components/main-switch"
import { clearMapPositionSessionStorage } from "hooks/use_map"
import { useVideo } from "hooks/use_video"
import { useTranslation } from "react-i18next"
import { I18nReleaseBanner } from "app/features/dashboard/components/release-banner"
// Dynamic import to avoid SSR and hydration errors
const MethodsPanel = dynamic(() => import('app/features/methods-and-data/components/methods'), { ssr: false })
const DataDownload = dynamic(() => import('app/features/methods-and-data/components/data-download'), { ssr: false })
const GuidesAndFAQs = dynamic(() => import('app/features/methods-and-data/components/guides-and-faqs.es'), { ssr: false })



function Benefit({ src, children }: { src: string; children: React.ReactNode }) {
  return (
    <div className="text-center m-auto">
      <img alt="" src={src} className="m-auto max-w-10 max-h-10" />
      <div className="pt-2 text-xs uppercase tracking-wider font-bold text-gray-700 leading-tight">
        {children}
      </div>
    </div>
  )
}

const stats = [
  {
    icon: "/icons/neighborhood.svg",
    value: "200K+",
    label: "Índices de Equidad Arbórea disponibles para casi 200,000 vecindarios urbanos en los Estados Unidos."
  },
  {
    icon: "/icons/people.svg",
    value: "260M+",
    label: "Más de 260 millones de personas viven en los vecindarios cubiertos por el Índice de Equidad Arbórea."
  },
  {
    icon: "/icons/plant-trees.svg",
    value: "500M",
    label: "Necesitamos más de 500 millones de árboles nuevos para lograr la Equidad Arbórea en todas las áreas con cobertura arbórea insuficiente."
  },
  {
    icon: "/icons/leaf-dollar.svg",
    value: "4.5B",
    label: "Estos árboles proporcionarían beneficios ecosistémicos valorados en casi $4.5 mil millones cada año."
  },
]

const Header = () => (
  <div>
    <div className="py-1 flex justify-between items-center relative z-50">
      <div className="lg:pl-[10%] pl-[2%]">
        <Link legacyBehavior href="/es">
          <a>
            <TesLogo className="md:w-28 sm:w-24 w-20 pr-[4%] md:inline border-r border-gray-300 md:border-solid border-none " />
            <img className="w-52 md:inline hidden" src="/af-logo.svg" alt="American Forests" />
          </a>
        </Link>
      </div>
      <div className="lg:pr-[10%] pr-[2%] flex items-center sm:pl-0 pl-4 py-5 gap-x-4 lg:gap-x-10 xl:gap-x-20">
        
      <Link legacyBehavior href="/map?lang=es">
          <button onClick={clearMapPositionSessionStorage} className="text-brand-green-dark font-bold text-right md:text-lg sm:text-sm text-xs leading-tight hover:underline underline-offset-8 decoration-4 decoration-[#f9c793]">
            Mapa Nacional
          </button>
        </Link>
        {env.NEXT_PUBLIC_LANGUAGE_FEATURE_FLAG_ACTIVE === "true" && <MainLanguageSwitch />}
      </div>
    </div>
  </div>
)

const HomeEs: BlitzPage = () => {
  const video = useRef<HTMLVideoElement>(null)
  const { toggleVideoPlay, isPlaying } = useVideo(video)
  const [activeTab, setActiveTab] = useState("methods")
  const { i18n } = useTranslation()
  useEffect(() => {
    if (i18n?.language !== "es") {
      i18n?.changeLanguage("es")
    }
  }, [i18n])

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Impulsar la equitatividad arbórea en ciudades y localidades de Estados Unidos."
        />
        <meta
          property="og:image"
          content="/hero_video_still.jpg"
          key="image"
        />
      </Head>
      <div className="bg-white">
        <Header />
      </div>
      <I18nReleaseBanner lng="es" />
      <section className="relative lg:h-[66rem] md:h-[60rem] h-[78rem]">
        <video
          id="hero-video"
          className="hidden md:block absolute top-100 left-0 w-full lg:h-5/6 md:h-3/5 object-cover z-[-1] aspect-[1280/720]"
          loop
          autoPlay
          playsInline
          muted
          ref={video}
          src="https://d17m5nraxo9zm6.cloudfront.net/hero-video.webm"
          poster="https://d17m5nraxo9zm6.cloudfront.net/hero_video_still.jpg"
        ></video>
        <button
          onClick={toggleVideoPlay}
          className="hidden md:flex border w-6 h-6 border-white text-white rounded-full absolute top-4 right-4 z-10 justify-center items-center"
        >
          {!isPlaying && <PlayIcon />}
          {isPlaying && <PauseIcon />}
        </button>
        <img
          src="https://d17m5nraxo9zm6.cloudfront.net/hero_video_still.jpg"
          className="md:hidden block absolute top-100 left-0 w-full h-5/6 object-cover z-[-1]"
        />
        <div className="lg:pt-[7%] md:pt-[5%] sm:pt-[6%] pt-[10%] xl:w-2/3 w-11/12 m-auto">
          <h1 className="xl:w-3/5 lg:w-3/5 w-full text-[32px] md:text-[46px] lg:text-[52px] lg:leading-[58px] md:leading-[50px] leading-[38px] font-bold text-white [text-shadow:_0_1px_10px_rgb(0_0_0_/_80%)]">
          Ayuda a crear Equidad Arbórea, “Tree Equity”, en comunidades de todo Estados Unidos.
          </h1>
          <div className="pt-6">
            
          <Link legacyBehavior href="/map?lang=es" >
            <button onClick={clearMapPositionSessionStorage} className="cursor-pointer inline-block sm:text-base text-xs font-bold tracking-wider text-white uppercase rounded-full bg-brand-green-dark hover:bg-brand-green py-2.5 px-6">
                Consultar tu puntuación de equitatividad arbórea. 
            </button>
          </Link>
          </div>
        </div>
      </section>
      <section className="bg-white pb-24 flex flex-col md:flex-row items-center max-w-6xl mx-auto">
        <div className="md:w-1/2 w-full flex justify-center">
          <img src="/NE_Laptop.png" alt="Explorador nacional: explorar nuestro mapa nacional insignia. Consultar la puntuación de una región en particular y contribuir a la equitatividad arbórea." className="min-w-[600px] w-full" />
        </div>
        <div className="md:w-1/2 w-full md:pl-12 mt-8 md:mt-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conocer más sobre el <span className="text-brand-green-dark">Índice de Equitatividad Arbórea</span></h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
          Los árboles son una infraestructura urbana esencial; además, son cruciales para la salud pública y el bienestar colectivo. El Índice de Equitatividad Arbórea se diseñó como una herramienta para abordar la perjudicial desigualdad ambiental al priorizar las inversiones dirigidas a los habitantes de zonas con mayor necesidad. 
          </p>
        </div>
      </section>
      <section className="bg-[#0B4C4C] py-32 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full mb-8 md:mb-0 md:pr-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">El cambio impulsado por la ciencia</h3>
            <Link legacyBehavior href="/map?lang=es">
              <button
                className="border border-white px-6 py-2 rounded text-white hover:bg-white hover:text-[#0B4C4C] transition mb-6"
                onClick={clearMapPositionSessionStorage}
              >
                VER EL MAPA
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 w-full text-sm">
            <p>
            El Índice de Equitatividad Arbórea mide la efectividad de los doseles forestales urbanos en las zonas con mayor necesidad. A partir de estos datos, se establecen criterios que colocan la equitatividad al centro de las inversiones que se destinan a comunidades de color, personas de bajos ingresos y poblaciones afectadas, de manera desproporcionada, por el calor intenso, la contaminación y otros peligros ambientales.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#F7FAF9] py-12 bg-cover bg-center" style={{
        backgroundImage: "url(/tes-footer-gradient.jpg)"
      }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-bold text-gray-800 mb-2">
          El Índice de Equitatividad Arbórea recopila información proveniente de múltiples fuentes para precisar una puntuación única, que oscila entre 0 y 100. Cuanto más baja es la puntuación, mayor es la necesidad de inversión.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
            <Benefit src="/icons/tree.svg">Cobertura de dosel arbóreo </Benefit>
            <Benefit src="/icons/buildingdensity.svg">Densidad de edificios</Benefit>
            <Benefit src="/icons/income.svg">Nivel de ingresos y empleo</Benefit>
            <Benefit src="/icons/race.svg">Raza</Benefit>
            <Benefit src="/icons/temp.svg">Temperatura de la superficie</Benefit>
            <Benefit src="/icons/health.svg">Salud</Benefit>
            <Benefit src="/icons/language.svg">Idioma</Benefit>
            <Benefit src="/icons/age.svg">Edad</Benefit>
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto border-2 border-brand-green-dark rounded p-8 text-center">
          <h4 className="text-brand-green-dark font-bold text-xl md:text-2xl uppercase mb-2">
            Nuestro objetivo es que las comunidades urbanas tengan los recursos para obtener árboles saludables para quienes más los necesitan.
          </h4>
        </div>
      </section>
      <section className="bg-gradient-to-b from-white to-[#ECF5F2] pt-16 pb-32">
        <div className="max-w-6xl mx-auto">
          <h5 className="text-center text-brand-green-dark font-bold text-body mb-8">ÍNDICE DE EQUITATIVIDAD ARBÓREA<br /><span className="text-black text-lg">EN NÚMEROS</span></h5>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 ">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-start text-left gap-4">
                <div className="flex flex-row items-center gap-1">
                  <img src={stat.icon} alt="" className="h-8 w-8 min-w-[3rem] text-brand-green-dark"  />
                  <span className="text-4xl font-thin text-brand-green-dark">{stat.value}</span>
                </div>
                  <p className="text-gray-700 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-20 mt-24 items-stretch justify-center">
            <div
              className="bg-[#0B4C4C] rounded-xl p-8 flex items-center justify-center md:w-1/2 w-full min-h-[220px] bg-cover bg-center"
              style={{
                backgroundImage: "url(/green-streets-bg.png)"
              }}
            >
              <p className="text-white text-lg text-center">
                Plantar árboles en vecindarios desatendidos aborda derechos humanos básicos de salud, seguridad y bienestar. Los beneficios para mitigar el calor extremo, la contaminación, la salud pública y los riesgos ambientales están bien documentados.
              </p>
            </div>
            <div className=" p-8 flex flex-col justify-center md:w-1/2 w-full min-h-[220px]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Únete al movimiento</h3>
              <p className="text-gray-700 text-base">
                American Forests desarrolló el Índice de Equidad Arbórea para abordar las inequidades ambientales en la distribución de árboles comunes en ciudades y pueblos de todo EE. UU. El índice establece un estándar de equidad para guiar la inversión en infraestructura arbórea urbana crítica, comenzando por los vecindarios con mayor necesidad.<br /><br />
                Creamos el Índice de Equidad Arbórea para que cada persona tenga la información necesaria para abogar por la salud y la resiliencia de su comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="bg-[#ECF5F2]">
          <div className="md:w-4/5 w-11/12 m-auto flex flex-col h-full justify-between">
            <div className="xl:w-3/5 lg:w-4/5 w-full m-auto flex flex-row justify-between">
              {SPANISH_METHODS_AND_DATA_TABS.map((tab) => (
                <Tab
                  key={tab.slug}
                  label={tab.label}
                  handleClick={() => setActiveTab(tab.slug)}
                  isSelected={activeTab === tab.slug}
                />
              ))}
            </div>
          </div>

          <div className=" w-full m-auto flex flex-col h-full justify-between bg-white">
            <div className="xl:w-1/2 lg:w-2/3 md:w-4/5 w-11/12 m-auto my-16 border-t-2 border-t-brand-green" >
              {activeTab === "methods" && <MethodsPanel />}
              {activeTab === "data-glossary" && 
              <TranslatedAccordion translationKeys={LOCAL_DATA_GLOSSARY_TRANSLATION_KEYS} />}
              {activeTab === "faqs" && 
              <GuidesAndFAQs />}
              {activeTab === "data-download" && <DataDownload />}
            </div>
            <div className="flex flex-col justify-center items-center py-12">
              <p className="text-body capitalize">COLABORADORES</p>
              <div className="flex flex-row gap-4 mt-4">
                <img src="/logos/google.jpg" alt="Google logo" className="w-32 h-32" />
                <img src="/logos/itree.jpg" alt="iTree logo" className="w-32 h-32" />
                <img src="/logos/uvm.jpg" alt="University of Vermont logo" className="w-32 h-32" />
                <img src="/logos/usfs.jpg" alt="US Forest Service logo" className="w-32 h-32" />
                <img src="/logos/icp.jpg" alt="iced coffee please logo" className="w-32 h-32" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="bg-[#ECF5F2] h-[700px] bg-cover bg-center flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url(/tes-footer-gradient.jpg)"
        }}
      >
        <img src="/logos/af-logo.svg" alt="American Forests logo" className="w-[350px]" />
        <p className="text-body">
          Hecho posible con datos de cobertura arbórea aportados por 
          <img src="/logos/google.svg" alt="google logo" className="w-32 mx-2 inline-block" /> 
          y con el apoyo a la traducción al español por 
          <img src="/logos/ddf.png" alt="Doris Duke Foundation logo" className="w-32 mx-2 inline-block" />
        </p>
        <div className="text-body leading-relaxed text-gray-600">
          Copyright © {new Date().getFullYear()} American Forests. Todos los derechos reservados.
          <Link legacyBehavior href="/privacy">
            <a className="text-brand-green-dark"> Política de Privacidad.</a>
          </Link>
        </div>
    </div>
    </div>
  )
}

HomeEs.suppressFirstRenderFlicker = true
HomeEs.getLayout = (page) => <Layout>{page}</Layout>
export default HomeEs

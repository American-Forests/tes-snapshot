import { NavSection, StickyNavbarProps } from "./types"
import Link from "next/link"

const StickyNavbar: React.FC<StickyNavbarProps> = ({
  sections,
  activeSection,
  isVisible,
  activeColor
}) => {
  const isActive = (section: NavSection) => {
    const ids = section.activeIds || [section.id]
    return ids.includes(activeSection)
  }
  const handleScroll = (section: NavSection) => {
    const element = document.getElementById(section.id)
    if (element) {
      const viewportHeight = window.innerHeight
      const adjustment = section.adjustment
        ? viewportHeight * section.adjustment
        : 0

      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition + adjustment,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav 
      className={`text-sm md:text-2xl tracking-tight cursor-pointer fixed top-0 left-0 right-0 max-w-[100vw] overflow-x-hidden bg-[#171717]/80 text-white font-bold py-2 md:py-3 px-3 md:px-8 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-3xl xl:max-w-5xl mx-auto">
        <div className="flex justify-between items-center text-center leading-4 md:leading-7">
          {sections.map((section) => (
            <Link 
              key={section.id}
              href={`#${section.id}`}
              style={{
                color: isActive(section) ? activeColor : undefined
              }}
              className={`py-2 hover:opacity-75 transition-colors duration-200 ${
                isActive(section) ? '' : ''
              }`}
              onClick={(e) => {
                e.preventDefault()
                handleScroll(section)
              }}
            >
              <div>{section.labelTop}</div>
              <div>{section.labelBottom}</div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default StickyNavbar
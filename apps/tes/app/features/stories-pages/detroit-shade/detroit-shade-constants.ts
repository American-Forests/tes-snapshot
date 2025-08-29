import { CoverSectionProps, NavSection } from "../shared/types"

export const boldText = "font-bold text-[#FFBC2B]"

export const detroitCoverProps: CoverSectionProps = {
    location: "DETROIT MI",
    title: "Heat Resilience Starts Here: Cooling Detroit's Bus Stops",
    subtitle: "Most public transit stops in Detroit are exposed to scorching heat in the summertime. State-of-the-art shade data can guide smart investments that improve walkability and make Detroit a cooler place to live and visit.",
    coverImage: "det_cover.jpg",
    locationColor: "#FFFFFF",
    titleColor: "text-[#FFBC2B]",
    titleLength: "long"
}

export const detroitSections: NavSection[] = [
    { 
        id: 'why',
        labelTop: 'Why',
        labelBottom: 'shade?',
        adjustment: -0.3
    },
    { 
        id: 'explore',
        labelTop: 'Explore',
        labelBottom: 'the Data',
        adjustment: -0.1
    },
    { 
        id: 'closing-gap',
        labelTop: 'Closing the',
        labelBottom: 'Shade Gap',
        adjustment: 1.9
    },
    { 
        id: 'action',
        labelTop: 'Data to',
        labelBottom: 'Action',
        activeIds: ['action', 'action2'],
        adjustment: -0.1
    },
    { 
        id: 'forward',
        labelTop: "A Path",
        labelBottom: 'Forward',
        adjustment: 0.2
    }
]

export const steps = ["map"]
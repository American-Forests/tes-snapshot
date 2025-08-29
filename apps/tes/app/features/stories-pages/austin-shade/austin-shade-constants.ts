import { CoverSectionProps, NavSection } from "../shared/types"

export const boldText = "font-bold text-[#78CDB9]"

export const austinCoverProps: CoverSectionProps = {
    location: "AUSTIN TX",
    title: "School Routes Aren't the Coolest",
    subtitle: "How hot is your route to school? We analyzed shade along school routes in Austin to find out.",
    coverImage: "aus_cover_img.jpg",
    locationColor: "#78CDB9",
    titleColor: "text-transparent bg-clip-text bg-gradient-to-b from-[#EBA9E4] to-[#960B88]"
}

export const austinSections: NavSection[] = [
    { 
        id: 'why',
        labelTop: 'Why',
        labelBottom: 'shade?',
        adjustment: -0.4
    },
    { 
        id: 'measure',
        labelTop: 'How we',
        labelBottom: 'measure it',
        adjustment: 0.1
    },
    { 
        id: 'how-much',
        labelTop: 'How much',
        labelBottom: 'is there?',
        activeIds: ['how-much', 'how-much2', 'map', 'map2', 'map3'],
        adjustment: -0.1
    },
    { 
        id: 'map4',
        labelTop: 'Find your',
        labelBottom: 'route',
        adjustment: -0.3
    },
    { 
        id: 'difference',
        labelTop: 'Make a',
        labelBottom: 'Difference',
        adjustment: -0.1
    }
]

// steps are utilized separately from sections
export const steps = ["map", "map2", "map3", "map4"]
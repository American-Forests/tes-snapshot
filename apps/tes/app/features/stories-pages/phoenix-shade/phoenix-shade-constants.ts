import { CoverSectionProps, NavSection } from "../shared/types"

export const boldText = "font-bold text-[#E1FF00]"

export const phoenixCoverProps: CoverSectionProps = {
    location: "PHOENIX AZ",
    title: "From Heat Crisis to Shade Solutions: Beating the Heat in Public Parks",
    subtitle: "The City of Phoenix is leading the way to cool its neighborhoods and make public spaces safer year round. Learn how cutting-edge shade data is turning plans into action.",
    coverImage: "phx_cover_img.jpg",
    locationColor: "#E1FF00",
    titleColor: "text-white",
    titleLength: "long"
}

export const phoenixSections: NavSection[] = [
    { 
        id: 'why',
        labelTop: 'Why',
        labelBottom: 'shade?',
        activeIds: ['why', 'why2', 'why3'],
        adjustment: -0.3
    },
    { 
        id: 'vision',
        labelTop: 'A Bold',
        labelBottom: 'Vision',
        activeIds: ['vision', 'vision2', 'vision3'],
        adjustment: -0.3
    },
    { 
        id: 'cutting-edge',
        labelTop: 'Cutting-',
        labelBottom: 'Edge Data',
        adjustment: -0.1
    },
    { 
        id: 'action',
        labelTop: 'Data to',
        labelBottom: 'Action',
        activeIds: ['action', 'action2'],
        adjustment: 0.1
    },
    { 
        id: 'next',
        labelTop: "What's",
        labelBottom: 'Next',
        adjustment: 0.2
    }
]

export const steps = ["map"]
import { makeStyles } from "@material-ui/core/styles"

export const mainText =
"md:text-xl text-sm bg-[#171717]/80 text-white p-4 md:p-6 w-[90%] md:max-w-xl sm:max-w-sm max-w-xs mx-auto flex-1 text-center z-30"

export const staticText =
"md:text-xl text-sm text-white p-4 md:p-6 w-[90%] md:max-w-xl max-w-sm mx-auto my-10 md:my-20 flex-1 text-center"

export const superText = "text-[65%] leading-0 align-super"

export const imageCaption = "sm:text-xs text-[.65rem] text-white pt-1"

export const stepStart = "-mt-[50vh] mb-[80vh]"

export const stepMain = "mb-[80vh]"

export const stepMap = "mb-[100vh]"

export const stepEnd = "mb-[50vh]"

export const stepTransition = "mb-0"

export const basicLink = "underline hover:no-underline"


export const MAPBOX_TOKEN = "pk.eyJ1IjoiZ3Jvc2VuYmVyZy1hZiIsImEiOiJjbDM4djVxYXAwMjBkM21xanhidG5jeG85In0.YS-blHgTVodwT5rW4RicuA";

export const mapStyles = {
    satellite: "mapbox://styles/mapbox/satellite-v9",
    dark: "mapbox://styles/mapbox/dark-v11",
    light: "mapbox://styles/mapbox/light-v11"
}

export const useStyles = makeStyles({
    // Switch styles
    root: {
        width: 56,
        height: 32,
        padding: 0,
        marginRight: 2,
        display: "flex",
        alignItems: "center",
    },
    switchBase: {
        padding: 4,
        top: "auto",
        "&$checked": {
            transform: "translateX(24px)",
            color: "#17715C !important",
            "& + $track": {
                backgroundColor: "#17715C !important",
                opacity: "1 !important",
            },
        },
        "&$checked $thumb": {
            backgroundColor: "#17715C !important",
            borderColor: "white !important",
        },
    },
    thumb: {
        width: 24,
        height: 24,
        backgroundColor: "#94CCBF !important",
        border: "4px solid white !important",
    },
    track: {
        borderRadius: 32 / 2,
        height: 16,
        top: "50%",
        backgroundColor: "#94CCBF !important",
        opacity: "1 !important",
    },
    checked: {},
    switchLabel: {
        marginRight: 24,
        color: "white",
    },

    // Slider styles
    slider: {
        color: "#17715C",
        height: 4,
        "& .MuiSlider-rail": {
        height: 4,
        backgroundColor: "white",
        opacity: 1,
        },
        "& .MuiSlider-track": {
        height: 4,
        backgroundColor: "white",
        },
        "& .MuiSlider-thumb": {
        width: 24,
        height: 24,
        backgroundColor: "#17715C",
        border: "4px solid white",
        marginTop: -10, // Centers thumb on track: -(thumbHeight - trackHeight)/2
        "&:focus, &:hover, &.Mui-active": {
            boxShadow: "none",
        },
        },
        "& .MuiSlider-mark": {
        backgroundColor: "white",
        height: 12,
        width: 4,
        marginTop: -4, // Centers mark on track
        },
        "& .MuiSlider-markLabel": {
        color: "white",
        fontWeight: "bold",
        fontSize: "14px",
        textShadow: "0 0 4px rgba(0,0,0,0.75)",
        },
    },
    shortSlider: {
        width: 200, // 64 * 4px
    },
    longSlider: {
        width: 384, // 96 * 4px
    },
})


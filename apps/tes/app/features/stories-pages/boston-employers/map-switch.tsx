import { makeStyles } from "@material-ui/core/styles"
import { Switch } from "@material-ui/core"

export const useStyles = makeStyles({
    // Switch styles
    root: {
        width: 56,
        height: 32,
        padding: 0,
        marginRight: 8,
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
})

const MapSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {
    const classes = useStyles()

    return (
      <Switch
        checked={checked}
        onChange={onChange}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
      />
    )
  }

export default MapSwitch
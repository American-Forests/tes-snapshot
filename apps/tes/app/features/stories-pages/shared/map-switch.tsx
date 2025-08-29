import { useStyles } from "./constants"
import { Switch } from "@material-ui/core"

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
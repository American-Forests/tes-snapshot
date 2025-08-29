import { ListItemProps } from "./detroit-shade.types"
import { CheckCircledIcon } from "@radix-ui/react-icons"
import BasicLink from "../shared/basic-link"

const BulletList = ({ text, link }: ListItemProps) => (
    <li className="pb-4 flex">
      <CheckCircledIcon className="ml-2 mr-2 shrink-0 mt-1" />
      <span>
        {text}
        {link && (
          <>
            {" "}
            <BasicLink url={link.url} text={link.text} />
          </>
        )}.
      </span>
    </li>
  )

export default BulletList
import { basicLink } from "./constants"
import { BasicLinkProps } from "./types"

const BasicLink = ({ url, text }: BasicLinkProps) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={basicLink}
    >
      {text}
    </a>
  )

export default BasicLink
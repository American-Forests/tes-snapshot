import { useEffect, useState } from "react"

export const useCopyRouteUrlToClipboard = () => {
  const [copySuccess, setCopySuccess] = useState(false)
  const handleCopyClick = () => {
    const routeURL = window.location.href

    navigator?.clipboard
      ?.writeText(routeURL)
      .then(() => {
        setCopySuccess(true)
      })
      .catch((error) => {
        console.error("Failed to copy route URL:", error)
      })
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(false)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [copySuccess])
  return { copySuccess, handleCopyClick }
}

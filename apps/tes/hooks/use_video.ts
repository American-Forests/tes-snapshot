import { useEffect, useState } from "react"

interface NetworkInformation {
    downlink: number
  }
  type NavigatorWithConnection = Navigator & {
    connection: NetworkInformation
  }

export const useVideo = (video: React.RefObject<HTMLVideoElement>) => {
  const [isPlaying, setIsPlaying] = useState(true)
  useEffect(() => {
    // Avoid downloading the video on slow connections
    try {
    const connection = (navigator as NavigatorWithConnection).connection
    if (connection && connection.downlink < 2) {
        video.current!.src = ""
    }
    } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    }
  }, [])
        
  useEffect(() => {
    // Avoid autoplay in reduced motion mode
    if (window.matchMedia("(prefers-reduced-motion)").matches) {
    video.current?.pause()
    setIsPlaying(false)
    }
  }, [])

  const toggleVideoPlay = () => {
    if (isPlaying) {
      video.current?.pause()
    } else {
      video.current?.play()
    }

    setIsPlaying(!isPlaying)
  }

  return { toggleVideoPlay, isPlaying }
}

import React, { useRef, useEffect } from 'react'
import Script from 'next/script'
import { FlourishProps, WindowWithVisuals } from './types'

const FlourishChart: React.FC<FlourishProps> = ({ storyId, width }) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const isLongId = storyId.length === 8 // for Detroit story
  const embedType = isLongId ? 'visualisation' : 'story'

  useEffect(() => {
    const loadFlourishScript = () => {
      return new Promise<void>((resolve) => {
        if ((window as WindowWithVisuals).visuals) {
          resolve()
          return
        }
        const script = document.createElement('script')
        script.src = 'https://public.flourish.studio/resources/embed.js'
        script.onload = () => resolve()
        document.head.appendChild(script)
      })
    }

    const loadChart = async () => {
      if (!chartRef.current) return
      
      chartRef.current.innerHTML = ''
      
      ;(window as WindowWithVisuals).FlourishLoaded = false
      
      await loadFlourishScript()
      
      const windowWithVisuals = window as WindowWithVisuals
      if (windowWithVisuals.visuals?.loadEmbed) {
        await windowWithVisuals.visuals.loadEmbed(`${embedType}/${storyId}`)
      }
    }

    loadChart()

    return () => {
      if (chartRef.current) chartRef.current.innerHTML = ''
    }
  }, [storyId])

  return (
    <>
      <Script
        src="https://public.flourish.studio/resources/embed.js"
        strategy="lazyOnload"
      />
      <div className="w-full flex items-center justify-center">
        <div 
          ref={chartRef}
          className={`${width} flourish-embed max-w-6/12 mx-auto`}
          data-src={`${embedType}/${storyId}`}
        />
      </div>
    </>
  )
}

export default FlourishChart
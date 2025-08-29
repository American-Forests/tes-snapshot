import { useEffect, useState } from "react"
import { usePDF } from "@react-pdf/renderer"
import { debounce } from "lodash"
import { MapPDF } from "../components/map_pdf"
import mapboxgl from "mapbox-gl"

// https://dev.to/nombrekeff/download-file-from-blob-21ho
function downloadBlob(blob: Blob, name = "file.txt") {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob)

  // Create a link element
  const link = document.createElement("a")

  // Set link's href to point to the Blob URL
  link.href = blobUrl
  link.download = name

  // Append link to the body
  document.body.appendChild(link)

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  )

  // Remove link from body
  document.body.removeChild(link)
}

// code for this hook is taken from this demo: https://gist.github.com/caseycesari/470d6c0037da363c9864b0b81c1c9b63
export function usePrintableMap(map: mapboxgl.Map | null, cityTitle: string) {
  if (typeof window === undefined) return
  const [mapImage, setMapImage] = useState<string | null>(null)
  const [isPDFAllowedToUpdate, setIsPDFAllowedToUpdate] = useState<boolean>(false)
  const [isPDFReadyForExport, setIsPDFReadyForExport] = useState<boolean>(false)
  const [mapUpdateAssigned, setMapUpdateAssigned] = useState<boolean>(false)

  const startPDFUpdateProcess = () => {
    setIsPDFAllowedToUpdate(true)
  }

  const [pdfInstance, updatePDFInstance] = usePDF({ document: MapPDF(mapImage, cityTitle) })

  useEffect(() => {
    if (isPDFAllowedToUpdate) {
      const pdfDocument = MapPDF(mapImage, cityTitle)
      updatePDFInstance(pdfDocument)
      setIsPDFReadyForExport(true)
    }
  }, [isPDFAllowedToUpdate, mapImage])

  const { blob: pdfBlob, loading: pdfLoading, error: pdfError } = pdfInstance

  useEffect(() => {
    if (isPDFReadyForExport && !pdfLoading && pdfBlob) {
      downloadBlob(pdfBlob, "map.pdf")

      setIsPDFAllowedToUpdate(false)
      setIsPDFReadyForExport(false)
    }
  }, [isPDFReadyForExport, pdfLoading, pdfBlob])

  useEffect(() => {
    if (pdfError) {
      setIsPDFAllowedToUpdate(false)
      setIsPDFReadyForExport(false)
    }
  }, [pdfError])

  useEffect(() => {
    if (map && !mapUpdateAssigned) {
      const updateMapImage = () => setMapImage(map.getCanvas().toDataURL("image/png"))

      const debouncedGetMapImage = debounce(updateMapImage, 500)

      map.on("moveend", () => {
        debouncedGetMapImage()
      })

      map.on("data", () => {
        debouncedGetMapImage()
      })

      setMapUpdateAssigned(true)
    }
  })

  return startPDFUpdateProcess
}

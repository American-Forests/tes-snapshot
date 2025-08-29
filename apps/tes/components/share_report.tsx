import Dialog from "@reach/dialog"
import VisuallyHidden from "@reach/visually-hidden"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { XCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

export default function ShareReport() {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)
  return (
    <div className="flex print:hidden">
      <button
        onClick={open}
        className="bg-brand-green-dark px-4 text-md py-1 rounded-full text-white flex items-center"
      >
        Share report
        <ArrowRightIcon className="w-3 h-3 ml-2" />
      </button>

      <Dialog isOpen={showDialog} onDismiss={close} aria-label="Help">
        <div className="relative z-50 bg-white">
          <button className="absolute top-1 right-1 text-gray-500 hover:text-black" onClick={close}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>
              <XCircleIcon className="w-6 h-6" />
            </span>
          </button>
          <h3 className="text-xl pb-4">Share this report with others</h3>
          <div className="prose prose-md">
            <h4>Share as PDF</h4>
            <ol>
              <li>On the top left-hand corner of your screen, click File → Print</li>
              <li>Alternatively, press Ctrl+P (Windows) or Cmd+P (macOS)</li>
              <li>Under the 'Destination' section, click Change… → Save as PDF</li>
              <li>Click the 'Save' button, pick the name and location for your PDF</li>
            </ol>
            <h4>Share this report web page</h4>
            <div>
              This report can be shared and accessed by others by copying the URL of this page.
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

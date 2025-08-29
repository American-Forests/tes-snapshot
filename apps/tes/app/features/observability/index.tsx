import { useEffect } from "react"
import { HoneycombWebSDK } from "@honeycombio/opentelemetry-web"
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web"

const Observability = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY &&
        process.env.NEXT_PUBLIC_HONEYCOMB_SERVICE_NAME
      ) {
        const sdk = new HoneycombWebSDK({
          debug: process.env.NODE_ENV !== "production", // false in production
          apiKey: process.env.NEXT_PUBLIC_HONEYCOMB_API_KEY,
          serviceName: process.env.NEXT_PUBLIC_HONEYCOMB_SERVICE_NAME,
          instrumentations: [getWebAutoInstrumentations()],
        })
        sdk.start()
      }
    }
  }, [])

  return null
}

export default Observability

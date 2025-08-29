import { Document, Page, Image, View } from "@react-pdf/renderer"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MapPDF = (mapImage: string | null, _cityTitle: string) => {
  return (
    <Document>
      <Page>
        <View style={{ padding: 30 }}>
          {mapImage ? <Image src={mapImage} style={{ width: "100%" }} /> : <></>}
        </View>
      </Page>
    </Document>
  )
}

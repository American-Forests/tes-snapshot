/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs")
const path = require("path")

const VALID_CITIES = ["richmond", "dc", "boston", "ruston"]
let combinedFacets = []

for (let city of VALID_CITIES) {
  const filePath = path.join(".", "local", "location", city, "processed_facet_schemas.json")
  const data = fs.readFileSync(filePath, "utf-8")
  const facets = JSON.parse(data)
  combinedFacets = [...combinedFacets, ...facets]
}

fs.writeFileSync("./data/processed_facet_schemas.json", JSON.stringify(combinedFacets))

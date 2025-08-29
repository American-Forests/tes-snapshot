/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs")
const { default: getBbox } = require("@turf/bbox")
const { chain } = require("stream-chain")
const { parser } = require("stream-json")
const { pick } = require("stream-json/filters/Pick")
const { streamArray } = require("stream-json/streamers/StreamArray")

// as multipolygon -- converts a geometry into a multipolygon if it isn't already
function as_mp(maybe) {
  if (maybe.type == "MultiPolygon") {
    return maybe
  } else {
    return {
      type: "MultiPolygon",
      coordinates: [maybe.coordinates],
    }
  }
}

const toSQL = (val) => {
  switch (typeof val) {
    case "string":
      const str = val.replace(/'/g, "\\'")
      return `E'${str}'`
    case "number":
      return val
    case "boolean":
      return val ? "TRUE" : "FALSE"
    case "object":
      return "NULL"
  }
}

function getMunicipalityQuery(munips, city) {
  const columns = [
    "geom",
    "center",
    "city",
    "state",
    "incorporated_place_name",
    "incorporated_place_mean_tree_equity_score",
  ].join(",")
  let query = `INSERT INTO "Municipality" (${columns}) VALUES `
  let values = []

  for (const f of munips) {
    const geometry = as_mp(f["geometry"])
    const data = [
      f["properties"]["state"],
      f["properties"]["incorporated_place_name"],
      f["properties"]["incorporated_place_mean_tree_equity_score"],
    ]
      .map(toSQL)
      .join(",")
    let geomSql = `ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'), 4326)`
    let centerSql = `ST_Centroid(ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(
      geometry
    )}'), 4326))`
    let value = `(${geomSql}, ${centerSql},'${city.toUpperCase()}'::"City", ${data})`
    values.push(value)
  }

  const query_string = query + values.join(",") + ";"

  // replace last comma with semicolon
  return query_string
}

function getBlockgroupQuery(blockgroups, city) {
  let properties = new Set()
  for (let f of blockgroups) {
    for (let p of Object.keys(f["properties"])) {
      properties.add(p)
    }
  }
  properties.delete("geoid")
  const columns = ["id", "extent", "geom", "city", ...properties]
  let query = `INSERT INTO "Blockgroup" (${columns.join(",")}) VALUES `
  let values = []
  for (const f of blockgroups) {
    const geometry = as_mp(f["geometry"])
    const bbox = getBbox(geometry)
    const p = f["properties"]
    const id = p["geoid"]
    delete p["geoid"]
    const p_keys = new Set(Object.keys(p))
    let data = []
    for (let prop of properties) {
      if (p_keys.has(prop)) data.push(p[prop])
      else data.push(null)
    }
    data = data.map(toSQL).join(",")
    let value = `('${id}', 
      '${JSON.stringify(bbox)}'::json, 
      ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'), 4326), 
      '${city.toUpperCase()}'::"City", 
      ${data})`
    values.push(value)
  }
  const query_string =
    query +
    values.join(",") +
    " ON CONFLICT (id) DO UPDATE SET " +
    columns.map((column) => `${column} = excluded.${column}`).join(",") +
    ";"

  // replace last comma with semicolon
  return query_string
}

function getAreaQuery(areas, areaType, city) {
  let properties = new Set()
  for (let f of areas) {
    for (let p of Object.keys(f["properties"])) {
      properties.add(p)
    }
  }
  properties.delete("geoid")
  const columns = ["extent", '"blockgroupId"', "geom", "type", "city", ...properties]
  let query = `INSERT INTO "Area" (${columns.join(",")}) VALUES `
  let values = []

  for (const f of areas) {
    const geometry = as_mp(f["geometry"])
    const bbox = getBbox(geometry)
    const p = f["properties"]
    const blockgroupId = +p["geoid"]
    delete p["geoid"]
    const p_keys = new Set(Object.keys(p))
    let data = []
    for (let prop of properties) {
      if (p_keys.has(prop)) data.push(p[prop])
      else data.push(null)
    }
    data = data.map(toSQL).join(",")
    let value = `('${JSON.stringify(bbox)}'::json, 
      ${blockgroupId}, 
      ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'), 4326), 
      '${areaType}'::"AreaType", '${city.toUpperCase()}'::"City", ${data})`
    values.push(value)
  }

  const query_string =
    query +
    values.join(",") +
    " ON CONFLICT (af_id) DO UPDATE SET " +
    columns.map((column) => `${column} = excluded.${column}`).join(",") +
    ";"

  return query_string
}

function getRowQuery(row, city) {
  return getAreaQuery(row, "RIGHT_OF_WAY", city)
}

function getParcelQuery(parcels, city) {
  return getAreaQuery(parcels, "PARCEL", city)
}

function getTreeQuery(trees, city) {
  const columns = ["geom", "city"]
  let query = `INSERT INTO "TreeCanopy" (${columns}) VALUES `
  let values = []

  for (const f of trees) {
    const geometry = as_mp(f["geometry"])
    let value = `(ST_SetSRID(ST_GeomFromGeoJSON('${JSON.stringify(
      geometry
    )}'), 4326), '${city.toUpperCase()}'::"City")`
    values.push(value)
  }

  const query_string = query + values.join(",") + ";"
  return query_string
}

function getQuery(layer) {
  switch (layer) {
    case "municipalities":
      return getMunicipalityQuery
    case "blockgroups":
      return getBlockgroupQuery
    case "rows":
      return getRowQuery
    case "parcels":
      return getParcelQuery
    case "trees":
      return getTreeQuery
  }
}

async function streamAndLoadData(file, queryFunc, city) {
  let promise = new Promise((resolve) => {
    let jsonData = []
    const pipeline = chain([
      fs.createReadStream(file),
      parser(),
      pick({ filter: "features" }),
      streamArray(),
      (data) => {
        jsonData.push(data.value)
        if (jsonData.length == 5000) {
          console.log(queryFunc(jsonData, city))
          jsonData = []
        }
      },
    ])

    pipeline.on("data", () => {})
    pipeline.on("end", () => {
      console.log(queryFunc(jsonData, city))
      resolve("done")
    })
  })

  return promise
}

function loadData(city, layer) {
  const filepath = `./local/location/${city}/${layer}.geojson`
  const folderpath = `./local/location/${city}/${layer}`
  // console.log(filepath)
  // console.log(folderpath)
  try {
    if (fs.existsSync(filepath)) {
      return streamAndLoadData(filepath, getQuery(layer), city)
    } else if (fs.existsSync(folderpath)) {
      const files = fs.readdirSync(folderpath)
      const promises = []
      for (const file of files) {
        promises.push(streamAndLoadData(`${folderpath}/${file}`, getQuery(layer), city))
      }
      return Promise.all(promises)
    } else {
      console.error(`File or folder ${city} ${layer} does not exist.`)
    }
  } catch (err) {
    console.error(err)
  }
}

function loadCities(cities, layers) {
  if (CASCADE) {
    console.log('TRUNCATE "Area" CASCADE;')
    console.log('TRUNCATE "Municipality" CASCADE;')
    console.log('TRUNCATE "Blockgroup" CASCADE;')
  } else if (layers.includes(MUNICIPALITY_LAYER)) {
    for (const city of cities) {
      console.log(`DELETE FROM "Municipality" WHERE city = '${city.toUpperCase()}';`)
    }
  }

  if (layers.includes(TREE_LAYER)) {
    for (const city of cities) {
      console.log(`DELETE FROM "TreeCanopy" WHERE city = '${city.toUpperCase()}';`)
    }
  }

  function emptyPromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("done")
      }, 1)
    })
  }

  for (let city of cities) {
    const layersBool = VALID_LAYERS.map((layer) => layers.includes(layer))
    const promises = [
      () =>
        layersBool[0]
          ? streamAndLoadData(`./local/location/${city}/munips.geojson`, getMunicipalityQuery, city)
          : emptyPromise(),
      () =>
        layersBool[1]
          ? streamAndLoadData(
              `./local/location/${city}/blockgroups.geojson`,
              getBlockgroupQuery,
              city
            )
          : emptyPromise(),
      () => (layersBool[2] ? loadData(city, PARCEL_LAYER) : emptyPromise()),
      () =>
        layersBool[3]
          ? streamAndLoadData(`./local/location/${city}/row.geojson`, getRowQuery, city)
          : emptyPromise(),
      () =>
        layersBool[4]
          ? streamAndLoadData(`./local/location/${city}/trees.geojson`, getTreeQuery, city)
          : emptyPromise(),
    ]

    promises[0]().then(() => {
      promises[1]().then(() => {
        promises[2]().then(() => {
          promises[3]().then(() => {
            promises[4]()
          })
        })
      })
    })
  }
}

const CASCADE_FLAG = "--cascade"
const ALL_LOCATIONS_FLAG = "--all-locations"
const ALL_LAYERS_FLAG = "--all-layers"
const LOCATION_FLAG = "--location"
const LAYER_FLAG = "--layer"
let CASCADE = false
const VALID_CITIES = ["richmond", "dc", "boston", "ruston"]
const VALID_FLAGS = [CASCADE_FLAG, LOCATION_FLAG, ALL_LAYERS_FLAG, ALL_LOCATIONS_FLAG, LAYER_FLAG]
const MUNICIPALITY_LAYER = "munips"
const BLOCKGROUP_LAYER = "blockgroups"
const PARCEL_LAYER = "parcels"
const ROW_LAYER = "row"
const TREE_LAYER = "trees"
const VALID_LAYERS = [MUNICIPALITY_LAYER, BLOCKGROUP_LAYER, PARCEL_LAYER, ROW_LAYER, TREE_LAYER]
let citiesToLoad = []
let layersToLoad = []

function parseArgs() {
  const args = process.argv.slice(2)
  try {
    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i]
      if (arg === CASCADE_FLAG) CASCADE = true
      else if (arg === ALL_LOCATIONS_FLAG) citiesToLoad = VALID_CITIES
      else if (arg === LOCATION_FLAG) {
        let j
        for (j = i + 1; j < args.length; j += 1) {
          const location = args[j]
          if (VALID_CITIES.includes(location)) citiesToLoad.push(location)
          else if (VALID_FLAGS.includes(location)) {
            j -= 1
            break
          } else
            throw new Error(
              `'${location}' is an invalid TESA location. the valid TESA locations are [${VALID_CITIES.map(
                (city) => `'${city}'`
              ).join(
                ", "
              )}]. if you wish to run this for all valid TESA locations, use the '--all-locations' flag instead of the '--location' flag.`
            )
        }
        i = j
      } else if (arg === ALL_LAYERS_FLAG) layersToLoad = VALID_LAYERS
      else if (arg === LAYER_FLAG) {
        let j
        for (j = i + 1; j < args.length; j += 1) {
          const layer = args[j]
          if (VALID_LAYERS.includes(layer)) layersToLoad.push(layer)
          else if (VALID_FLAGS.includes(layer)) {
            j -= 1
            break
          }
        }
        i = j
      } else
        throw new Error(
          `${arg} is an invalid flag. must be one of [${VALID_FLAGS.map((flag) => `'${flag}'`).join(
            ", "
          )}].`
        )
    }
    if (citiesToLoad.length == 0)
      throw new Error(
        `No TESA locations were specified. Use the --location flag to specify an individual or multiple locations. Or the --all-locations flag to load all locations. The valid TESA locations are [${VALID_CITIES.map(
          (city) => `'${city}'`
        ).join(", ")}].`
      )

    if (layersToLoad.length == 0)
      throw new Error(
        `No layers were specified. Use the --layer flag to specify an one or multiple layers to load. Or the --all-layers flag to load all layers. The valid layers are [${VALID_LAYERS.map(
          (city) => `'${city}'`
        ).join(", ")}].`
      )
  } catch (e) {
    console.log(e)
  }
}

parseArgs()
loadCities(citiesToLoad, layersToLoad)

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs")
const csv = require("csv-parse")
const path = require("path")

async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = []
    fs.createReadStream(filePath)
      .pipe(csv.parse({ columns: true, skip_empty_lines: true }))
      .on("data", (row) => results.push(row))
      .on("error", (error) => reject(error))
      .on("end", () => resolve(results))
  })
}

async function main() {
  console.log('TRUNCATE "User" RESTART IDENTITY CASCADE;')

  // Process users
  const usersFile = path.join(__dirname, "data/merged/users.csv")
  const users = await parseCSV(usersFile)

  const userValues = users
    .map((row) => {
      const name = row.name?.replace(/'/g, "''") || null
      const email = row.email?.replace(/'/g, "''") || null
      const hashedPassword = row.hashedPassword?.replace(/'/g, "''") || null
      const role = row.role?.replace(/'/g, "''") || null

      return `(
      ${row.createdAt ? `'${row.createdAt}'` : "NOW()"},
      ${row.updatedAt ? `'${row.updatedAt}'` : "NOW()"},
      ${name ? `'${name}'` : "NULL"},
      ${email ? `'${email}'` : "NULL"},
      ${hashedPassword ? `'${hashedPassword}'` : "NULL"},
      ${role ? `'${role}'` : "NULL"}
    )`
    })
    .join(",\n")

  console.log(`
    INSERT INTO "User" (
      "createdAt",
      "updatedAt", 
      name,
      email,
      "hashedPassword",
      role
    ) VALUES ${userValues};
  `)

  // Process scenarios
  const scenariosFile = path.join(__dirname, "data/merged/scenarios.csv")
  const scenarios = await parseCSV(scenariosFile)

  const scenarioValues = scenarios
    .map((row) => {
      const name = row.name?.replace(/'/g, "''") || null
      const city = row.city?.replace(/'/g, "''") || null

      return `(
      ${name ? `'${name}'` : "NULL"},
      ${row.createdAt ? `'${row.createdAt}'` : "NOW()"},
      ${row.updatedAt ? `'${row.updatedAt}'` : "NOW()"},
      ${row.userId},
      ${city ? `'${city}'` : "NULL"}
    )`
    })
    .join(",\n")

  console.log(`
    INSERT INTO "Scenario" (
      name,
      "createdAt",
      "updatedAt",
      "userId",
      city
    ) VALUES ${scenarioValues};
  `)

  // Process blockgroupOnScenarios
  const blockgroupOnScenariosFile = path.join(__dirname, "data/merged/blockgroupOnScenarios.csv")
  const blockgroupOnScenarios = await parseCSV(blockgroupOnScenariosFile)

  const blockgroupValues = blockgroupOnScenarios
    .map((row) => {
      const name = row.name?.replace(/'/g, "''") || null

      return `(
      ${row.scenarioId},
      '${row.blockgroupId}',
      ${row.targetArea},
      ${row.treeEquityScoreTarget},
      ${name ? `'${name}'` : "NULL"},
      ${row.tes_change || "NULL"},
      ${row.target_change || "NULL"},
      ${row.target_area_change || "NULL"},
      ${row.land_area_change || "NULL"},
      ${row.area_geoid_change || "NULL"},
      ${row.lookup_geoid_change || "NULL"}
    )`
    })
    .join(",\n")

  console.log(`
    INSERT INTO "BlockgroupOnScenario" (
      "scenarioId",
      "blockgroupId",
      "targetArea",
      "treeEquityScoreTarget",
      name,
      tes_change,
      target_change,
      target_area_change,
      land_area_change,
      area_id_change,
      lookup_id_change
    ) VALUES ${blockgroupValues};
  `)

  // Process areaOnScenarios
  const areaOnScenariosFile = path.join(__dirname, "data/merged/areaOnScenarios.csv")
  const areaOnScenarios = await parseCSV(areaOnScenariosFile)

  const areaValues = areaOnScenarios
    .map((row) => {
      const name = row.name?.replace(/'/g, "''") || null

      return `(
      ${row.scenarioId},
      '${row.areaId}',
      ${row.treesLarge},
      ${row.treesMedium}, 
      ${row.treesSmall},
      ${name ? `'${name}'` : "NULL"}
    )`
    })
    .join(",\n")

  console.log(`
    INSERT INTO "AreaOnScenario" (
      "scenarioId",
      "areaId",
      "treesLarge",
      "treesMedium",
      "treesSmall",
      name
    ) VALUES ${areaValues};
  `)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

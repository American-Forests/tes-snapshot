/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs")
const { parse } = require("csv-parse/sync")
const { PrismaClient } = require('@prisma/client')

async function loadITreeData() {
  const prisma = new PrismaClient()
  
  try {
    // Parse CSV file
    const itreeData = parse(fs.readFileSync("./local/itree.csv"), { columns: true })
    
    // Bulk create records
    const createdRecords = await prisma.iTree.createMany({
      data: itreeData.map(row => ({
        fips: row.fips,
        co2_value: parseFloat(row.co2_value || 0),
        co2: parseFloat(row.co2 || 0),
        co_value: parseFloat(row.co_value || 0),
        co: parseFloat(row.co || 0),
        no2_value: parseFloat(row.no2_value || 0),
        no2: parseFloat(row.no2 || 0),
        ozone_value: parseFloat(row.ozone_value || 0),
        ozone: parseFloat(row.ozone || 0),
        pm25_value: parseFloat(row.pm25_value || 0),
        pm25: parseFloat(row.pm25 || 0),
        pm10_value: parseFloat(row.pm10_value || 0),
        pm10: parseFloat(row.pm10 || 0),
        so2_value: parseFloat(row.so2_value || 0),
        so2: parseFloat(row.so2 || 0),
        rain_int: parseFloat(row.rain_int || 0),
        runoff_avoided_value: parseFloat(row.runoff_avoided_value || 0),
        runoff_avoided: parseFloat(row.runoff_avoided || 0),
        total_ecosystem_service_value: parseFloat(row.total_ecosystem_service_value || 0)
      })),
      skipDuplicates: true // Optional: skip duplicate entries
    })
    
    console.log(`Loaded ${createdRecords.count} iTree records`)
  } catch (error) {
    console.error('Error loading iTree data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the loading function
loadITreeData()

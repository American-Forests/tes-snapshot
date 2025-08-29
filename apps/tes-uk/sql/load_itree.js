/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { parse } = require("csv-parse/sync")

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

function getITreeInsertString() {
  let sql_string = 'INSERT INTO "iTree" '
  let values = []
  const itree = parse(fs.readFileSync("../local/itree_uk_23.csv"), { columns: true })
  let columns = Object.keys(itree[0]).slice(1)
  sql_string += `(${columns}) VALUES `
  for (let row of itree) {
    let rowValues = []
    for (const [key, value] of Object.entries(row).slice(1)) {
      if (key == "la_code") rowValues.push(toSQL(value))
      else rowValues.push(toSQL(parseFloat(value)))
    }
    values.push(`(${rowValues.join(",")})`)
  }
  sql_string += values.join(",") + ";"
  return sql_string
}

console.log('TRUNCATE "iTree";')
console.log(getITreeInsertString())

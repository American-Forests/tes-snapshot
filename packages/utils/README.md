# utils package

This is the `utils` package, part of the `tes-monorepo`. It contains shared utilities that other apps and packages within this monorepo can leverage.

## Usage

To use the utilities within another app in this monorepo, add the `utils` package as a dependency in the `package.json` of the consuming package:

```
"dependencies": {
  "utils": "*"
}
```

Then, import the utilities you need:

```
import { squareFeetToAcres } from 'utils';

const acres = squareFeetToAcres(145);
```

If the consuming app is a Blitz.js application, you need to modify the `blitz.config.ts` so that the imported package is bundled correctly. Add the `utils` package to the array passed to `withTm`. Here's a example Blitz config file that transpiles 3 importated packages:

```
import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
import withTm from "next-transpile-modules"
const transpiled = withTm(["ui", "react-hooks", "utils"])
const config: BlitzConfig = transpiled({
  middleware: [
    sessionMiddleware({
      cookiePrefix: "tes-uk",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
})
module.exports = config
```

## Utilities

The utilities are organized into subfolders to maintain modularity and ease of navigation:

### `formatting`

Utilities aimed at formatting data for display.

### `conversion`

Utilities aimed at converting between different units of measurement.

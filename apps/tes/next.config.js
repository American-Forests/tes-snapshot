const { withBlitz } = require("@blitzjs/next");
/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  transpilePackages: ["ui", "react-hooks", "utils", '@radix-ui']
}
module.exports = withBlitz(config);

const {sessionMiddleware, simpleRolesIsAuthorized} = require("blitz");
const { withBlitz } = require("@blitzjs/next");
const config = {
  transpilePackages: ["ui", "react-hooks", "utils", '@radix-ui']
}
module.exports = withBlitz(config);

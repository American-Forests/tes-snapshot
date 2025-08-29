// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharedConfig = require("tailwind-config/tailwind.config.js")

module.exports = {
  ...sharedConfig,
  content: [
    "app/**/*.{js,ts,jsx,tsx}",
    "pages/**/*.{js,ts,jsx,tsx}",
    path.join(path.dirname(require.resolve("ui")), "**/*.{js,ts,jsx,tsx}"),
  ],
  corePlugins: {
    outline: false,
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}

/* eslint-disable @typescript-eslint/no-var-requires */
const sharedConfig = require("tailwind-config/tailwind.config.js")
const plugin = require("tailwindcss/plugin")

const capitalizeFirst = plugin(function ({ addUtilities }) {
  const newUtilities = {
    ".capitalize-first:first-letter": {
      textTransform: "uppercase",
    },
  }
  addUtilities(newUtilities, ["responsive", "hover"])
})

module.exports = {
  ...sharedConfig,
  content: [
    "pages/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{js,ts,jsx,tsx}",
    "app/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    outline: false,
  },
  plugins: [
    ...sharedConfig.plugins,
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    capitalizeFirst,
  ]
}

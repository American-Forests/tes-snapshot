module.exports = {
    extends: ["eslint-config-custom"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2021,
    },
    extends: ["plugin:@typescript-eslint/recommended"],
    ignorePatterns: ["node_modules/", "dist/", ".next/", "next.config.js"],
}

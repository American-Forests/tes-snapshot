module.exports = {
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    // "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": "#6cc296",
        "brand-green-dark": "#33966d",
        "brand-green-light": "#CEEBDD",
        "brand-green-pale": "#DFF4E5",
        "brand-green-darker": "#005251",
        "brand-blue-dark": "#3D82A1",
        "brand-mint-green": "#6AC397",
        "brand-orange": "#f89c3e",
        "brand-orange-light": "#f9c793",
        "brand-orange-dark": "#d98935",
        "brand-gray-pale": "#EDEDED",
        "brand-gray": "#f5f5f5",
        "brand-blue-pale": "#CAE7F0",
        "link-blue": "#00807E",
        "uk-green": "#006554",
        "brand-gradient-ltblue": "#ECF5F2",
      },
      fontSize: {
        annotation: "0.7rem",
        caption: "0.9rem",
        body: "1rem",
        subtitle: "1.115rem",
        title: "1.563rem",
        headline: "1.953rem",
      },
      screens: {
        print: { raw: "print" },
        "3xl": "1920px",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};

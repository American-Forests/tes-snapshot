module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest with Blitz's preset for all js, jsx, ts, and tsx files
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['blitz/babel'] }]
  },
  transformIgnorePatterns: [
    "node_modules/(?!(d3-array|internmap)/)"  // Exclude d3-array and internmap from being ignored
  ],
};

module.exports = {
  preset: "jest-puppeteer",
  testRegex: ["./*\\.test\\.js$", "./*\\.test\\.ts$"],
  setupFilesAfterEnv: ["./setupTests.js"],
  transform: {
    "\\.ts$": "<rootDir>/node_modules/babel-jest",
  },
};

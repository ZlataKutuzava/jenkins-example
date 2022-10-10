const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 20000,
    chromeWebSecurity: false,
    baseUrl: "https://reqres.in/api",
    blockHosts: "www.google-analytics.com",
    supportFile: "cypress/support/index.ts",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      // on("before:browser:launch", (browser, launchOptions) => {
      //   if (browser.family === "chrome") {
      //     launchOptions.preferences.default.intl = { accept_languages: "en_CA" };
      //     return launchOptions;
      //   }
      // });
    },
  },
  trashAssetsBeforeRuns: true,
  viewportWidth: 1600,
  viewportHeight: 1600,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    json: true,
    html: false,
  },
});

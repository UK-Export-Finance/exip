const { defineConfig } = require('cypress');

const cypressConfig = defineConfig({
  numTestsKeptInMemory: 1,
  basicAuthKey: 'dev',
  basicAuthSecret: 'test',
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins')(on, config); // eslint-disable-line global-require
    },
    baseUrl: 'http://localhost:5000',
    specPattern: 'cypress/e2e/**/*.spec.js',
  },
});

module.exports = cypressConfig;

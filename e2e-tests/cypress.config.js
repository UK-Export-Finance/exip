const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

dotenv.config();

const cypressConfig = defineConfig({
  projectId: 'sefntb',
  numTestsKeptInMemory: 1,
  basicAuthKey: 'dev',
  basicAuthSecret: 'test',
  chromeWebSecurity: false,
  e2e: {
    env: {
      GOV_NOTIFY_EMAIL_RECIPIENT: process.env.GOV_NOTIFY_EMAIL_RECIPIENT,
      MOCK_ACCOUNT_PASSWORD: process.env.MOCK_ACCOUNT_PASSWORD,
    },
    setupNodeEvents(on, config) {
      return require('./cypress/plugins')(on, config); // eslint-disable-line global-require
    },
    baseUrl: 'http://localhost:5000',
    apiUrl: 'http://localhost:3000/api/graphql',
    specPattern: 'cypress/e2e/**/*.spec.js',
  },
});

module.exports = cypressConfig;

const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');

dotenv.config();

/**
 * Cypress configuration
 */
const cypressConfig = defineConfig({
  projectId: 'sefntb',
  numTestsKeptInMemory: 1,
  viewportWidth: 1920,
  viewportHeight: 1080,
  basicAuthKey: 'dev',
  basicAuthSecret: 'test',
  chromeWebSecurity: false,
  retries: {
    runMode: 3,
    openMode: 0,
  },
  e2e: {
    pageLoadTimeout: 120000,
    responseTimeout: 120000,
    baseUrl: 'http://localhost:5000',
    apiUrl: 'http://localhost:5001/api/graphql',
    specPattern: 'cypress/e2e/**/*.spec.js',
    env: {
      GOV_NOTIFY_EMAIL_RECIPIENT_1: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_1,
      GOV_NOTIFY_EMAIL_RECIPIENT_2: process.env.GOV_NOTIFY_EMAIL_RECIPIENT_2,
      MOCK_ACCOUNT_PASSWORD: process.env.MOCK_ACCOUNT_PASSWORD,
    },
    setupNodeEvents(on) {
      // eslint-disable-next-line
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on('task', {
        lighthouse: lighthouse(),
      });
    },
  },
});

module.exports = cypressConfig;

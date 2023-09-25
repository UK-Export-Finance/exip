const { defineConfig } = require('cypress');
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const { pa11y } = require('@cypress-audit/pa11y');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Cypress configuration
 */
const cypressConfig = defineConfig({
  video: true,
  numTestsKeptInMemory: 1,
  viewportWidth: 1920,
  viewportHeight: 1080,
  basicAuthKey: 'dev',
  basicAuthSecret: 'test',
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
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
      API_KEY: process.env.API_KEY,
    },
    experimentalCspAllowList: ['child-src', 'frame-src', 'form-action', 'script-src', 'script-src-elem'],
    // eslint-disable-next-line
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on('task', {
        lighthouse: lighthouse(),
        pa11y: pa11y(),
      });
    },
  },
});

module.exports = cypressConfig;

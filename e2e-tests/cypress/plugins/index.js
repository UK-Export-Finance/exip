// ***********************************************************
// Load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const { lighthouse, pa11y, prepareAudit } = require('cypress-audit');

export default (on, config) => { // eslint-disable-line no-unused-vars
  // eslint-disable-next-line
  on('before:browser:launch', (browser = {}, launchOptions) => {
    prepareAudit(launchOptions);
  });

  on('task', {
    lighthouse: lighthouse(),
    pa11y: pa11y(),
  });
};

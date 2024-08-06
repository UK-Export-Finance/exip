// ***********************************************************
// Load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
module.exports = (on, config) => {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('@cypress/code-coverage/task')(on, config);
  return config;
};

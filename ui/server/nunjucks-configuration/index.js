const nunjucks = require('nunjucks');

const configureNunjucks = (opts) => {
  const appViews = [
    'node_modules/govuk-frontend',
    'templates',
  ];

  nunjucks.configure(appViews, opts);

  return nunjucks;
};

module.exports = configureNunjucks;

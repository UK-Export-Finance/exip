const accessibilityStatementPage = require('./accessibility-statement');
const cookiesPage = require('./cookies');
const pageNotFoundPage = require('./pageNotFound');
const quotePages = require('./quote');

module.exports = {
  accessibilityStatementPage,
  cookiesPage,
  pageNotFoundPage,
  quote: quotePages,
};

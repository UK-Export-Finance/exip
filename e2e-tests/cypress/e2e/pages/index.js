const cookiesPage = require('./cookies');
const pageNotFoundPage = require('./pageNotFound');
const quotePages = require('./quote');

module.exports = {
  cookiesPage,
  pageNotFoundPage,
  quote: quotePages,
};

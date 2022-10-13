const cookiesPage = require('./cookies');
const insurancePages = require('./insurance');
const pageNotFoundPage = require('./pageNotFound');
const quotePages = require('./quote');

module.exports = {
  cookiesPage,
  insurance: insurancePages,
  pageNotFoundPage,
  quote: quotePages,
};

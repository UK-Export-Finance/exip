const BUTTONS = require('./buttons');
const ERROR_MESSAGES = require('./error-messages');
const EXIT_PAGES = require('./exit-pages');
const FOOTER = require('./footer');
const FIELDS = require('./fields');
const LINKS = require('./links');
const PAGES = require('./pages');
const PRODUCT = require('./product');
const SUMMARY = require('./summary');

const ORGANISATION = 'UK Export Finance';

module.exports = {
  BUTTONS,
  ERROR_MESSAGES,
  EXIT_PAGES,
  FIELDS,
  FOOTER,
  LINKS,
  ORGANISATION,
  ...PAGES,
  PRODUCT,
  SUMMARY,
};

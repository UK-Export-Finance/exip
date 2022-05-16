const CONTENT_STRINGS = require('../../../../content-strings');
const CONSTANTS = require('../../../../constants');

const getIndex = (req, res) =>
  res.render('before-you-start.njk', {
    CONTENT_STRINGS: CONTENT_STRINGS.LANDING_PAGE,
    SUBMIT_URL: CONSTANTS.ROUTES.COMPANY_BASED,
  });

module.exports = getIndex;

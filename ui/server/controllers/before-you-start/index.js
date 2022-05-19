const CONTENT_STRINGS = require('../../content-strings');
const { ROUTES } = require('../../constants');

const getBeforeYouStart = (req, res) =>
  res.render('before-you-start.njk', {
    CONTENT_STRINGS: CONTENT_STRINGS.LANDING_PAGE,
    SUBMIT_URL: ROUTES.COMPANY_BASED,
  });

module.exports = getBeforeYouStart;

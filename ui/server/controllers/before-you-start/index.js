const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES, ROUTES } = require('../../constants');

const getBeforeYouStart = (req, res) =>
  res.render(TEMPLATES.BEFORE_YOU_START, {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      ...CONTENT_STRINGS.LANDING_PAGE,
    },
    SUBMIT_URL: ROUTES.COMPANY_BASED,
  });

module.exports = getBeforeYouStart;

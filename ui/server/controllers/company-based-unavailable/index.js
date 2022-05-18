const CONTENT_STRINGS = require('../../content-strings');
const CONSTANTS = require('../../constants');

const getCompanyBasedUnavailable = (req, res) =>
  res.render('company-based-unavailable.njk', {
    CONTENT_STRINGS: {
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.EXIT_PAGES.COMPANY_BASED,
    },
    BACK_LINK: CONSTANTS.ROUTES.COMPANY_BASED,
  });

module.exports = getCompanyBasedUnavailable;

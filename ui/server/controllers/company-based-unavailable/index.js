const CONTENT_STRINGS = require('../../content-strings');
const { ROUTES } = require('../../constants');

const getCompanyBasedUnavailable = (req, res) =>
  res.render('company-based-unavailable.njk', {
    CONTENT_STRINGS: {
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.EXIT_PAGES.COMPANY_BASED,
    },
    BACK_LINK: ROUTES.COMPANY_BASED,
  });

module.exports = getCompanyBasedUnavailable;

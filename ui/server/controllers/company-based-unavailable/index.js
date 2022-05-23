const CONTENT_STRINGS = require('../../content-strings');
const { ROUTES, TEMPLATES } = require('../../constants');

const getCompanyBasedUnavailable = (req, res) =>
  res.render(TEMPLATES.COMPANY_BASED_UNAVAILABLE, {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.EXIT_PAGES.COMPANY_BASED,
    },
    BACK_LINK: ROUTES.COMPANY_BASED,
  });

module.exports = getCompanyBasedUnavailable;

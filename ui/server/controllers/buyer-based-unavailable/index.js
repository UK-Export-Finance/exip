const CONTENT_STRINGS = require('../../content-strings');
const { ROUTES, TEMPLATES } = require('../../constants');

const getBuyerBasedUnavailable = (req, res) =>
  res.render(TEMPLATES.BUYER_BASED_UNAVAILABLE, {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.EXIT_PAGES.BUYER_BASED,
    },
    BACK_LINK: ROUTES.BUYER_BASED,
  });

module.exports = getBuyerBasedUnavailable;

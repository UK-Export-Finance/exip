const CONTENT_STRINGS = require('../../content-strings');
const { ROUTES } = require('../../constants');

const getBuyerBasedUnavailable = (req, res) =>
  res.render('buyer-based-unavailable.njk', {
    CONTENT_STRINGS: {
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.EXIT_PAGES.BUYER_BASED,
    },
    BACK_LINK: ROUTES.BUYER_BASED,
  });

module.exports = getBuyerBasedUnavailable;

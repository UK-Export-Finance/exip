const CONTENT_STRINGS = require('../../content-strings');
const CONSTANTS = require('../../constants');

const getBuyerBasedUnavailable = (req, res) =>
  res.render('buyer-based-unavailable.njk', {
    CONTENT_STRINGS: {
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.EXIT_PAGES.BUYER_BASED,
    },
    BACK_LINK: CONSTANTS.ROUTES.BUYER_BASED,
  });

module.exports = getBuyerBasedUnavailable;

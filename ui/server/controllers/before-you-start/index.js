const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES, ROUTES } = require('../../constants');

const PAGE_VARIABLES = {
  CONTENT_STRINGS: {
    PRODUCT: CONTENT_STRINGS.PRODUCT,
    FOOTER: CONTENT_STRINGS.FOOTER,
    LINKS: CONTENT_STRINGS.LINKS,
    ...CONTENT_STRINGS.PAGES.BEFORE_YOU_START,
  },
};

const get = (req, res) =>
  res.render(TEMPLATES.BEFORE_YOU_START, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
  });

const post = (req, res) => {
  // new submitted data session
  req.session.submittedData = {};

  return res.redirect(ROUTES.BUYER_COUNTRY);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

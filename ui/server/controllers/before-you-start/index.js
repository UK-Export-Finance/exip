const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES, ROUTES } = require('../../constants');

const PAGE_VARIABLES = {
  CONTENT_STRINGS: {
    PRODUCT: CONTENT_STRINGS.PRODUCT,
    FOOTER: CONTENT_STRINGS.FOOTER,
    ...CONTENT_STRINGS.LANDING_PAGE,
  },
};

const get = (req, res) =>
  res.render(TEMPLATES.BEFORE_YOU_START, {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      FOOTER: CONTENT_STRINGS.FOOTER,
      ...CONTENT_STRINGS.LANDING_PAGE,
    },
  });

const post = (req, res) => {
  // new submitted data session
  req.session.submittedData = {};

  return res.redirect(ROUTES.COMPANY_BASED);
};

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

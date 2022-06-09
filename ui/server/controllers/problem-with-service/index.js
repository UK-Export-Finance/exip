const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');

const get = (req, res) =>
  res.render(TEMPLATES.PROBLEM_WITH_SERVICE, {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      FOOTER: CONTENT_STRINGS.FOOTER,
      ...CONTENT_STRINGS.PAGES.PROBLEM_WITH_SERVICE_PAGE,
    },
  });

module.exports = get;

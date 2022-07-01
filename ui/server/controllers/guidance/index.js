const { TEMPLATES } = require('../../constants');
const CONTENT_STRINGS = require('../../content-strings');

const get = (req, res) =>
  res.render(TEMPLATES.GUIDANCE, {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      FOOTER: CONTENT_STRINGS.FOOTER,
    },
  });

module.exports = get;

const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');

const get = (req, res) => {
  const EXIT_REASON = req.flash('exitReason');
  const previousRoute = req.flash('previousRoute');

  return res.render(TEMPLATES.CANNOT_OBTAIN_COVER, {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      FOOTER: CONTENT_STRINGS.FOOTER,
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.PAGES.CANNOT_OBTAIN_COVER_PAGE,
    },
    BACK_LINK: previousRoute,
    EXIT_REASON,
  });
};

module.exports = get;

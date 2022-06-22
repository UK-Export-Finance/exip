const CONTENT_STRINGS = require('../../content-strings');
const { ROUTES, TEMPLATES } = require('../../constants');
const { mapAnswersToContent } = require('../../helpers/map-answers-to-content');
const { generateSummaryList } = require('../../helpers/generate-summary-list');

const PAGE_VARIABLES = {
  CONTENT_STRINGS: {
    PRODUCT: CONTENT_STRINGS.PRODUCT,
    FOOTER: CONTENT_STRINGS.FOOTER,
    LINKS: CONTENT_STRINGS.LINKS,
    BUTTONS: CONTENT_STRINGS.BUTTONS,
    ...CONTENT_STRINGS.PAGES.CHECK_YOUR_ANSWERS_PAGE,
  },
  BACK_LINK: ROUTES.TELL_US_ABOUT_YOUR_DEAL,
};

const get = (req, res) => {
  const answers = mapAnswersToContent(req.session.submittedData);
  const summaryList = generateSummaryList(answers);

  return res.render(TEMPLATES.CHECK_YOUR_ANSWERS, {
    ...PAGE_VARIABLES,
    SUMMARY_LIST: summaryList,
  });
};

const post = (req, res) => res.redirect(ROUTES.PREMIUM_QUOTE);

module.exports = {
  PAGE_VARIABLES,
  get,
  post,
};

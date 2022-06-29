const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');
const { mapAnswersToContent } = require('../../helpers/map-answers-to-content');
const { generateQuoteSummaryList } = require('../../helpers/generate-quote-summary-list');

const get = async (req, res) => {
  const { submittedData } = req.session;

  const answers = mapAnswersToContent(submittedData);

  return res.render(TEMPLATES.YOUR_QUOTE, {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      FOOTER: CONTENT_STRINGS.FOOTER,
      BUTTONS: CONTENT_STRINGS.BUTTONS,
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.PAGES.YOUR_QUOTE_PAGE,
    },
    SUMMARY_LIST: generateQuoteSummaryList(answers),
  });
};

module.exports = get;

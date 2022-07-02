const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');
const { generateQuote } = require('./generate-quote');
const { generateQuoteSummaryList } = require('../../helpers/generate-quote-summary-list');
const { mapQuoteToContent } = require('../../helpers/data-content-mappings/map-quote-to-content');

const get = (req, res) => {
  const { submittedData } = req.session;

  const quote = generateQuote(submittedData);

  req.session.quote = quote;

  const quoteContent = mapQuoteToContent(quote);

  return res.render(TEMPLATES.YOUR_QUOTE, {
    CONTENT_STRINGS: {
      PRODUCT: CONTENT_STRINGS.PRODUCT,
      FOOTER: CONTENT_STRINGS.FOOTER,
      BUTTONS: CONTENT_STRINGS.BUTTONS,
      LINKS: CONTENT_STRINGS.LINKS,
      ...CONTENT_STRINGS.PAGES.YOUR_QUOTE_PAGE,
    },
    SUMMARY_LIST: generateQuoteSummaryList(quoteContent),
  });
};

module.exports = get;

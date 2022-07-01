const CONTENT_STRINGS = require('../../content-strings');
const {
  TEMPLATES,
  FIELD_IDS,
} = require('../../constants');
const api = require('../../api');
const { generateQuote } = require('./generate-quote');
const { generateQuoteSummaryList } = require('../../helpers/generate-quote-summary-list');
const { mapQuoteToContent } = require('../../helpers/data-content-mappings/map-quote-to-content');

const get = async (req, res) => {
  const { submittedData } = req.session;
  const { isoCode } = submittedData.currency;

  let quote;

  if (isoCode !== 'GBP') {
    const currencyExchangeRate = await api.getCurrencyExchangeRate(
      submittedData.currency.isoCode,
      'GBP',
    );

    const { exchangeRate } = currencyExchangeRate;

    const amountInGbp = (submittedData[FIELD_IDS.AMOUNT] * exchangeRate);

    quote = generateQuote(submittedData, amountInGbp);
  } else {
    quote = generateQuote(submittedData);
  }

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

const { FIELD_IDS } = require('../../constants');
const mapCountry = require('./map-country');
const mapPolicyLength = require('./map-policy-length');
const formatCurrency = require('../format-currency');

const {
  BUYER_COUNTRY,
  AMOUNT,
  CURRENCY,
  QUOTE,
} = FIELD_IDS;

const {
  PREMIUM_RATE_PERCENTAGE,
  ESTIMATED_COST,
  BUYER_LOCATION,
} = QUOTE;

const mapQuoteToContent = (quote) => {
  const currencyCode = quote[CURRENCY].isoCode;

  const mapped = {
    [AMOUNT]: {
      text: formatCurrency(quote[AMOUNT], currencyCode),
    },
    [PREMIUM_RATE_PERCENTAGE]: {
      text: `${quote[PREMIUM_RATE_PERCENTAGE]}%`,
    },
    [ESTIMATED_COST]: {
      text: formatCurrency(quote[ESTIMATED_COST], currencyCode),
    },
    ...mapPolicyLength(quote),
    [BUYER_LOCATION]: {
      text: mapCountry(quote[BUYER_COUNTRY]),
    },
  };

  return mapped;
};

module.exports = mapQuoteToContent;

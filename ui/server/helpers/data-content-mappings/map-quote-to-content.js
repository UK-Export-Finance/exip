const { FIELD_IDS } = require('../../constants');
const mapCountry = require('./map-country');
const mapPolicyLength = require('./map-policy-length');
const formatCurrency = require('../format-currency');

const {
  BUYER_COUNTRY,
  CURRENCY,
  PERCENTAGE_OF_COVER,
  QUOTE,
} = FIELD_IDS;

const {
  BUYER_LOCATION,
  ESTIMATED_COST,
  INSURED_FOR,
  PREMIUM_RATE_PERCENTAGE,
} = QUOTE;

const mapQuoteToContent = (quote) => {
  const currencyCode = quote[CURRENCY].isoCode;

  const mapped = {
    [INSURED_FOR]: {
      text: formatCurrency(quote[INSURED_FOR], currencyCode),
    },
    [BUYER_LOCATION]: {
      text: mapCountry(quote[BUYER_COUNTRY]),
    },
    [ESTIMATED_COST]: {
      text: formatCurrency(quote[ESTIMATED_COST], currencyCode),
    },
    [PERCENTAGE_OF_COVER]: {
      text: `${quote[PERCENTAGE_OF_COVER]}%`,
    },
    [PREMIUM_RATE_PERCENTAGE]: {
      text: `${quote[PREMIUM_RATE_PERCENTAGE]}%`,
    },
    ...mapPolicyLength(quote),
  };

  return mapped;
};

module.exports = mapQuoteToContent;

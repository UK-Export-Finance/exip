const { FIELD_IDS } = require('../constants');
const {
  mapPolicyLength,
  mapCountry,
} = require('./map-answers-to-content');
const formatCurrency = require('./format-currency');

// TODO: extract above mapping functions

const {
  BUYER_COUNTRY,
  QUOTE,
} = FIELD_IDS;

const {
  INSURED_FOR,
  PREMIUM_RATE_PERCENTAGE,
  ESTIMATED_COST,
  BUYER_LOCATION,
} = QUOTE;

const mapInsuredFor = (field) => {
  const { convertedFrom } = field;

  const mapped = {
    text: formatCurrency(field.amount, convertedFrom.isoCode),
  };

  if (field.convertedFrom.isoCode !== 'GBP') {
    const countryString = `${convertedFrom.name} (${convertedFrom.isoCode})`;

    mapped.additionalText = `converted from ${countryString}`;
  }

  return mapped;
};

const mapQuoteToContent = (quote) => {
  const mapped = {
    [INSURED_FOR]: mapInsuredFor(quote[INSURED_FOR]),
    [PREMIUM_RATE_PERCENTAGE]: {
      text: `${quote[PREMIUM_RATE_PERCENTAGE]}%`,
    },
    [ESTIMATED_COST]: {
      text: formatCurrency(quote[ESTIMATED_COST], 'GBP'),
    },
    ...mapPolicyLength(quote),
    [BUYER_LOCATION]: {
      text: mapCountry(quote[BUYER_COUNTRY]),
    },
  };
  return mapped;
};

module.exports = {
  mapInsuredFor,
  mapQuoteToContent,
};

const { FIELD_IDS } = require('../constants');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CURRENCY,
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

/**
 * mockCalculation
 * Mock calculations for user testing scenarios
 */
const mockCalculation = (submittedCountryCode) => {
  if (submittedCountryCode === 'DZA') {
    // Algeria

    return {
      [QUOTE.PREMIUM_RATE_PERCENTAGE]: 1.88,
      [QUOTE.ESTIMATED_COST]: 1128,
    };
  }

  if (submittedCountryCode === 'BHR') {
    // Bahrain

    return {
      [QUOTE.PREMIUM_RATE_PERCENTAGE]: 2.38,
      [QUOTE.ESTIMATED_COST]: 1428,
    };
  }

  return {
    [QUOTE.PREMIUM_RATE_PERCENTAGE]: 1.5,
    [QUOTE.ESTIMATED_COST]: 1000,
  };
};

const generateQuote = (submittedData) => {
  const quote = {
    [AMOUNT]: submittedData[AMOUNT],
    [CURRENCY]: submittedData[CURRENCY],
    ...mockCalculation(submittedData[BUYER_COUNTRY].isoCode),
    [QUOTE.BUYER_LOCATION]: submittedData[BUYER_COUNTRY],
    [POLICY_TYPE]: submittedData[POLICY_TYPE],
    [POLICY_LENGTH]: submittedData[POLICY_LENGTH],
  };

  return quote;
};

module.exports = {
  mockCalculation,
  generateQuote,
};

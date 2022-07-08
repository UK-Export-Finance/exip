const { FIELD_IDS } = require('../constants');
const { getPremiumRate } = require('./get-premium-rate');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CURRENCY,
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

/**
 * calculateCost
 * Generate estimated cost
 */
const calculateCost = (
  premiumRate,
  amount,
  percentageOfCover,
) => {
  const result = 1000;

  return result;
};

const generateQuote = (submittedData) => {
  const mockPercentageOfCover = 90;

  const mapped = {
    [AMOUNT]: submittedData[AMOUNT],
    [CURRENCY]: submittedData[CURRENCY],
    [QUOTE.BUYER_LOCATION]: submittedData[BUYER_COUNTRY],
    [POLICY_TYPE]: submittedData[POLICY_TYPE],
    [POLICY_LENGTH]: submittedData[POLICY_LENGTH],
  };

  const premiumRate = getPremiumRate(
    mapped[POLICY_TYPE],
    mapped[BUYER_COUNTRY].riskCategory,
    mapped[POLICY_LENGTH],
    mockPercentageOfCover,
  );

  const quote = {
    ...mapped,
    [QUOTE.PREMIUM_RATE_PERCENTAGE]: premiumRate,
    [QUOTE.ESTIMATED_COST]: calculateCost(
      premiumRate,
      mapped[AMOUNT],
      mockPercentageOfCover,
    ),
  };

  return quote;
};

module.exports = {
  calculateCost,
  generateQuote,
};

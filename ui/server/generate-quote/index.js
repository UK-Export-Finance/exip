const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../constants');
const { getPremiumRate } = require('./get-premium-rate');
const { getPercentageOfNumber } = require('../helpers/number');

const {
  AMOUNT,
  BUYER_COUNTRY,
  CREDIT_PERIOD,
  CURRENCY,
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

/**
 * getTotalMonths
 * Business requirement:
 * The premium rate (obtained via the grid) should select a month that is the total of:
 * - policy length
 * - and additional months for business buffer
 * If the policy type is multi, credit period is also included.
 * @param {String} Policy type
 * @param {Number} Policy length
 * @param {Number} Credit period
 * @returns {Number} Total months for the premium rate
 */
const getTotalMonths = (policyType, policyLength, creditPeriod) => {
  const BUSINESS_BUFFER_MONTHS = 1;

  if (policyType === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    const totalMonths = (policyLength + BUSINESS_BUFFER_MONTHS);

    return totalMonths;
  }

  if (policyType === FIELD_VALUES.POLICY_TYPE.MULTI) {
    const totalMonths = (policyLength + creditPeriod + BUSINESS_BUFFER_MONTHS);

    return totalMonths;
  }

  return 0;
};

/**
 * calculateCost
 * Generate estimated cost
 * This is x% of the total amount of insurance.
 * @param {Number} Premium rate percentage
 * @param {Number} Total amount of the export
 * @returns {Number} Total months for the premium rate
 */
const calculateCost = (
  premiumRate,
  amount,
) => {
  const result = getPercentageOfNumber(premiumRate, amount);

  return result;
};

/**
 * generateQuote
 * @param {Object} Submitted data/answer
 * @returns {Object} Quote with premium rate and estimated cost
 */
const generateQuote = (submittedData) => {
  const mockPercentageOfCover = 90;

  const mapped = {
    [AMOUNT]: submittedData[AMOUNT],
    [CURRENCY]: submittedData[CURRENCY],
    [CREDIT_PERIOD]: submittedData[CREDIT_PERIOD],
    [QUOTE.BUYER_LOCATION]: submittedData[BUYER_COUNTRY],
    [POLICY_TYPE]: submittedData[POLICY_TYPE],
    [POLICY_LENGTH]: submittedData[POLICY_LENGTH],
  };

  const totalMonths = getTotalMonths(
    mapped[POLICY_TYPE],
    mapped[POLICY_LENGTH],
    mapped[CREDIT_PERIOD],
  );

  const premiumRate = getPremiumRate(
    mapped[POLICY_TYPE],
    // mapped[BUYER_COUNTRY].riskCategory,
    3,
    totalMonths,
    mockPercentageOfCover,
  );

  const quote = {
    ...mapped,
    [QUOTE.PREMIUM_RATE_PERCENTAGE]: premiumRate,
    [QUOTE.ESTIMATED_COST]: calculateCost(
      premiumRate,
      mapped[AMOUNT],
    ),
  };

  return quote;
};

module.exports = {
  getTotalMonths,
  calculateCost,
  generateQuote,
};

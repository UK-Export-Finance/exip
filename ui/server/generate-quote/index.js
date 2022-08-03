const { FIELD_IDS } = require('../constants');
const { isSinglePolicyType, isMultiPolicyType } = require('../helpers/policy-type');
const { getPremiumRate } = require('./get-premium-rate');
const { getPercentageOfNumber } = require('../helpers/number');

const {
  BUYER_COUNTRY,
  CONTRACT_VALUE,
  CREDIT_PERIOD,
  CURRENCY,
  MAX_AMOUNT_OWED,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  POLICY_LENGTH,
  QUOTE,
} = FIELD_IDS;

/**
 * getContractCost
 * @param {Object} Submitted data/answers
 * @returns {Number} Contract value or max amount owed, depending on policy type
 */
const getContractCost = (submittedData) => {
  if (isSinglePolicyType(submittedData[POLICY_TYPE])) {
    return submittedData[CONTRACT_VALUE];
  }

  if (isMultiPolicyType(submittedData[POLICY_TYPE])) {
    return submittedData[MAX_AMOUNT_OWED];
  }

  return 0;
};

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
const getTotalMonths = (policyType, policyLength, creditPeriod = 0) => {
  const BUSINESS_BUFFER_MONTHS = 1;

  if (isSinglePolicyType(policyType)) {
    const totalMonths = (policyLength + BUSINESS_BUFFER_MONTHS);

    return totalMonths;
  }

  if (isMultiPolicyType(policyType)) {
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

  return Number(result);
};

/**
 * generateQuote
 * @param {Object} Submitted data/answers
 * @returns {Object} Quote with premium rate and estimated cost
 */
const generateQuote = (submittedData) => {
  const mapped = {
    [QUOTE.INSURED_FOR]: getContractCost(submittedData),
    [QUOTE.BUYER_LOCATION]: submittedData[BUYER_COUNTRY],
    [CURRENCY]: submittedData[CURRENCY],
    [CREDIT_PERIOD]: submittedData[CREDIT_PERIOD],
    [PERCENTAGE_OF_COVER]: submittedData[PERCENTAGE_OF_COVER],
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
    mapped[BUYER_COUNTRY].riskCategory,
    totalMonths,
    mapped[PERCENTAGE_OF_COVER],
  );

  const quote = {
    ...mapped,
    [QUOTE.PREMIUM_RATE_PERCENTAGE]: premiumRate,
    [QUOTE.ESTIMATED_COST]: calculateCost(premiumRate, mapped[QUOTE.INSURED_FOR]),
  };

  return quote;
};

module.exports = {
  getContractCost,
  getTotalMonths,
  calculateCost,
  generateQuote,
};

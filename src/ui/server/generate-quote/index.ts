import { FIELD_IDS } from '../constants';
import { isSinglePolicyType, isMultiPolicyType } from '../helpers/policy-type';
import { getPremiumRate } from './get-premium-rate';
import { getPercentageOfNumber } from '../helpers/number';
import { Quote, SubmittedData } from '../../types';

const { BUYER_COUNTRY, CONTRACT_VALUE, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER, POLICY_TYPE, POLICY_LENGTH } = FIELD_IDS;

/**
 * getContractValue
 * @param {Object} Submitted data/answers
 * @returns {Number} Contract value or max amount owed, depending on policy type
 */
const getContractValue = (submittedData: SubmittedData) => {
  if (isSinglePolicyType(submittedData[POLICY_TYPE])) {
    return {
      [CONTRACT_VALUE]: submittedData[CONTRACT_VALUE],
    };
  }

  if (isMultiPolicyType(submittedData[POLICY_TYPE])) {
    return {
      [MAX_AMOUNT_OWED]: submittedData[MAX_AMOUNT_OWED],
    };
  }

  return 0;
};

/**
 * getInsuredFor
 * @param {Object} Submitted data/answers
 * @returns {Number} Percentage of cover % of Contract value or max amount owed
 */
const getInsuredFor = (submittedData: SubmittedData): number => {
  let contractValue;

  if (isSinglePolicyType(submittedData[POLICY_TYPE])) {
    contractValue = submittedData[CONTRACT_VALUE];
  }

  if (isMultiPolicyType(submittedData[POLICY_TYPE])) {
    contractValue = submittedData[MAX_AMOUNT_OWED];
  }

  return Number(getPercentageOfNumber(submittedData[PERCENTAGE_OF_COVER], contractValue));
};

/**
 * getTotalMonths
 * Business requirement:
 * The premium rate (obtained via the grid) should select a month that is the total of:
 * - If policy type is single:
 *   - policy length
 *   - an additional month for business buffer
 * - If the policy type is multi:
 *   - credit period
 *   - an additional month for business buffer
 *   - Note: the policy length is not used for a multi policy
 *     - the multi policy length default is 12 months. The grid only goes up to 3 months.
 * @param {String} Policy type
 * @param {Number} Policy length
 * @param {Number} Credit period
 * @returns {Number} Total months for the premium rate
 */
const getTotalMonths = (policyType: string, policyLength: number, creditPeriod = 0) => {
  const BUSINESS_BUFFER_MONTHS = 1;

  if (isSinglePolicyType(policyType)) {
    const totalMonths = policyLength + BUSINESS_BUFFER_MONTHS;

    return totalMonths;
  }

  if (isMultiPolicyType(policyType)) {
    const totalMonths = creditPeriod + BUSINESS_BUFFER_MONTHS;

    return totalMonths;
  }

  return 0;
};

/**
 * calculateEstimatedCost
 * @param {Number} Premium rate percentage
 * @param {Number} Contract value/Maximum amount owed
 * @returns {Number} Premium rate percentage of the contract value/maximum amount owed
 */
const calculateEstimatedCost = (premiumRate: number, contractValue: number) => Number(getPercentageOfNumber(premiumRate, contractValue));

/**
 * generateQuote
 * @param {Object} Submitted data/answers
 * @returns {Object} Quote with premium rate and estimated cost
 */
const generateQuote = (submittedData: SubmittedData): Quote => {
  const contractValue = getContractValue(submittedData);

  const mapped = {
    ...contractValue,
    percentageOfCover: submittedData[PERCENTAGE_OF_COVER],
    insuredFor: getInsuredFor(submittedData),
    buyerCountry: submittedData[BUYER_COUNTRY],
    currency: submittedData[CURRENCY],
    creditPeriodInMonths: submittedData[CREDIT_PERIOD],
    policyType: submittedData[POLICY_TYPE],
    policyLength: submittedData[POLICY_LENGTH],
  };

  const totalMonths = getTotalMonths(mapped[POLICY_TYPE], mapped[POLICY_LENGTH], mapped[CREDIT_PERIOD]);

  const premiumRate = getPremiumRate(mapped[POLICY_TYPE], mapped[BUYER_COUNTRY].riskCategory, totalMonths, mapped[PERCENTAGE_OF_COVER]);

  const contractValueAmount = Object.values(contractValue)[0];

  const quote = {
    ...mapped,
    premiumRatePercentage: premiumRate,
    estimatedCost: calculateEstimatedCost(premiumRate, contractValueAmount),
  };

  return quote;
};

export { getContractValue, getInsuredFor, getTotalMonths, calculateEstimatedCost, generateQuote };

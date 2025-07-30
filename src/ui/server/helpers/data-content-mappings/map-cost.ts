import { FIELD_IDS } from '../../constants';
import { isSinglePolicyType, isMultiplePolicyType } from '../policy-type';
import formatCurrency from '../format-currency';
import { SubmittedDataQuoteEligibility } from '../../../types';

const {
  ELIGIBILITY: { CONTRACT_VALUE, CURRENCY, MAX_AMOUNT_OWED },
  POLICY_TYPE,
} = FIELD_IDS;
/**
 * mapCost
 * Map cost answer into an object for GOV summary list structure
 * @param {object} All submitted data
 * @returns {object} Answer in an object
 */
const mapCost = (answers: SubmittedDataQuoteEligibility) => {
  let mapped;

  const currency = String(answers[CURRENCY]?.isoCode);

  if (isSinglePolicyType(answers[POLICY_TYPE])) {
    mapped = {
      [CONTRACT_VALUE]: formatCurrency(Number(answers[CONTRACT_VALUE]), currency, 0),
    };
  }

  if (isMultiplePolicyType(answers[POLICY_TYPE])) {
    mapped = {
      [MAX_AMOUNT_OWED]: formatCurrency(Number(answers[MAX_AMOUNT_OWED]), currency, 0),
    };
  }

  return mapped;
};

export default mapCost;

import { FIELD_IDS } from '../../constants';
import { isSinglePolicyType, isMultiplePolicyType } from '../policy-type';
import formatCurrency from '../format-currency';
import { SubmittedDataQuoteEligibility, SubmittedDataInsuranceEligibility } from '../../../types';

const {
  ELIGIBILITY: { CONTRACT_VALUE, CURRENCY, MAX_AMOUNT_OWED },
  POLICY_TYPE,
} = FIELD_IDS;
/**
 * mapCost
 * Map cost answer into an object for GOV summary list structure
 * @param {Object} All submitted data
 * @returns {Object} Answer in an object
 */
const mapCost = (answers: SubmittedDataQuoteEligibility | SubmittedDataInsuranceEligibility) => {
  let mapped;

  if (isSinglePolicyType(answers[POLICY_TYPE])) {
    mapped = {
      [CONTRACT_VALUE]: formatCurrency(answers[CONTRACT_VALUE], answers[CURRENCY].isoCode, 0),
    };
  }

  if (isMultiplePolicyType(answers[POLICY_TYPE])) {
    mapped = {
      [MAX_AMOUNT_OWED]: formatCurrency(answers[MAX_AMOUNT_OWED], answers[CURRENCY].isoCode, 0),
    };
  }

  return mapped;
};

export default mapCost;

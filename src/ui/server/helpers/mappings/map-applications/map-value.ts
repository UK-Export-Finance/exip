import { FIELD_IDS, GBP_CURRENCY_CODE } from '../../../constants';
import { DEFAULT } from '../../../content-strings';
import { isSinglePolicyType, isMultiplePolicyType } from '../../policy-type';
import formatCurrency from '../../format-currency';
import { objectHasProperty } from '../../object';
import { Application } from '../../../../types';

const {
  POLICY: {
    POLICY_TYPE,
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = FIELD_IDS.INSURANCE;

/**
 * mapValue
 * Map an application's "insurance value" depending on the policy type, for display in the dashboard
 * @param {Application}
 * @returns {String} Formatted insured amount or empty dash
 */
const mapValue = (application: Application) => {
  if (application.policy) {
    const { policy } = application;

    const policyType = policy[POLICY_TYPE];

    if (isSinglePolicyType(policyType) && objectHasProperty(policy, TOTAL_CONTRACT_VALUE)) {
      return formatCurrency(policy[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE);
    }

    if (isMultiplePolicyType(policyType) && objectHasProperty(policy, MAXIMUM_BUYER_WILL_OWE)) {
      return formatCurrency(policy[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE);
    }
  }

  return DEFAULT.EMPTY;
};

export default mapValue;

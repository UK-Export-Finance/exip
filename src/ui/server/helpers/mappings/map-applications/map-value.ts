import { GBP_CURRENCY_CODE } from '../../../constants';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { DEFAULT } from '../../../content-strings';
import { isSinglePolicyType, isMultiplePolicyType } from '../../policy-type';
import formatCurrency from '../../format-currency';
import { objectHasProperty } from '../../object';
import { Application } from '../../../../types';

const {
  POLICY: {
    POLICY_TYPE,
    CONTRACT_POLICY: {
      POLICY_CURRENCY_CODE,
      SINGLE: { TOTAL_CONTRACT_VALUE },
    },
    EXPORT_VALUE: {
      MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = INSURANCE_FIELD_IDS;

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

    const currencyCode = application.policy[POLICY_CURRENCY_CODE] || GBP_CURRENCY_CODE;

    if (isSinglePolicyType(policyType) && objectHasProperty(policy, TOTAL_CONTRACT_VALUE)) {
      return formatCurrency(policy[TOTAL_CONTRACT_VALUE], currencyCode);
    }

    if (isMultiplePolicyType(policyType) && objectHasProperty(policy, MAXIMUM_BUYER_WILL_OWE)) {
      return formatCurrency(policy[MAXIMUM_BUYER_WILL_OWE], currencyCode);
    }
  }

  return DEFAULT.EMPTY;
};

export default mapValue;

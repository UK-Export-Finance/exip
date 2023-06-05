import { FIELD_IDS, GBP_CURRENCY_CODE } from '../../../constants';
import { DEFAULT } from '../../../content-strings';
import { isSinglePolicyType, isMultiPolicyType } from '../../policy-type';
import formatCurrency from '../../format-currency';
import { objectHasProperty } from '../../object';
import { Application } from '../../../../types';

const {
  POLICY_AND_EXPORTS: {
    POLICY_TYPE,
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = FIELD_IDS.INSURANCE;

/**
 * mapInsuredFor
 * Map an application's "insured for" depending on the policy type, for display in the dashboard
 * @param {Object} Application
 * @returns {String} Formatted insured amount or empty dash
 */
const mapInsuredFor = (application: Application) => {
  const { policyAndExport } = application;

  const policyType = policyAndExport[POLICY_TYPE];

  if (isSinglePolicyType(policyType) && objectHasProperty(policyAndExport, TOTAL_CONTRACT_VALUE)) {
    return formatCurrency(policyAndExport[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE);
  }

  if (isMultiPolicyType(policyType) && objectHasProperty(policyAndExport, MAXIMUM_BUYER_WILL_OWE)) {
    return formatCurrency(policyAndExport[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE);
  }

  return DEFAULT.EMPTY;
};

export default mapInsuredFor;

import { ROUTES } from '../../../../constants';
import { isSinglePolicyType, isMultiPolicyType } from '../../../policy-type';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { SINGLE_CONTRACT_POLICY_CHANGE, MULTIPLE_CONTRACT_POLICY_CHANGE },
  },
} = ROUTES;

/**
 * changeLink
 * Change link object depending on the policy type
 * @param {String} Policy type
 * @param {Number} Application reference number
 * @param {String} Field ID
 * @returns {Object} Link object
 */
const changeLink = (policyType: string, referenceNumber: number, fieldId: string) => {
  const rootUrl = `${INSURANCE_ROOT}/${referenceNumber}`;

  if (isSinglePolicyType(policyType)) {
    return {
      renderChangeLink: true,
      href: `${rootUrl}${SINGLE_CONTRACT_POLICY_CHANGE}#${fieldId}-label`,
    };
  }

  if (isMultiPolicyType(policyType)) {
    return {
      renderChangeLink: true,
      href: `${rootUrl}${MULTIPLE_CONTRACT_POLICY_CHANGE}#${fieldId}-label`,
    };
  }

  return {
    renderChangeLink: false,
  };
};

export default changeLink;

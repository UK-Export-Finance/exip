import { ROUTES } from '../../../../constants';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../policy-type';
import generateChangeLink from '../../../generate-change-link';

const {
  INSURANCE: {
    POLICY: {
      SINGLE_CONTRACT_POLICY_CHANGE,
      SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
      MULTIPLE_CONTRACT_POLICY_CHANGE,
      MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
    },
  },
} = ROUTES;

/**
 * changeLink
 * Change link object depending on the policy type
 * @param {string} policyType: Policy type
 * @param {number} referenceNumber: Application reference number
 * @param {string} fieldId: Field ID
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {object} Link object
 */
const changeLink = (policyType: string, referenceNumber: number, fieldId: string, checkAndChange?: boolean) => {
  if (isSinglePolicyType(policyType)) {
    return {
      renderChangeLink: true,
      href: generateChangeLink(SINGLE_CONTRACT_POLICY_CHANGE, SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE, `#${fieldId}-label`, referenceNumber, checkAndChange),
    };
  }

  if (isMultiplePolicyType(policyType)) {
    return {
      renderChangeLink: true,
      href: generateChangeLink(
        MULTIPLE_CONTRACT_POLICY_CHANGE,
        MULTIPLE_CONTRACT_POLICY_CHECK_AND_CHANGE,
        `#${fieldId}-label`,
        referenceNumber,
        checkAndChange,
      ),
    };
  }

  return {
    renderChangeLink: false,
  };
};

export default changeLink;

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
 * @param {String} policyType: Policy type
 * @param {Number} referenceNumber: Application reference number
 * @param {String} fieldId: Field ID
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} Link object
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

import { EMAIL_TEMPLATE_IDS } from '../../../constants';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';
import multiplePolicyTypeTemplateId from './multiple-policy-type';
import { ApplicationPolicy } from '../../../types';

const {
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: { CONFIRMATION },
    },
  },
  UNABLE_TO_DETERMINE_TEMPLATE_ID,
} = EMAIL_TEMPLATE_IDS;

/**
 * getSubmittedConfirmationTemplateId
 * Get an email template ID for the "application submitted" email, depending on:
 * - The application's policy type.
 * - If the "maximum buyer will owe" (in GBP) is below a threshold.
 * @param {ApplicationPolicy} policy: Application policy
 * @returns {Promise<string>} "Application submitted" template ID
 */
const getSubmittedConfirmationTemplateId = async (policy: ApplicationPolicy): Promise<string> => {
  try {
    console.info('Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper)');

    const { maximumBuyerWillOwe, policyCurrencyCode, policyType } = policy;

    if (isSinglePolicyType(policyType)) {
      return CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;
    }

    if (isMultiplePolicyType(policyType) && maximumBuyerWillOwe) {
      return await multiplePolicyTypeTemplateId.get(policyType, String(policyCurrencyCode), maximumBuyerWillOwe);
    }

    return UNABLE_TO_DETERMINE_TEMPLATE_ID;
  } catch (error) {
    console.error('Error Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper) %o', error);

    throw new Error(`Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper) ${error}`);
  }
};

export default getSubmittedConfirmationTemplateId;

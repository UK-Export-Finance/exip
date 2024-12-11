import { EMAIL_TEMPLATE_IDS } from '../../../constants';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';

/**
 * getSubmittedConfirmationTemplateId.submittedEmail
 * Get an email template ID for the "application submitted" email,
 * depending on the application's policy type
 * @param {String} policyType: Application "Policy type"
 * @returns {String} callNotify response
 */
const getSubmittedConfirmationTemplateId = (policyType: string): string => {
  if (isSinglePolicyType(policyType)) {
    return EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.SINGLE_CONTRACT_POLICY_CONFIRMATION;
  }

  if (isMultiplePolicyType(policyType)) {
    return EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.MULTIPLE_CONTRACT_POLICY_CONFIRMATION;
  }

  return '';
};

export default getSubmittedConfirmationTemplateId;

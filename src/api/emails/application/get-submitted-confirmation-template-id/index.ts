import { APPLICATION, EMAIL_TEMPLATE_IDS } from '../../../constants';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';
import { ApplicationPolicy } from '../../../types';

const {
  LATEST_VERSION: { SMALL_EXPORT_BUILDER },
} = APPLICATION;

const {
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: { CONFIRMATION },
    },
  },
} = EMAIL_TEMPLATE_IDS;

/**
 * getSubmittedConfirmationTemplateId.submittedEmail
 * Get an email template ID for the "application submitted" email, depending on:
 * - The application's policy type.
 * - If the "maximum buyer will owe" is below a threshold.
 * @param {ApplicationPolicy} policy: Application policy
 * @returns {String} callNotify response
 */
const getSubmittedConfirmationTemplateId = (policy: ApplicationPolicy): string => {
  const { policyType, maximumBuyerWillOwe } = policy;

  if (isSinglePolicyType(policyType)) {
    return CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;
  }

  if (isMultiplePolicyType(policyType) && maximumBuyerWillOwe) {
    const threshold = Number(SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE);

    const eligibileForSmallExportBuilder = maximumBuyerWillOwe <= threshold;

    if (eligibileForSmallExportBuilder) {
      return CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;
    }

    return CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;
  }

  return '';
};

export default getSubmittedConfirmationTemplateId;

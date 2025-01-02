import { APPLICATION, EMAIL_TEMPLATE_IDS, GBP } from '../../../constants';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';
import apimCurrencyExchangeRate from '../../../helpers/get-APIM-currencies-exchange-rate';
import roundNumber from '../../../helpers/round-number';
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
 * getSubmittedConfirmationTemplateId
 * Get an email template ID for the "application submitted" email, depending on:
 * - The application's policy type.
 * - If the "maximum buyer will owe" (in GBP) is below a threshold.
 * @param {ApplicationPolicy} policy: Application policy
 * @returns {Promise<String>} "application submitted" template ID
 */
const getSubmittedConfirmationTemplateId = async (policy: ApplicationPolicy): Promise<string> => {
  try {
    console.info('Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper)');

    const { maximumBuyerWillOwe, policyCurrencyCode, policyType } = policy;

    if (isSinglePolicyType(policyType)) {
      return CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;
    }

    if (isMultiplePolicyType(policyType) && maximumBuyerWillOwe) {
      let maximumBuyerWillOweInGbp = maximumBuyerWillOwe;

      if (policyCurrencyCode !== GBP) {
        const source = GBP;
        const target = String(policyCurrencyCode);

        const exchangeRate = await apimCurrencyExchangeRate.get(source, target);

        maximumBuyerWillOweInGbp = roundNumber(maximumBuyerWillOwe * exchangeRate);
      }

      const threshold = Number(SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE);

      const eligibileForSmallExportBuilder = maximumBuyerWillOweInGbp <= threshold;

      if (eligibileForSmallExportBuilder) {
        return CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;
      }

      return CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;
    }

    return '';
  } catch (error) {
    console.error('Error Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper) %o', error);

    throw new Error(`Getting submitted confirmation template ID (getSubmittedConfirmationTemplateId helper) ${error}`);
  }
};

export default getSubmittedConfirmationTemplateId;

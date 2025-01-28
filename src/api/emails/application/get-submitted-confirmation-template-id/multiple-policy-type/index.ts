import { EMAIL_TEMPLATE_IDS } from '../../../../constants';
import { isMultiplePolicyType } from '../../../../helpers/policy-type';

const {
  APPLICATION: {
    SUBMISSION: {
      EXPORTER: { CONFIRMATION },
    },
  },
  UNABLE_TO_DETERMINE_TEMPLATE_ID,
} = EMAIL_TEMPLATE_IDS;

/**
 * get
 * Get an email template ID for the "application submitted" email, for a multiple policy type.
 * @param {String} policyType: Policy type
 * @returns {Promise<String>} "Application submitted" template ID
 */
const get = (policyType: string) => {
  try {
    console.info('Getting submitted confirmation template ID for a multiple policy type (multiplePolicyTypeTemplateId helper)');

    if (isMultiplePolicyType(policyType)) {
      // TODO: EMS-4122
      /*
      let maximumBuyerWillOweInGbp = maximumBuyerWillOwe;

      if (policyCurrencyCode !== GBP) {
        const source = GBP;
        const target = String(policyCurrencyCode);

        const exchangeRate = await apimCurrencyExchangeRate.get(source, target);

        maximumBuyerWillOweInGbp = roundNumber(maximumBuyerWillOwe / exchangeRate);
      }

      const threshold = Number(SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE);

      const eligibileForSmallExportBuilder = maximumBuyerWillOweInGbp <= threshold;

      if (eligibileForSmallExportBuilder) {
        return CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;
      }
      */

      return CONFIRMATION.SINGLE_OR_MULTIPLE_CONTRACT_POLICY;
    }

    return UNABLE_TO_DETERMINE_TEMPLATE_ID;
  } catch (error) {
    console.error('Error Getting submitted confirmation template ID for a multiple policy type (multiplePolicyTypeTemplateId helper) %o', error);

    throw new Error(`Getting submitted confirmation template ID for a multiple policy type (multiplePolicyTypeTemplateId helper) ${error}`);
  }
};

const multiplePolicyTypeTemplateId = {
  get,
};

export default multiplePolicyTypeTemplateId;

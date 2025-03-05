import { APPLICATION, EMAIL_TEMPLATE_IDS, GBP } from '../../../../constants';
import { isMultiplePolicyType } from '../../../../helpers/policy-type';
import apimCurrencyExchangeRate from '../../../../helpers/get-APIM-currencies-exchange-rate';
import roundNumber from '../../../../helpers/round-number';

const {
  LATEST_VERSION: { SMALL_EXPORT_BUILDER },
} = APPLICATION;

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
 * @param {String} policyCurrencyCode: Policy currency code
 * @param {Number} maximumBuyerWillOwe: Maximum buyer will owe
 * @returns {Promise<String>} "Application submitted" template ID
 */
const get = async (policyType: string, policyCurrencyCode: string, maximumBuyerWillOwe: number) => {
  try {
    console.info('Getting submitted confirmation template ID for a multiple policy type (multiplePolicyTypeTemplateId helper)');

    if (isMultiplePolicyType(policyType)) {
      let maximumBuyerWillOweInGbp = maximumBuyerWillOwe;

      if (policyCurrencyCode !== GBP) {
        const source = GBP;
        const target = String(policyCurrencyCode);

        const exchangeRate = await apimCurrencyExchangeRate.get(source, target);

        maximumBuyerWillOweInGbp = roundNumber(maximumBuyerWillOwe / exchangeRate);
      }

      const threshold = Number(SMALL_EXPORT_BUILDER?.MAXIMUM_BUYER_WILL_OWE);

      const eligibleForSmallExportBuilder = maximumBuyerWillOweInGbp <= threshold;

      if (eligibleForSmallExportBuilder) {
        return CONFIRMATION.MULTIPLE_CONTRACT_POLICY.ELIGIBLE_FOR_SMALL_EXPORT_BUILDER_CONFIRMATION;
      }

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

import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import application from '../../fixtures/application';

const {
  POLICY: {
    CONTRACT_POLICY: {
      POLICY_CURRENCY_CODE,
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitMultipleContractPolicyForm
 * Complete and submit the "multiple contract policy" form
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrency: Select the "alternative currency" option
 */
const completeAndSubmitMultipleContractPolicyForm = ({
  isoCode = application.POLICY[POLICY_CURRENCY_CODE],
  alternativeCurrency = false,
}) => {
  cy.completeMultipleContractPolicyForm({
    isoCode,
    alternativeCurrency,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitMultipleContractPolicyForm;

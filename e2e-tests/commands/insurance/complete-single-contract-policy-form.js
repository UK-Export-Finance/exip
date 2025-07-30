import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { radios } from '../../pages/shared';
import application from '../../fixtures/application';
import { NON_STANDARD_CURRENCY_CODE } from '../../fixtures/currencies';

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
} = INSURANCE_FIELD_IDS;

const { POLICY } = application;

/**
 * completeSingleContractPolicyForm
 * Complete the "single contract policy" form.
 * @param {string} isoCode: Policy currency ISO code
 * @param {boolean} alternativeCurrency: Select the "alternative currency" option
 * @param {boolean} chooseCurrency: Whether to choose a currency or not
 */
const completeSingleContractPolicyForm = ({ isoCode = application.POLICY[POLICY_CURRENCY_CODE], alternativeCurrency = false, chooseCurrency = true }) => {
  cy.completeDateFormFields({
    idPrefix: REQUESTED_START_DATE,
    day: POLICY[REQUESTED_START_DATE].day,
    month: POLICY[REQUESTED_START_DATE].month,
    year: POLICY[REQUESTED_START_DATE].year,
  });

  cy.completeDateFormFields({
    idPrefix: CONTRACT_COMPLETION_DATE,
    day: POLICY[CONTRACT_COMPLETION_DATE].day,
    month: POLICY[CONTRACT_COMPLETION_DATE].month,
    year: POLICY[CONTRACT_COMPLETION_DATE].year,
  });

  if (chooseCurrency) {
    if (alternativeCurrency) {
      cy.clickAlternativeCurrencyRadioOption();

      cy.completeAlternativeCurrencyField({ currency: NON_STANDARD_CURRENCY_CODE });
    } else {
      radios(CURRENCY_CODE, isoCode).option.label().click();
    }
  }
};

export default completeSingleContractPolicyForm;

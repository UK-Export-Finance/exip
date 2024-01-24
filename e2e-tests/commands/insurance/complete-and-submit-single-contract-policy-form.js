import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { radios, field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitSingleContractPolicyForm
 * Complete and submit the "single contract policy" form.
 * @param {String} isoCode: Policy currency ISO code
 * @param {Boolean} alternativeCurrency: Select the "alternative currency" option
 */
const completeAndSubmitSingleContractPolicyForm = ({
  isoCode = application.POLICY[POLICY_CURRENCY_CODE],
  alternativeCurrency = false,
}) => {
  cy.keyboardInput(field(REQUESTED_START_DATE).dayInput(), application.POLICY[REQUESTED_START_DATE].day);
  cy.keyboardInput(field(REQUESTED_START_DATE).monthInput(), application.POLICY[REQUESTED_START_DATE].month);
  cy.keyboardInput(field(REQUESTED_START_DATE).yearInput(), application.POLICY[REQUESTED_START_DATE].year);

  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).dayInput(), application.POLICY[CONTRACT_COMPLETION_DATE].day);
  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).monthInput(), application.POLICY[CONTRACT_COMPLETION_DATE].month);
  cy.keyboardInput(field(CONTRACT_COMPLETION_DATE).yearInput(), application.POLICY[CONTRACT_COMPLETION_DATE].year);

  if (alternativeCurrency) {
    cy.clickAlternativeCurrencyRadioOption();

    cy.autocompleteKeyboardInput(ALTERNATIVE_CURRENCY_CODE, isoCode);
  } else {
    radios(POLICY_CURRENCY_CODE, isoCode).option.input().click();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitSingleContractPolicyForm;

import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { radios, field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      POLICY_CURRENCY_CODE,
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
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
  cy.keyboardInput(field(REQUESTED_START_DATE).dayInput(), application.POLICY[REQUESTED_START_DATE].day);
  cy.keyboardInput(field(REQUESTED_START_DATE).monthInput(), application.POLICY[REQUESTED_START_DATE].month);
  cy.keyboardInput(field(REQUESTED_START_DATE).yearInput(), application.POLICY[REQUESTED_START_DATE].year);

  cy.keyboardInput(field(TOTAL_MONTHS_OF_COVER).input(), application.POLICY[TOTAL_MONTHS_OF_COVER]);

  if (alternativeCurrency) {
    cy.clickAlternativeCurrencyRadioOption();

    cy.autocompleteKeyboardInput(ALTERNATIVE_CURRENCY_CODE, isoCode);
  } else {
    radios(POLICY_CURRENCY_CODE, isoCode).option.input().click();
  }

  cy.clickSubmitButton();
};

export default completeAndSubmitMultipleContractPolicyForm;

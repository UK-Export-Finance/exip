import { field } from '../../pages/shared';
import { policyTypePage, tellUsAboutYourPolicyPage } from '../../pages/quote';
import { FIELD_IDS } from '../../constants';
import { GBP_CURRENCY_CODE } from '../../fixtures/currencies';

const {
  ELIGIBILITY: { CONTRACT_VALUE, CURRENCY, CREDIT_PERIOD, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER },
  POLICY_TYPE,
  POLICY_LENGTH,
} = FIELD_IDS;

export const completeAndSubmitBuyerBodyForm = () => {
  cy.clickNoRadioInput();
  cy.clickSubmitButton();
};

export const completeAndSubmitExporterLocationForm = () => {
  cy.clickYesRadioInput();
  cy.clickSubmitButton();
};

export const completeAndSubmitUkContentForm = () => {
  cy.clickYesRadioInput();
  cy.clickSubmitButton();
};

export const completeAndSubmitPolicyTypeSingleForm = () => {
  policyTypePage[POLICY_TYPE].single.label().click();

  cy.clickSubmitButton();
};

export const completeAndSubmitPolicyTypeMultiForm = () => {
  policyTypePage[POLICY_TYPE].multiple.label().click();

  cy.clickSubmitButton();
};

/**
 * completeAndSubmitTellUsAboutYourSinglePolicyForm
 * Complete and submit the "tell us about your single policy" form
 * @param {Integer} policyLength: Policy length
 */
export const completeAndSubmitTellUsAboutYourSinglePolicyForm = ({ policyLength = 3 }) => {
  cy.keyboardInput(field(POLICY_LENGTH).input(), policyLength);
  field(CURRENCY).input().select(GBP_CURRENCY_CODE);
  cy.keyboardInput(field(CONTRACT_VALUE).input(), '150000');
  field(PERCENTAGE_OF_COVER).input().select('90');
  cy.clickSubmitButton();
};

/**
 * completeAndSubmitTellUsAboutYourMultiPolicyForm
 * Complete and submit the "tell us about your multiple policy" form
 */
export const completeAndSubmitTellUsAboutYourMultiPolicyForm = () => {
  field(CURRENCY).input().select(GBP_CURRENCY_CODE);
  cy.keyboardInput(field(MAX_AMOUNT_OWED).input(), '150000');
  field(PERCENTAGE_OF_COVER).input().select('90');
  tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');
  cy.clickSubmitButton();
};

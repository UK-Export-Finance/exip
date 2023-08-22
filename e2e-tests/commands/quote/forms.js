import { yesRadio, noRadio, submitButton } from '../../pages/shared';
import { policyTypePage, tellUsAboutYourPolicyPage } from '../../pages/quote';
import { FIELD_IDS } from '../../constants';
import { GBP_CURRENCY_CODE } from '../../fixtures/currencies';

const {
  ELIGIBILITY: {
    CONTRACT_VALUE,
    CURRENCY,
    CREDIT_PERIOD,
    MAX_AMOUNT_OWED,
    PERCENTAGE_OF_COVER,
  },
  POLICY_TYPE,
  POLICY_LENGTH,
} = FIELD_IDS;

export const completeAndSubmitBuyerBodyForm = () => {
  noRadio().input().click();
  submitButton().click();
};

export const completeAndSubmitExporterLocationForm = () => {
  yesRadio().input().click();
  submitButton().click();
};

export const completeAndSubmitUkContentForm = () => {
  yesRadio().input().click();
  submitButton().click();
};

export const completeAndSubmitPolicyTypeSingleForm = () => {
  policyTypePage[POLICY_TYPE].single.input().click();

  submitButton().click();
};

export const completeAndSubmitPolicyTypeMultiForm = () => {
  policyTypePage[POLICY_TYPE].multiple.input().click();

  submitButton().click();
};

export const completeAndSubmitTellUsAboutYourSinglePolicyForm = () => {
  cy.keyboardInput(tellUsAboutYourPolicyPage[POLICY_LENGTH].input(), '3');
  tellUsAboutYourPolicyPage[CURRENCY].input().select(GBP_CURRENCY_CODE);
  cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), '150000');
  tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('90');
  submitButton().click();
};

export const completeAndSubmitTellUsAboutYourMultiPolicyForm = () => {
  tellUsAboutYourPolicyPage[CURRENCY].input().select(GBP_CURRENCY_CODE);
  cy.keyboardInput(tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input(), '150000');
  tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('90');
  tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');
  submitButton().click();
};

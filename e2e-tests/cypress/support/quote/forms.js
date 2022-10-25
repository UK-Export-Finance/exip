import { buyerCountryPage, exporterLocationPage, ukGoodsOrServicesPage, yesRadio, noRadio, submitButton } from '../../e2e/pages/shared';
import {
  buyerBodyPage,
  policyTypePage,
  tellUsAboutYourPolicyPage,
} from '../../e2e/pages/quote';
import { FIELD_IDS } from '../../../constants';

const {
  CONTRACT_VALUE,
  CURRENCY,
  CREDIT_PERIOD,
  MAX_AMOUNT_OWED,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS;

export const completeAndSubmitBuyerBodyForm = () => {
  noRadio().click();
  submitButton().click();
};

export const completeAndSubmitExporterLocationForm = () => {
  yesRadio().click();
  submitButton().click();
};

export const completeAndSubmitUkContentForm = () => {
  yesRadio().click();
  submitButton().click();
};

export const completeAndSubmitPolicyTypeSingleForm = () => {
  policyTypePage[POLICY_TYPE].single.input().click();
  policyTypePage[SINGLE_POLICY_LENGTH].input().type('3');

  submitButton().click();
};

export const completeAndSubmitPolicyTypeMultiForm = () => {
  policyTypePage[POLICY_TYPE].multi.input().click();

  submitButton().click();
};

export const completeAndSubmitTellUsAboutYourSinglePolicyForm = () => {
  tellUsAboutYourPolicyPage[CURRENCY].input().select('GBP');
  tellUsAboutYourPolicyPage[CONTRACT_VALUE].input().type('150000');
  tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('90');
  submitButton().click();
};

export const completeAndSubmitTellUsAboutYourMultiPolicyForm = () => {
  tellUsAboutYourPolicyPage[CURRENCY].input().select('GBP');
  tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input().type('150000');
  tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('90');
  tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');
  submitButton().click();
};

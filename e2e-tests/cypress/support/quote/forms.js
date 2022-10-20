import { buyerCountryPage, exporterLocationPage, ukGoodsOrServicesPage } from '../../e2e/pages/shared';
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
  buyerBodyPage[FIELD_IDS.VALID_BUYER_BODY].no().click();
  buyerBodyPage.submitButton().click();
};

export const completeAndSubmitExporterLocationForm = () => {
  exporterLocationPage[VALID_EXPORTER_LOCATION].yes().click();
  exporterLocationPage.submitButton().click();
};

export const completeAndSubmitUkContentForm = () => {
  ukGoodsOrServicesPage.yes().click();
  ukGoodsOrServicesPage.submitButton().click();
};

export const completeAndSubmitPolicyTypeSingleForm = () => {
  policyTypePage[POLICY_TYPE].single.input().click();
  policyTypePage[SINGLE_POLICY_LENGTH].input().type('3');

  policyTypePage.submitButton().click();
};

export const completeAndSubmitPolicyTypeMultiForm = () => {
  policyTypePage[POLICY_TYPE].multi.input().click();

  policyTypePage.submitButton().click();
};

export const completeAndSubmitTellUsAboutYourSinglePolicyForm = () => {
  tellUsAboutYourPolicyPage[CURRENCY].input().select('GBP');
  tellUsAboutYourPolicyPage[CONTRACT_VALUE].input().type('150000');
  tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('90');
  tellUsAboutYourPolicyPage.submitButton().click();
};

export const completeAndSubmitTellUsAboutYourMultiPolicyForm = () => {
  tellUsAboutYourPolicyPage[CURRENCY].input().select('GBP');
  tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input().type('150000');
  tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('90');
  tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('1');
  tellUsAboutYourPolicyPage.submitButton().click();
};

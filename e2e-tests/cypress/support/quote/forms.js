import {
  buyerCountryPage,
  buyerBodyPage,
  companyBasedPage,
  ukGoodsOrServicesPage,
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
  VALID_COMPANY_BASE,
} = FIELD_IDS;

export const completeAndSubmitBuyerCountryForm = () => {
  buyerCountryPage.searchInput().type('Alg');
  const results = buyerCountryPage.results();
  results.first().click();
  buyerCountryPage.submitButton().click();
};

export const completeAndSubmitBuyerBodyForm = () => {
  buyerBodyPage[FIELD_IDS.VALID_BUYER_BODY].no().click();
  buyerBodyPage.submitButton().click();
};

export const completeAndSubmitCompanyForm = () => {
  companyBasedPage[VALID_COMPANY_BASE].yes().click();
  companyBasedPage.submitButton().click();
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
  tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().type('1');
  tellUsAboutYourPolicyPage.submitButton().click();
};

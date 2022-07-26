import {
  companyBasedPage,
  buyerCountryPage,
  canGetPrivateInsurancePage,
  ukGoodsOrServicesPage,
  policyTypePage,
  tellUsAboutYourPolicyPage,
} from '../e2e/pages';
import { FIELD_IDS } from '../../constants';

const {
  AMOUNT,
  CAN_GET_PRIVATE_INSURANCE,
  CURRENCY,
  CREDIT_PERIOD,
  MULTI_POLICY_LENGTH,
  PERCENTAGE_OF_COVER,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  VALID_COMPANY_BASE,
} = FIELD_IDS;

export const completeAndSubmitBuyerForm = () => {
  buyerCountryPage.searchInput().type('Alg');
  const results = buyerCountryPage.results();
  results.first().click();
  buyerCountryPage.submitButton().click();
};

export const completeAndSubmitCompanyForm = () => {
  companyBasedPage[VALID_COMPANY_BASE].yes().click();
  companyBasedPage.submitButton().click();
};

export const completeAndSubmitTriedToObtainCoverForm = () => {
  canGetPrivateInsurancePage[CAN_GET_PRIVATE_INSURANCE].no().click();
  canGetPrivateInsurancePage.submitButton().click();
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
  policyTypePage[MULTI_POLICY_LENGTH].input().type('2');

  policyTypePage.submitButton().click();
};

export const completeAndSubmitTellUsAboutYourSinglePolicyForm = () => {
  tellUsAboutYourPolicyPage[CURRENCY].input().select('GBP');
  tellUsAboutYourPolicyPage[AMOUNT].input().type('150000');
  tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('90');
  tellUsAboutYourPolicyPage.submitButton().click();
};

export const completeAndSubmitTellUsAboutYourMultiPolicyForm = () => {
  tellUsAboutYourPolicyPage[CURRENCY].input().select('GBP');
  tellUsAboutYourPolicyPage[AMOUNT].input().type('150000');
  tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().select('90');
  tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().type('1');
  tellUsAboutYourPolicyPage.submitButton().click();
};

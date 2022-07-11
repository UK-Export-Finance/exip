import {
  companyBasedPage,
  buyerCountryPage,
  canGetPrivateInsurancePage,
  ukGoodsOrServicesPage,
  tellUsAboutYourPolicyPage,
} from '../e2e/pages';
import { FIELD_IDS } from '../../constants';

const {
  VALID_COMPANY_BASE,
  CAN_GET_PRIVATE_INSURANCE,
  CURRENCY,
  AMOUNT,
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

export const completeAndSubmitBuyerForm = () => {
  buyerCountryPage.searchInput().type('Fra');
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

export const compmleteAndSubmitTellUsAboutYourPolicyForm = () => {
  tellUsAboutYourPolicyPage[CURRENCY].input().select('GBP');
  tellUsAboutYourPolicyPage[AMOUNT].input().type('100');
  tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().type('2');
  tellUsAboutYourPolicyPage[POLICY_TYPE].single.input().click();
  tellUsAboutYourPolicyPage[SINGLE_POLICY_LENGTH].input().type('9');
  tellUsAboutYourPolicyPage.submitButton().click();
};

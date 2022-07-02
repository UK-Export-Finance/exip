import {
  companyBasedPage,
  buyerBasedPage,
  triedToObtainCoverPage,
  ukContentPercentagePage,
  tellUsAboutYourPolicyPage,
} from '../integration/pages';
import { FIELD_IDS } from '../../constants';

const {
  VALID_COMPANY_BASE,
  TRIED_PRIVATE_COVER,
  CURRENCY,
  AMOUNT,
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

export const completeAndSubmitBuyerForm = () => {
  buyerBasedPage.searchInput().type('Fra');
  const results = buyerBasedPage.results();
  results.first().click();
  buyerBasedPage.submitButton().click();
};

export const completeAndSubmitCompanyForm = () => {
  companyBasedPage[VALID_COMPANY_BASE].yes().click();
  companyBasedPage.submitButton().click();
};

export const completeAndSubmitTriedToObtainCoverForm = () => {
  triedToObtainCoverPage[TRIED_PRIVATE_COVER].no().click();
  triedToObtainCoverPage.submitButton().click();
};

export const completeAndSubmitUkContentForm = () => {
  ukContentPercentagePage.yes().click();
  ukContentPercentagePage.submitButton().click();
};

export const compmleteAndSubmitTellUsAboutYourPolicyForm = () => {
  tellUsAboutYourPolicyPage[CURRENCY].input().select('GBP');
  tellUsAboutYourPolicyPage[AMOUNT].input().type('100');
  tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().type('2');
  tellUsAboutYourPolicyPage[POLICY_TYPE].single.input().click();
  tellUsAboutYourPolicyPage[SINGLE_POLICY_LENGTH].input().type('9');
  tellUsAboutYourPolicyPage.submitButton().click();
};

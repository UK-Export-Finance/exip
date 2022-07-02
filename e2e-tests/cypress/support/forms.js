import {
  companyBasedPage,
  buyerBasedPage,
  triedToObtainCoverPage,
  ukContentPercentagePage,
  tellUsAboutYourDealPage,
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

export const compmleteAndSubmitTellUsAboutYourDealForm = () => {
  tellUsAboutYourDealPage[CURRENCY].input().select('GBP');
  tellUsAboutYourDealPage[AMOUNT].input().type('100');
  tellUsAboutYourDealPage[CREDIT_PERIOD].input().type('2');
  tellUsAboutYourDealPage[POLICY_TYPE].single.input().click();
  tellUsAboutYourDealPage[SINGLE_POLICY_LENGTH].input().type('13');
  tellUsAboutYourDealPage.submitButton().click();
};

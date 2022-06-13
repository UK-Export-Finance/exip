import {
  beforeYouStartPage,
  companyBasedPage,
  buyerBasedPage,
  triedToObtainCoverPage,
  ukContentPercentagePage,
  tellUsAboutYourDealPage,
} from '../integration/pages';
import FIELD_IDS from '../../constants/field-ids';

const {
  VALID_COMPANY_BASE,
  VALID_BUYER_BASE,
  TRIED_PRIVATE_COVER,
  CREDIT_LIMIT_CURRENCY,
  CREDIT_LIMIT,
  PRE_CREDIT_PERIOD,
  CREDIT_PERIOD,
  POLICY_LENGTH,
  POLICY_TYPE,
} = FIELD_IDS;

export default () => {
  beforeYouStartPage.submitButton().click();

  // company page/form
  companyBasedPage[VALID_COMPANY_BASE].yes().click();
  companyBasedPage.submitButton().click();

  // buyer page/form
  buyerBasedPage[VALID_BUYER_BASE].yes().click();
  buyerBasedPage.submitButton().click();

  // tried to obtain cover page/form
  triedToObtainCoverPage[TRIED_PRIVATE_COVER].yes().click();
  triedToObtainCoverPage.submitButton().click();

  // uk content percentage page/form
  ukContentPercentagePage.yes().click();
  ukContentPercentagePage.submitButton().click();

  // tell us about your deal page
  tellUsAboutYourDealPage[CREDIT_LIMIT_CURRENCY].input().select('GBP');
  tellUsAboutYourDealPage[CREDIT_LIMIT].input().type('100');
  tellUsAboutYourDealPage[PRE_CREDIT_PERIOD].input().type('1');
  tellUsAboutYourDealPage[CREDIT_PERIOD].input().type('2');
  tellUsAboutYourDealPage[POLICY_LENGTH].input().type('3');
  tellUsAboutYourDealPage[POLICY_TYPE].single.input().click();
  tellUsAboutYourDealPage.submitButton().click();
};

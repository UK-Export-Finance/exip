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
  TRIED_PRIVATE_COVER,
  CURRENCY,
  AMOUNT,
  PRE_CREDIT_PERIOD,
  CREDIT_PERIOD,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

export default () => {
  beforeYouStartPage.submitButton().click();

  // buyer page/form
  buyerBasedPage.searchInput().type('Fra');
  const results = buyerBasedPage.results();
  results.first().click();
  buyerBasedPage.submitButton().click();

  // company page/form
  companyBasedPage[VALID_COMPANY_BASE].yes().click();
  companyBasedPage.submitButton().click();

  // tried to obtain cover page/form
  triedToObtainCoverPage[TRIED_PRIVATE_COVER].yes().click();
  triedToObtainCoverPage.submitButton().click();

  // uk content percentage page/form
  ukContentPercentagePage.yes().click();
  ukContentPercentagePage.submitButton().click();

  // tell us about your deal page
  tellUsAboutYourDealPage[CURRENCY].input().select('GBP');
  tellUsAboutYourDealPage[AMOUNT].input().type('100');
  tellUsAboutYourDealPage[PRE_CREDIT_PERIOD].input().type('1');
  tellUsAboutYourDealPage[CREDIT_PERIOD].input().type('2');
  tellUsAboutYourDealPage[POLICY_TYPE].single.input().click();
  tellUsAboutYourDealPage[SINGLE_POLICY_LENGTH].input().type('13');
  tellUsAboutYourDealPage.submitButton().click();
};

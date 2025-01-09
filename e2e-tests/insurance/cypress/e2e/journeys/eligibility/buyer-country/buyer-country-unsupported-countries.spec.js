import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';

const {
  ELIGIBILITY: { CANNOT_APPLY_EXIT },
} = INSURANCE_ROUTES;

const COUNTRY_NAME_1 = COUNTRY_APPLICATION_SUPPORT.NOT_SUPPORTED_1.NAME;
const COUNTRY_NAME_2 = COUNTRY_APPLICATION_SUPPORT.NOT_SUPPORTED_2.NAME;
const COUNTRY_NAME_3 = COUNTRY_APPLICATION_SUPPORT.NOT_SUPPORTED_3.NAME;
const COUNTRY_NAME_4 = COUNTRY_APPLICATION_SUPPORT.NOT_SUPPORTED_4.NAME;

const contextString =
  'As an exporter I want to enter the country where my buyer is based So that I can ascertain if I can obtain UKEF Credit Insurance for the country where my buyer is based - submit countries that cannot apply';

context(`Insurance - Buyer country page - ${contextString} - Unsupported countries`, () => {
  beforeEach(() => {
    cy.saveSession();

    cy.completeAndSubmitEligibilityForms({ stopSubmittingAfter: 'companyDetails' });
  });

  describe(COUNTRY_NAME_1, () => {
    it(`should redirect to ${CANNOT_APPLY_EXIT} exit page`, () => {
      cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_1, CANNOT_APPLY_EXIT);
    });
  });

  describe(COUNTRY_NAME_2, () => {
    it(`should redirect to ${CANNOT_APPLY_EXIT} exit page`, () => {
      cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_2, CANNOT_APPLY_EXIT);
    });
  });

  describe(COUNTRY_NAME_3, () => {
    it(`should redirect to ${CANNOT_APPLY_EXIT} exit page`, () => {
      cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_3, CANNOT_APPLY_EXIT);
    });
  });

  describe(COUNTRY_NAME_4, () => {
    it(`should redirect to ${CANNOT_APPLY_EXIT} exit page`, () => {
      cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_4, CANNOT_APPLY_EXIT);
    });
  });
});

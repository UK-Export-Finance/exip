import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';

const {
  ELIGIBILITY: { TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
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

    cy.completeAndSubmitEligibilityForms({ formToStopAt: 'companyDetails' });
  });

  describe(COUNTRY_NAME_1, () => {
    it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
      cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_1, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
    });
  });

  describe(COUNTRY_NAME_2, () => {
    it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
      cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_2, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
    });
  });

  describe(COUNTRY_NAME_3, () => {
    it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
      cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_3, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
    });
  });

  describe(COUNTRY_NAME_4, () => {
    it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
      cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_4, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
    });
  });
});

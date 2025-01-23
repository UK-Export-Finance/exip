import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';

const {
  ELIGIBILITY: { TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = INSURANCE_ROUTES;

const COUNTRY_NAME_1 = COUNTRY_APPLICATION_SUPPORT.NO_ONLINE_SUPPORT_1.NAME;
const COUNTRY_NAME_2 = COUNTRY_APPLICATION_SUPPORT.NO_ONLINE_SUPPORT_2.NAME;
const COUNTRY_NAME_3 = COUNTRY_APPLICATION_SUPPORT.NO_ONLINE_SUPPORT_3.NAME;
const COUNTRY_NAME_4 = COUNTRY_APPLICATION_SUPPORT.NO_ONLINE_SUPPORT_4.NAME;
const COUNTRY_NAME_5 = COUNTRY_APPLICATION_SUPPORT.NO_ONLINE_SUPPORT_5.NAME;
const COUNTRY_NAME_6 = COUNTRY_APPLICATION_SUPPORT.NO_ONLINE_SUPPORT_6.NAME;

context(
  'Insurance - Buyer country page - As an exporter, I want to check if UKEF offer credit insurance policy for where my buyer is based - submit countries that have no online insurance support',
  () => {
    beforeEach(() => {
      cy.saveSession();

      cy.completeAndSubmitEligibilityForms({ stopSubmittingAfter: 'companyDetails' });
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

    describe(COUNTRY_NAME_5, () => {
      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_5, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
      });
    });

    describe(COUNTRY_NAME_6, () => {
      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_6, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
      });
    });
  },
);

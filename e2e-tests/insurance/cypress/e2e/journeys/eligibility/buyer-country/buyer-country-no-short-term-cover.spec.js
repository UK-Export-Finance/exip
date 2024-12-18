import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';

const {
  ELIGIBILITY: { TALK_TO_AN_EXPORT_FINANCE_MANAGER },
} = INSURANCE_ROUTES;

const COUNTRY_NAME_1 = COUNTRY_APPLICATION_SUPPORT.NO_SHORT_TERM_COVER_1.NAME;
const COUNTRY_NAME_2 = COUNTRY_APPLICATION_SUPPORT.NO_SHORT_TERM_COVER_2.NAME;

context(
  'Insurance - Buyer country page - As an exporter, I want to check if UKEF offer credit insurance policy for where my buyer is based - submit no short term country cover',
  () => {
    beforeEach(() => {
      cy.saveSession();

      cy.completeAndSubmitEligibilityForms({ formToStopAt: 'companyDetails' });
    });

    describe(COUNTRY_NAME_1, () => {
      it(`redirects to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER} exit page`, () => {
        cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_1, TALK_TO_AN_EXPORT_FINANCE_MANAGER);
      });
    });

    describe(COUNTRY_NAME_2, () => {
      it(`redirects to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER} exit page`, () => {
        cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_2, TALK_TO_AN_EXPORT_FINANCE_MANAGER);
      });
    });
  },
);

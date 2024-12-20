import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';

const {
  ELIGIBILITY: { CONTRACT_TOO_SHORT_EXIT },
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
      it(`redirects to ${CONTRACT_TOO_SHORT_EXIT} exit page`, () => {
        cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_1, CONTRACT_TOO_SHORT_EXIT);
      });
    });

    describe(COUNTRY_NAME_2, () => {
      it(`redirects to ${CONTRACT_TOO_SHORT_EXIT} exit page`, () => {
        cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_2, CONTRACT_TOO_SHORT_EXIT);
      });
    });
  },
);

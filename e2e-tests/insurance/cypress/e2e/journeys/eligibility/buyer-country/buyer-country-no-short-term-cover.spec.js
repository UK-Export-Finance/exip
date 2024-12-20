import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';

const {
  ELIGIBILITY: { TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = INSURANCE_ROUTES;

// TODO: rename/remove this test. "no short term cover" is not relevant, it's purely a content thing.

const COUNTRY_NAME_1 = COUNTRY_APPLICATION_SUPPORT.NO_ONLINE_SUPPORT_1.NAME;
const COUNTRY_NAME_2 = COUNTRY_APPLICATION_SUPPORT.NO_ONLINE_SUPPORT_2.NAME;

context(
  'Insurance - Buyer country page - As an exporter, I want to check if UKEF offer credit insurance policy for where my buyer is based - submit no short term country cover',
  () => {
    beforeEach(() => {
      cy.saveSession();

      cy.completeAndSubmitEligibilityForms({ formToStopAt: 'companyDetails' });
    });

    describe(COUNTRY_NAME_1, () => {
      it(`redirects to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_1, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
      });
    });

    describe(COUNTRY_NAME_2, () => {
      it(`redirects to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_2, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
      });
    });
  },
);

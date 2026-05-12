import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';
import { PAGES } from '../../../../../../content-strings';

const {
  ELIGIBILITY: { TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = INSURANCE_ROUTES;

const COUNTRY_NAME_1 = COUNTRY_APPLICATION_SUPPORT.ILC_OFFLINE_SUPPORT_ONLY_1.NAME;

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT;

const { ILC_EXIT } = CONTENT_STRINGS;

context(
  'Insurance - Buyer country page - As an exporter, I want to check if UKEF offer credit insurance policy for where my buyer is based - submit countries that are "ILC" - offline EFM support',
  () => {
    beforeEach(() => {
      cy.saveSession();

      cy.completeAndSubmitEligibilityForms({ stopSubmittingAfter: 'companyDetails' });
    });

    describe(COUNTRY_NAME_1, () => {
      it(`should redirect to ${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT} exit page`, () => {
        cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_1, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
      });

      it('should render the intro copy for ILC only countries', () => {
        cy.enterCountryAndAssertExitPageUrlBuyerCountry(COUNTRY_NAME_1, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);

        cy.checkIntroText(ILC_EXIT.REASON);
      });
    });
  },
);

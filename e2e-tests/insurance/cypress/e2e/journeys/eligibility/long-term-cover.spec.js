import { PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../commands/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.LONG_TERM_COVER;

const {
  ELIGIBILITY: { COVER_PERIOD, LONG_TERM_COVER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Eligibility - Long term cover page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction',
  () => {
    let url;

    before(() => {
      cy.navigateToCheckIfEligibleUrl();
      cy.completeCheckIfEligibleForm();

      cy.completeExporterLocationForm();
      cy.completeCompaniesHouseNumberForm();
      cy.completeAndSubmitCompaniesHouseSearchForm({});
      cy.completeEligibilityCompanyDetailsForm();
      completeAndSubmitBuyerCountryForm({});
      cy.completeAndSubmitTotalValueInsuredForm({});
      cy.completeCoverPeriodForm({ underThreshold: false });

      url = `${baseUrl}${LONG_TERM_COVER}`;

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: LONG_TERM_COVER,
        backLink: COVER_PERIOD,
        hasAForm: false,
        assertAuthenticatedHeader: false,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render intro text', () => {
        cy.checkIntroText(CONTENT_STRINGS.INTRO);
      });

      it('should render `apply through PDF` copy and link', () => {
        cy.assertApplyThroughPDFCopyAndLink({});
      });

      it('should render `talk to your nearest EFM` copy and link', () => {
        cy.assertTalkToEFMCopyAndLink({});
      });

      it('should render `contact UKEF team` copy', () => {
        cy.assertContactUkefTeam({});
      });
    });
  },
);

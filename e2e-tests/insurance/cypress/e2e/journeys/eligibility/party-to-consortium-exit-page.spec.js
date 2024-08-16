import { PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.PARTY_TO_CONSORTIUM_EXIT;

const {
  ELIGIBILITY: { PARTY_TO_CONSORTIUM, PARTY_TO_CONSORTIUM_EXIT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Eligibility - Party to consortium exit page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction',
  () => {
    let url;

    before(() => {
      cy.navigateToCheckIfEligibleUrl();
      cy.completeCheckIfEligibleForm();
      cy.completeExporterLocationForm();
      cy.completeCompaniesHouseNumberForm();
      cy.completeAndSubmitCompaniesHouseSearchForm({});
      cy.completeEligibilityCompanyDetailsForm();
      cy.completeAndSubmitBuyerCountryForm({});
      cy.completeAndSubmitTotalValueInsuredForm({});
      cy.completeCoverPeriodForm({});
      cy.completeUkGoodsAndServicesForm();
      cy.completeEndBuyerForm();
      cy.completePartyToConsortiumForm({ partyToConsortium: true });

      url = `${baseUrl}${PARTY_TO_CONSORTIUM_EXIT}`;

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: PARTY_TO_CONSORTIUM_EXIT,
        backLink: PARTY_TO_CONSORTIUM,
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

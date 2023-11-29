import { intro } from '../../../../../pages/shared';
import { PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../commands/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.LONG_TERM_COVER;

const {
  ACTIONS: { PDF_FORM, CONTACT_EFM, CONTACT_UKEF_TEAM },
} = CONTENT_STRINGS;

const {
  START,
  ELIGIBILITY: {
    COVER_PERIOD,
    LONG_TERM_COVER,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Long term cover page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction', () => {
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
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
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render intro text', () => {
      cy.checkText(intro(), CONTENT_STRINGS.INTRO);
    });

    it('should render `apply through PDF` copy and link', () => {
      cy.checkActionApplyThroughPDF({
        expectedText: `${PDF_FORM.INTRO} ${PDF_FORM.LINK.TEXT}.`,
        expectedLinkHref: PDF_FORM.LINK.HREF,
        expectedLinkText: PDF_FORM.LINK.TEXT,
      });
    });

    it('should render `talk to your nearest EFM` copy and link', () => {
      cy.checkActionTalkToYourNearestEFM({
        expectedText: `${CONTACT_EFM.INTRO} ${CONTACT_EFM.LINK.TEXT}`,
        expectedLinkHref: CONTACT_EFM.LINK.HREF,
        expectedLinkText: CONTACT_EFM.LINK.TEXT,
      });
    });

    it('should render `contact UKEF team` copy', () => {
      cy.checkActionContactUKEFTeam({
        expectedText: CONTACT_UKEF_TEAM,
      });
    });
  });
});

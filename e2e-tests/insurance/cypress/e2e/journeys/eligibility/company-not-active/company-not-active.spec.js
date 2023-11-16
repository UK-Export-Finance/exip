import { body } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { COMPANIES_HOUSE_NUMBER_NOT_ACTIVE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COMPANY_NOT_ACTIVE;

const {
  START,
  ELIGIBILITY: { COMPANY_NOT_ACTIVE, ENTER_COMPANIES_HOUSE_NUMBER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Company not active - I want to check if I can use online service to apply for UKEF Export Insurance Policy', () => {
  const url = `${baseUrl}${COMPANY_NOT_ACTIVE}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();

    cy.completeAndSubmitCompaniesHouseSearchForm({
      companyNumber: COMPANIES_HOUSE_NUMBER_NOT_ACTIVE,
    });

    cy.assertUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: COMPANY_NOT_ACTIVE,
      backLink: ENTER_COMPANIES_HOUSE_NUMBER,
      assertAuthenticatedHeader: false,
      assertSubmitButton: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);
    });

    it('should render body copy', () => {
      cy.checkText(body(), CONTENT_STRINGS.BODY);
    });

    describe('actions', () => {
      it('should render `eligibility` copy and link', () => {
        cy.checkActionReadAboutEligibility();
      });

      describe('when clicking `eligibility` link', () => {
        it('should redirect to an external URL', () => {
          cy.checkActionReadAboutEligibilityLinkRedirect();
        });
      });

      it('should render `contact an approved broker` copy and link', () => {
        cy.checkActionContactApprovedBroker();
      });

      it('should render `talk to your nearest EFM` copy and link', () => {
        cy.checkActionTalkToYourNearestEFM({});
      });
    });
  });
});

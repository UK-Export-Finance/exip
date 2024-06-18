import { actions, body } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.NO_COMPANIES_HOUSE_NUMBER;

const { ACTIONS } = CONTENT_STRINGS;

const {
  ELIGIBILITY: { NO_COMPANIES_HOUSE_NUMBER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - You cannot apply for credit insurance page (no companies house number)', () => {
  const url = `${baseUrl}${NO_COMPANIES_HOUSE_NUMBER}`;

  before(() => {
    cy.navigateToUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: NO_COMPANIES_HOUSE_NUMBER,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
      hasAForm: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);
    });

    it('should render body copy', () => {
      cy.checkText(
        body(),
        CONTENT_STRINGS.BODY,
      );
    });

    describe('actions', () => {
      it('should render `update company details` copy and link', () => {
        cy.checkText(
          actions.updateCompanyDetails(),
          `${ACTIONS.UPDATE_COMPANY_DETAILS.TEXT} ${ACTIONS.UPDATE_COMPANY_DETAILS.LINK.TEXT}`,
        );

        cy.checkLink(
          actions.updateCompanyDetailsLink(),
          ACTIONS.UPDATE_COMPANY_DETAILS.LINK.HREF,
          ACTIONS.UPDATE_COMPANY_DETAILS.LINK.TEXT,
        );
      });

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

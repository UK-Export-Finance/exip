import { submitButton } from '../../../../../pages/shared';
import { insurance } from '../../../../../pages';
import { PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { completeStartForm } from '../../../../../commands/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE;

const {
  START,
  ELIGIBILITY: { CHECK_IF_ELIGIBLE, BUYER_COUNTRY },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance Eligibility - check if eligible page', () => {
  const url = `${baseUrl}${CHECK_IF_ELIGIBLE}`;

  before(() => {
    cy.navigateToUrl(START);

    completeStartForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CHECK_IF_ELIGIBLE,
      backLink: START,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a body text', () => {
      cy.checkText(insurance.eligibility.checkIfEligiblePage.body(), CONTENT_STRINGS.BODY);
    });

    context('form submission', () => {
      it(`should redirect to ${BUYER_COUNTRY}`, () => {
        submitButton().click();

        const expectedUrl = `${baseUrl}${BUYER_COUNTRY}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});

import { submitButton, needToStartAgainPage } from '../../../../../pages/shared';
import { LINKS, PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../../commands/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.NEED_TO_START_AGAIN_PAGE;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY, PRE_CREDIT_PERIOD, NEED_TO_START_AGAIN },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const buyerCountryUrl = `${baseUrl}${BUYER_COUNTRY}`;

context('Insurance Eligibility - Need to start again exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(START);

    cy.saveSession();

    completeStartForm();
    completeCheckIfEligibleForm();

    cy.assertUrl(buyerCountryUrl);

    cy.navigateToUrl(PRE_CREDIT_PERIOD);

    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: NEED_TO_START_AGAIN,
      backLink: BUYER_COUNTRY,
      assertBackLink: false,
      submitButtonCopy: LINKS.START_AGAIN.TEXT,
      assertAuthenticatedHeader: false,
    });
  });

  it('renders a reason', () => {
    needToStartAgainPage.reason().should('exist');
  });

  describe('clicking the submit button', () => {
    it(`should redirect to ${BUYER_COUNTRY}`, () => {
      submitButton().click();

      cy.assertUrl(buyerCountryUrl);
    });
  });
});

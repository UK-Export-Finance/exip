import { submitButton, needToStartAgainPage } from '../../../../../pages/shared';
import { LINKS, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../commands/forms';
import { completeAndSubmitBuyerBodyForm } from '../../../../../commands/quote/forms';

const CONTENT_STRINGS = PAGES.NEED_TO_START_AGAIN_PAGE;

const {
  QUOTE: {
    TELL_US_ABOUT_YOUR_POLICY,
    NEED_TO_START_AGAIN,
    BUYER_COUNTRY,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Get a Quote - Need to start again exit page', () => {
  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();

    cy.navigateToUrl(TELL_US_ABOUT_YOUR_POLICY);

    cy.saveSession();

    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: NEED_TO_START_AGAIN,
      submitButtonCopy: LINKS.START_AGAIN.TEXT,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  it('renders a reason', () => {
    needToStartAgainPage.reason().should('exist');
  });

  describe('clicking the submit button', () => {
    it(`should redirect to ${BUYER_COUNTRY}`, () => {
      submitButton().click();

      const expectedUrl = `${baseUrl}${BUYER_COUNTRY}`;

      cy.assertUrl(expectedUrl);
    });
  });
});

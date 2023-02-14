import { submitButton, needToStartAgainPage } from '../../pages/shared';
import partials from '../../partials';
import { LINKS, PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../support/forms';
import { completeAndSubmitBuyerBodyForm } from '../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.NEED_TO_START_AGAIN_PAGE;

const startRoute = ROUTES.QUOTE.START;

context('Get a Quote - Need to start again exit page', () => {
  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();

    cy.navigateToUrl(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);

    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');

    cy.url().should('include', ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.NEED_TO_START_AGAIN,
      submitButtonCopy: LINKS.START_AGAIN.TEXT,
      assertBackLink: false,
    });
  });

  it('should render a header with href to quote start', () => {
    partials.header.serviceName().should('have.attr', 'href', startRoute);
  });

  it('renders a reason', () => {
    needToStartAgainPage.reason().should('exist');
  });

  describe('clicking the submit button', () => {
    it(`should redirect to ${ROUTES.QUOTE.BUYER_COUNTRY}`, () => {
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
    });
  });
});

import {
  backLink, yesRadio, yesRadioInput, submitButton,
} from '../../../pages/shared';
import { getAQuoteByEmailPage } from '../../../pages/quote';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';

context('Buyer body page - as an exporter, I want to check if I can get an EXIP online quote for my buyers country - submit `buyer is a government or public sector body`', () => {
  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();

    cy.url().should('include', ROUTES.QUOTE.BUYER_BODY);

    yesRadio().click();
    submitButton().click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
  });

  it('renders a back link with correct url', () => {
    backLink().should('exist');

    backLink().should('have.attr', 'href', ROUTES.QUOTE.BUYER_BODY);
  });

  it('renders a specific reason and description', () => {
    const expectedReason = PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL.REASON.BUYER_BODY;
    cy.checkText(getAQuoteByEmailPage.reason(), expectedReason);

    const expectedDescription = PAGES.QUOTE.GET_A_QUOTE_BY_EMAIL.REASON.BUYER_BODY_DESCRIPTION;
    cy.checkText(getAQuoteByEmailPage.description(), expectedDescription);
  });

  describe('navigating back to the buyer body page', () => {
    it('auto checks the previously submitted answer', () => {
      cy.clickBackLink();

      yesRadioInput().should('be.checked');
    });
  });
});

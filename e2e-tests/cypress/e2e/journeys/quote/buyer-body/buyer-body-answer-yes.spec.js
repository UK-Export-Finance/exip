import {
  backLink, yesRadio, yesRadioInput, submitButton,
} from '../../../pages/shared';
import { getAQuoteByEmailPage } from '../../../pages/quote';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';

context('Buyer body page - as an exporter, I want to check if I can get an EXIP online quote for my buyers country - submit `buyer is a government or public sector body`', () => {
  const url = ROUTES.QUOTE.BUYER_BODY;

  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    yesRadio().click();
    submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.assertUrl(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
  });

  it('renders a back link with correct url', () => {
    backLink().should('exist');

    backLink().should('have.attr', 'href', url);
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

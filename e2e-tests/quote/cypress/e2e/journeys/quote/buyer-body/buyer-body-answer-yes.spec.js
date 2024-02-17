import {
  backLink, yesRadio, yesRadioInput, submitButton,
} from '../../../../../../pages/shared';
import { getAQuoteByEmailPage } from '../../../../../../pages/quote';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';

const {
  QUOTE: { BUYER_BODY, GET_A_QUOTE_BY_EMAIL },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Buyer body page - as an exporter, I want to check if I can get an EXIP online quote for my buyers country - submit `buyer is a government or public sector body`', () => {
  const url = `${baseUrl}${BUYER_BODY}`;

  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    yesRadio().label().click();
    submitButton().click();
  });

  it('redirects to exit page', () => {
    const expectedUrl = `${baseUrl}${GET_A_QUOTE_BY_EMAIL}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders a back link with correct url', () => {
    cy.checkLink(
      backLink(),
      BUYER_BODY,
      LINKS.BACK,
    );
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

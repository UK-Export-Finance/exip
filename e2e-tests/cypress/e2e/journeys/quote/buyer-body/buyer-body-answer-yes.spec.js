import {
  buyerBodyPage,
  getAQuoteByEmailPage,
} from '../../../pages/quote';
import partials from '../../../partials';
import { PAGES } from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.BUYER_BODY_PAGE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Buyer body page - as an exporter, I want to check if I can get an EXIP online quote for my buyers country - submit `buyer is a government or public sector body`', () => {
  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();

    cy.url().should('include', ROUTES.QUOTE.BUYER_BODY);

    buyerBodyPage[FIELD_IDS.VALID_BUYER_BODY].yes().click();
    buyerBodyPage.submitButton().click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    partials.backLink().should('have.attr', 'href', ROUTES.QUOTE.BUYER_BODY);
  });

  it('renders a specific reason and description', () => {
    getAQuoteByEmailPage.reason().invoke('text').then((text) => {
      const expected = PAGES.GET_A_QUOTE_BY_EMAIL_PAGE.REASON.BUYER_BODY;

      expect(text.trim()).equal(expected);
    });

    getAQuoteByEmailPage.description().invoke('text').then((text) => {
      const expected = PAGES.GET_A_QUOTE_BY_EMAIL_PAGE.REASON.BUYER_BODY_DESCRIPTION;

      expect(text.trim()).equal(expected);
    });
  });

  describe('navigating back to the buyer body page', () => {
    it('auto checks the previously submitted answer', () => {
      partials.backLink().click();

      const yesRadio = buyerBodyPage[FIELD_IDS.VALID_BUYER_BODY].yesInput();
      yesRadio.should('be.checked');
    });
  });
});

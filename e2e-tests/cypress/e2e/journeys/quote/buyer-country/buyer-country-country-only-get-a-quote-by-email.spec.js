import { buyerCountryPage } from '../../../pages/shared';
import partials from '../../../partials';
import { PAGES } from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;
const { ROUTES } = CONSTANTS;

const COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY = 'Egypt';

context('Buyer country page - as an exporter, I want to check if UKEF issue export insurance cover for where my buyer is based - submit country that can only get a quote offline/via email', () => {
  before(() => {
    cy.visit(ROUTES.QUOTE.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);

    buyerCountryPage.searchInput().type(COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY);

    const results = buyerCountryPage.results();
    results.first().click();

    buyerCountryPage.submitButton().click();
  });

  it('redirects to `get a quote via email` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    const expected = ROUTES.QUOTE.BUYER_COUNTRY;

    partials.backLink().should('have.attr', 'href', expected);
  });
});

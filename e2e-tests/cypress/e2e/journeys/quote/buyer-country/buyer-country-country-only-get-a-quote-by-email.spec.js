import { backLink, buyerCountryPage, submitButton } from '../../../pages/shared';
import { ROUTES } from '../../../../../constants';

const COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY = 'Egypt';

context('Buyer country page - as an exporter, I want to check if UKEF issue export insurance cover for where my buyer is based - submit country that can only get a quote offline/via email', () => {
  const url = ROUTES.QUOTE.BUYER_COUNTRY;

  beforeEach(() => {
    cy.navigateToUrl(url);
    cy.url().should('include', url);

    cy.keyboardInput(buyerCountryPage.searchInput(), COUNTRY_NAME_QUOTE_BY_EMAIL_ONLY);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();
  });

  it('redirects to `get a quote via email` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
  });

  it('renders a back link with correct url', () => {
    backLink().should('exist');

    const expected = ROUTES.QUOTE.BUYER_COUNTRY;

    backLink().should('have.attr', 'href', expected);
  });
});

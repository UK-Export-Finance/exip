import { buyerCountryPage, cannotApplyPage } from '../../../pages/shared';
import partials from '../../../partials';
import { PAGES } from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;
const { ROUTES } = CONSTANTS;

const COUNTRY_NAME_UNSUPPORTED = 'France';

context('Buyer country page - as an exporter, I want to check if UKEF issue export insurance cover for where my buyer is based - submit unsupported country', () => {
  before(() => {
    cy.visit(ROUTES.QUOTE.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);

    buyerCountryPage.searchInput().type(COUNTRY_NAME_UNSUPPORTED);

    const results = buyerCountryPage.results();
    results.first().click();

    buyerCountryPage.submitButton().click();
  });

  it('redirects to `cannot obtain cover` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    partials.backLink().should('have.attr', 'href', ROUTES.QUOTE.BUYER_COUNTRY);
  });

  it('renders a specific reason', () => {
    cannotApplyPage.reason().invoke('text').then((text) => {
      const { REASON } = CONTENT_STRINGS;
      const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${COUNTRY_NAME_UNSUPPORTED}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

      expect(text.trim()).equal(expected);
    });
  });
});

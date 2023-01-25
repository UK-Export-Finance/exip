import { buyerCountryPage, cannotApplyPage, submitButton } from '../../../pages/shared';
import partials from '../../../partials';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;

const COUNTRY_NAME_UNSUPPORTED = 'France';

context('Buyer country page - as an exporter, I want to check if UKEF issue export insurance cover for where my buyer is based - submit unsupported country', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.QUOTE.BUYER_COUNTRY);
    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);

    buyerCountryPage.searchInput().type(COUNTRY_NAME_UNSUPPORTED);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();
  });

  it('redirects to `cannot obtain cover` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.CANNOT_APPLY);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    partials.backLink().should('have.attr', 'href', ROUTES.QUOTE.BUYER_COUNTRY);
  });

  it('renders a specific reason', () => {
    const { REASON } = CONTENT_STRINGS;
    const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${COUNTRY_NAME_UNSUPPORTED}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });
});

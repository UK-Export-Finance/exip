import { buyerCountryPage, cannotApplyPage } from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import partials from '../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import CONSTANTS from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;
const { REASON } = CONTENT_STRINGS;

const { ROUTES } = CONSTANTS;

const COUNTRY_NAME_UNSUPPORTED = 'France';

context('Insurance - Buyer location page - as an exporter, I want to check if UKEF offer export insurance policy for where my buyer is based - submit unsupported country', () => {
  before(() => {
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY);

    buyerCountryPage.searchInput().type(COUNTRY_NAME_UNSUPPORTED);

    const results = buyerCountryPage.results();
    results.first().click();

    buyerCountryPage.submitButton().click();
  });

  it('redirects to `cannot apply` exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
  });

  it('renders a reason', () => {
    cannotApplyPage.reason().should('exist');

    cannotApplyPage.reason().invoke('text').then((text) => {
      const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${COUNTRY_NAME_UNSUPPORTED}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;
      expect(text.trim()).equal(expected);
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY}`;

    partials.backLink().should('have.attr', 'href', expected);
  });
});

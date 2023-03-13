import {
  backLink, buyerCountryPage, cannotApplyPage, submitButton,
} from '../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;
const { REASON } = CONTENT_STRINGS;

const COUNTRY_NAME_UNSUPPORTED = 'France';

context('Insurance - Buyer country page - as an exporter, I want to check if UKEF offer export insurance policy for where my buyer is based - submit unsupported country', () => {
  const url = ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY;

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.keyboardInput(buyerCountryPage.searchInput(), COUNTRY_NAME_UNSUPPORTED);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();
  });

  it('redirects to `cannot apply` exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
  });

  it('renders a reason', () => {
    cannotApplyPage.reason().should('exist');

    const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${COUNTRY_NAME_UNSUPPORTED}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });

  it('renders a back link with correct url', () => {
    backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY}`;

    backLink().should('have.attr', 'href', expected);
  });

  it('should NOT have the originally submitted answer selected when going back to the page', () => {
    cy.clickBackLink();

    buyerCountryPage.results().should('have.length', 0);
  });
});

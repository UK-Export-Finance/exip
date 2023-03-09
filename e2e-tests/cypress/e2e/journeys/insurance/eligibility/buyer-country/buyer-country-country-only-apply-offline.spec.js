import { backLink, buyerCountryPage, submitButton } from '../../../../pages/shared';
import { ROUTES } from '../../../../../../constants';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../../support/insurance/eligibility/forms';

const COUNTRY_NAME_APPLY_OFFLINE_ONLY = 'Angola';

context('Buyer country page - as an exporter, I want to check if UKEF issue export insurance cover for where my buyer is based - submit country that can only apply offline/via a physical form', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();

    cy.keyboardInput(buyerCountryPage.searchInput(), COUNTRY_NAME_APPLY_OFFLINE_ONLY);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('redirects to `apply offline` exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.APPLY_OFFLINE);
  });

  it('renders a back link with correct url', () => {
    backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY}`;

    backLink().should('have.attr', 'href', expected);
  });

  describe('when going back to the page', () => {
    it('should NOT have the originally submitted answer selected', () => {
      cy.clickBackLink();

      buyerCountryPage.results().should('have.length', 0);
    });
  });
});

import { submitButton } from '../../../pages/shared';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import { ROUTES } from '../../../../../constants';

context('Get a quote, Complete insurance eligibility and then re-visit the quote tool - all via `start now` route/beginning of the flow', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.ROOT);

    cy.submitQuoteAnswersHappyPathSinglePolicy();
    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('allows an exporter to complete insurance eligibility when visiting the beginning of the flow', () => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();
  });

  it('allows an exporter to start another quote when visiting the beginning of the flow', () => {
    cy.navigateToUrl(ROUTES.ROOT);

    completeAndSubmitBuyerCountryForm();

    cy.url().should('include', ROUTES.QUOTE.BUYER_BODY);
  });
});

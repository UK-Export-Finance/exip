import { submitButton } from '../../../pages/shared';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../support/insurance/eligibility/forms';
import { ROUTES } from '../../../../../constants';

context('Complete insurance eligibility, get a quote and then re-visit the insurance eligibility - all via `start now` route/beginning of the flow', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('allows an exporter to get a quote when visiting the beginning of the flow', () => {
    cy.navigateToUrl(ROUTES.ROOT);

    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);

    cy.submitAnswersHappyPathSinglePolicy();
    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
  });

  it('allows an exporter to start another insurance eligibility when visiting the beginning of the flow', () => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
  });
});

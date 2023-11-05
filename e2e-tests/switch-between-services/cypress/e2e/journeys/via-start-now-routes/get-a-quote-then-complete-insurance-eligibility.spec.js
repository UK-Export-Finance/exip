import { submitButton } from '../../../../../pages/shared';
import { completeAndSubmitBuyerCountryForm } from '../../../../../commands/forms';
import { ROUTES } from '../../../../../constants';

const {
  ROOT,
  QUOTE: { BUYER_BODY, YOUR_QUOTE },
  INSURANCE: { START },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Get a quote, Complete insurance eligibility and then re-visit the quote tool - all via `start now` route/beginning of the flow', () => {
  before(() => {
    cy.navigateToUrl(ROOT);

    cy.submitQuoteAnswersHappyPathSinglePolicy();
    submitButton().click();

    const expectedUrl = `${baseUrl}${YOUR_QUOTE}`;

    cy.assertUrl(expectedUrl);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('allows an exporter to complete insurance eligibility when visiting the beginning of the flow', () => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();
  });

  it('allows an exporter to start another quote when visiting the beginning of the flow', () => {
    cy.navigateToUrl(ROOT);

    completeAndSubmitBuyerCountryForm();

    const expectedUrl = `${baseUrl}${BUYER_BODY}`;

    cy.assertUrl(expectedUrl);
  });
});

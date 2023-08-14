import { submitButton } from '../../../../../pages/shared';
import { completeAndSubmitBuyerCountryForm } from '../../../../../commands/forms';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../../commands/insurance/eligibility/forms';
import { ROUTES } from '../../../../../constants';

const {
  ROOT,
  INSURANCE: { START, ELIGIBILITY },
  QUOTE: { BUYER_COUNTRY, YOUR_QUOTE },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Complete insurance eligibility, get a quote and then re-visit the insurance eligibility - all via `start now` route/beginning of the flow', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('allows an exporter to get a quote when visiting the beginning of the flow', () => {
    cy.navigateToUrl(ROOT);

    let expectedUrl = `${baseUrl}${BUYER_COUNTRY}`;

    cy.assertUrl(expectedUrl);

    cy.submitQuoteAnswersHappyPathSinglePolicy();
    submitButton().click();

    expectedUrl = `${baseUrl}${YOUR_QUOTE}`;

    cy.assertUrl(expectedUrl);
  });

  it('allows an exporter to start another insurance eligibility when visiting the beginning of the flow', () => {
    cy.navigateToUrl(START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();

    const expectedUrl = `${baseUrl}${ELIGIBILITY.EXPORTER_LOCATION}`;

    cy.assertUrl(expectedUrl);
  });
});

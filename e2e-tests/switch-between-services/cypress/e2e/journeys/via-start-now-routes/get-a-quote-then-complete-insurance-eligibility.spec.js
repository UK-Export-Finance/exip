import { ROUTES } from '../../../../../constants';

const {
  ROOT,
  QUOTE: { TYPE_OF_BUYER, YOUR_QUOTE },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Get a quote, Complete insurance eligibility and then re-visit the quote tool - all via `start now` route/beginning of the flow', () => {
  before(() => {
    cy.navigateToUrl(ROOT);

    cy.submitQuoteAnswersHappyPathSinglePolicy({});
    cy.clickSubmitButton();

    const expectedUrl = `${baseUrl}${YOUR_QUOTE}`;

    cy.assertUrl(expectedUrl);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('allows an exporter to complete insurance eligibility when visiting the beginning of the flow', () => {
    cy.navigateToCheckIfEligibleUrl();

    cy.submitInsuranceEligibilityAndStartApplication();
  });

  it('allows an exporter to start another quote when visiting the beginning of the flow', () => {
    cy.navigateToUrl(ROOT);

    cy.completeAndSubmitBuyerCountryForm({});

    const expectedUrl = `${baseUrl}${TYPE_OF_BUYER}`;

    cy.assertUrl(expectedUrl);
  });
});

import { ROUTES } from '../../../../../constants';

const {
  ROOT,
  INSURANCE: { ELIGIBILITY },
  QUOTE: { BUYER_COUNTRY, YOUR_QUOTE },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Complete insurance eligibility, get a quote and then re-visit the insurance eligibility - all via `start now` route/beginning of the flow', () => {
  before(() => {
    cy.navigateToCheckIfEligibleUrl();

    cy.submitInsuranceEligibilityAndStartApplication();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('allows an exporter to get a quote when visiting the beginning of the flow', () => {
    cy.navigateToUrl(ROOT);

    let expectedUrl = `${baseUrl}${BUYER_COUNTRY}`;

    cy.assertUrl(expectedUrl);

    cy.submitQuoteAnswersHappyPathSinglePolicy({});
    cy.clickSubmitButton();

    expectedUrl = `${baseUrl}${YOUR_QUOTE}`;

    cy.assertUrl(expectedUrl);
  });

  it('allows an exporter to start another insurance eligibility when visiting the beginning of the flow', () => {
    cy.navigateToCheckIfEligibleUrl();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();

    const expectedUrl = `${baseUrl}${ELIGIBILITY.COMPANIES_HOUSE_NUMBER}`;

    cy.assertUrl(expectedUrl);
  });
});

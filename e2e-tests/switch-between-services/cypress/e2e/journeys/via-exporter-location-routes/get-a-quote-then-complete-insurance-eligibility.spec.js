import { submitButton } from '../../../../../pages/shared';
import { completeAndSubmitBuyerCountryForm } from '../../../../../commands/forms';
import { ROUTES } from '../../../../../constants';

const {
  QUOTE: { BUYER_COUNTRY, BUYER_BODY, YOUR_QUOTE },
  INSURANCE: { ELIGIBILITY },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Get a quote, complete insurance eligibility and then re-visit the quote tool - all by visiting the buyer country form instead of via `start now` route', () => {
  const url = `${baseUrl}${YOUR_QUOTE}`;

  before(() => {
    cy.navigateToUrl(BUYER_COUNTRY);

    cy.submitQuoteAnswersHappyPathSinglePolicy();
    submitButton().click();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('allows an exporter to complete insurance eligibility when visiting the exporter location page directly', () => {
    cy.navigateToUrl(ELIGIBILITY.EXPORTER_LOCATION);

    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    completeAndSubmitBuyerCountryForm();
    cy.completeInsuredAmountForm();
    cy.completeInsuredPeriodForm();
    cy.completeUkGoodsAndServicesForm();
    cy.completeEligibleToApplyOnlineForm();
  });

  it('allows an exporter to get another quote when visiting the buyer country page directly', () => {
    cy.navigateToUrl(BUYER_COUNTRY);

    completeAndSubmitBuyerCountryForm();

    const expectedUrl = `${baseUrl}${BUYER_BODY}`;

    cy.assertUrl(expectedUrl);
  });
});

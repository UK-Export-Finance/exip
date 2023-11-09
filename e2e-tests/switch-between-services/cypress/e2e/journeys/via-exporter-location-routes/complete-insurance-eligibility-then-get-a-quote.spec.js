import { submitButton } from '../../../../../pages/shared';
import { completeAndSubmitBuyerCountryForm } from '../../../../../commands/forms';
import { ROUTES } from '../../../../../constants';

const {
  INSURANCE: {
    ELIGIBILITY: {
      EXPORTER_LOCATION,
      COMPANIES_HOUSE_NUMBER,
    },
  },
  QUOTE,
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Complete insurance eligibility, get a quote and then re-visit the insurance eligibility - all by visiting the buyer country form instead of via `start now` route', () => {
  before(() => {
    cy.navigateToUrl(EXPORTER_LOCATION);

    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm();
    cy.completeTotalValueInsuredForm({});
    cy.completeInsuredPeriodForm();
    cy.completeUkGoodsAndServicesForm();
    cy.completeEligibleToApplyOnlineForm();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('allows an exporter to get a quote when visiting the buyer country page directly', () => {
    cy.navigateToUrl(QUOTE.BUYER_COUNTRY);

    cy.submitQuoteAnswersHappyPathSinglePolicy();
    submitButton().click();

    const expectedUrl = `${baseUrl}${QUOTE.YOUR_QUOTE}`;

    cy.assertUrl(expectedUrl);
  });

  it('allows an exporter to start another insurance eligibility when visiting the exporter location page directly', () => {
    cy.navigateToUrl(EXPORTER_LOCATION);

    cy.completeExporterLocationForm();

    const expectedUrl = `${baseUrl}${COMPANIES_HOUSE_NUMBER}`;

    cy.assertUrl(expectedUrl);
  });
});

import { submitButton } from '../../../../../pages/shared';
import { completeAndSubmitBuyerCountryForm } from '../../../../../commands/forms';
import {
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeOtherPartiesForm,
  completeLetterOfCreditForm,
  completePreCreditPeriodForm,
  completeCompaniesHouseNumberForm,
  completeEligibleToApplyOnlineForm,
} from '../../../../../commands/insurance/eligibility/forms';
import { ROUTES } from '../../../../../constants';

const {
  INSURANCE: {
    ELIGIBILITY: {
      BUYER_COUNTRY,
      EXPORTER_LOCATION,
    },
  },
  QUOTE,
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Complete insurance eligibility, get a quote and then re-visit the insurance eligibility - all by visiting the buyer country form instead of via `start now` route', () => {
  before(() => {
    cy.navigateToUrl(BUYER_COUNTRY);

    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();
    completeOtherPartiesForm();
    completeLetterOfCreditForm();
    completePreCreditPeriodForm();
    completeCompaniesHouseNumberForm();
    completeEligibleToApplyOnlineForm();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('allows an exporter to get a quote when visiting the buyer country page directly', () => {
    cy.navigateToUrl(QUOTE.BUYER_COUNTRY);

    cy.submitQuoteAnswersHappyPathSinglePolicy({});
    submitButton().click();

    const expectedUrl = `${baseUrl}${QUOTE.YOUR_QUOTE}`;

    cy.assertUrl(expectedUrl);
  });

  it('allows an exporter to start another insurance eligibility when visiting the buyer country page directly', () => {
    cy.navigateToUrl(BUYER_COUNTRY);

    completeAndSubmitBuyerCountryForm();

    const expectedUrl = `${baseUrl}${EXPORTER_LOCATION}`;

    cy.assertUrl(expectedUrl);
  });
});

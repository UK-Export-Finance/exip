import { submitButton } from '../../../pages/shared';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
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
} from '../../../../support/insurance/eligibility/forms';
import { ROUTES } from '../../../../../constants';

context('Complete insurance eligibility, get a quote and then re-visit the insurance eligibility - all by visiting the buyer country form instead of via `start now` route', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY);

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
    cy.navigateToUrl(ROUTES.QUOTE.BUYER_COUNTRY);

    cy.submitQuoteAnswersHappyPathSinglePolicy();
    submitButton().click();

    cy.assertUrl(ROUTES.QUOTE.YOUR_QUOTE);
  });

  it('allows an exporter to start another insurance eligibility when visiting the buyer country page directly', () => {
    cy.navigateToUrl(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY);

    completeAndSubmitBuyerCountryForm();

    cy.assertUrl(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
  });
});

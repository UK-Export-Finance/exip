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

context('Get a quote, complete insurance eligibility and then re-visit the quote tool - all by visiting the buyer country form instead of via `start now` route', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.QUOTE.BUYER_COUNTRY);

    cy.submitAnswersHappyPathSinglePolicy();
    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('allows an exporter to complete insurance eligibility when visiting the buyer country page directly', () => {
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

  it('allows an exporter to get another quote when visiting the buyer country page directly', () => {
    cy.navigateToUrl(ROUTES.QUOTE.BUYER_COUNTRY);

    completeAndSubmitBuyerCountryForm();

    cy.url().should('include', ROUTES.QUOTE.BUYER_BODY);
  });
});

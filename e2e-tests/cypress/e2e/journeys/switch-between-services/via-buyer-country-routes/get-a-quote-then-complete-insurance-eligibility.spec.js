import { submitButton } from '../pages/shared';
import { completeAndSubmitBuyerCountryForm } from '../../support/forms'
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
} from '../../support/insurance/eligibility/forms';
import { ROUTES } from '../../../constants';

context('Get a quote, complete insurance eligibility and then re-visit the quote tool - all by visiting the buyer country form instead of via `start now` route', () => {
  before(() => {
    cy.visit(ROUTES.QUOTE.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitAnswersHappyPathSinglePolicy();
    submitButton().click();

    cy.url().should('include', ROUTES.QUOTE.YOUR_QUOTE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('allows an exporter to complete insurance eligibility when visiting the buyer country page directly', () => {
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

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
    cy.visit(ROUTES.QUOTE.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeAndSubmitBuyerCountryForm();

    cy.url().should('include', ROUTES.QUOTE.BUYER_BODY);
  });
});

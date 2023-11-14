import { completeAndSubmitBuyerCountryForm } from '../../forms';

/**
 * checkAuthHeader
 * Run authenticated header check if flag is true
 * @param {Boolean} assertAuthenticatedHeader
 */
const checkAuthHeader = (assertAuthenticatedHeader) => {
  if (assertAuthenticatedHeader) {
    cy.checkAuthenticatedHeader();
  }
};

/**
 * submitAnswersFromExporterLocationHappyPath
 * Check the auth header before submitting an eligibility fom
 * @param {Boolean} assertAuthenticatedHeader
 */
const submitAnswersFromExporterLocationHappyPath = (assertAuthenticatedHeader = false) => {
  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeExporterLocationForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeCompaniesHouseNumberForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeAndSubmitCompaniesHouseSearchForm({});

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeEligibilityCompanyDetailsForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completeAndSubmitBuyerCountryForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeAndSubmitTotalValueInsuredForm({});

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeInsuredPeriodForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeUkGoodsAndServicesForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeEligibleToApplyOnlineForm();

  checkAuthHeader(assertAuthenticatedHeader);
};

export default submitAnswersFromExporterLocationHappyPath;

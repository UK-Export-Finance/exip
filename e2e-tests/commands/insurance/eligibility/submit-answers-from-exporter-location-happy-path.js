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
 * @param {String} companyNumber
 */
const submitAnswersFromExporterLocationHappyPath = ({ assertAuthenticatedHeader = false, companyNumber }) => {
  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeExporterLocationForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeCompaniesHouseNumberForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeAndSubmitCompaniesHouseSearchForm({ companyNumber });

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeEligibilityCompanyDetailsForm();

  checkAuthHeader(assertAuthenticatedHeader);

  completeAndSubmitBuyerCountryForm({});

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeAndSubmitTotalValueInsuredForm({});

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeCoverPeriodForm({});

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeUkGoodsAndServicesForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeEndBuyerForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.submitCheckYourAnswers();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeEligibleToApplyOnlineForm();

  checkAuthHeader(assertAuthenticatedHeader);
};

export default submitAnswersFromExporterLocationHappyPath;

/**
 * checkAuthHeader
 * Run authenticated header check if flag is true
 * @param {boolean} assertAuthenticatedHeader
 */
const checkAuthHeader = (assertAuthenticatedHeader) => {
  if (assertAuthenticatedHeader) {
    cy.checkAuthenticatedHeader();
  }
};

/**
 * submitAnswersFromExporterLocationHappyPath
 * Check the auth header before submitting an eligibility fom
 * @param {boolean} assertAuthenticatedHeader
 * @param {string} companyNumber
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

  cy.completeAndSubmitBuyerCountryForm({});

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeAndSubmitTotalValueInsuredForm({});

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeCoverPeriodForm({});

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeUkGoodsAndServicesForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeEndBuyerForm();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completePartyToConsortiumForm({});

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeMemberOfAGroupForm({});

  checkAuthHeader(assertAuthenticatedHeader);

  cy.submitCheckYourAnswers();

  checkAuthHeader(assertAuthenticatedHeader);

  cy.completeEligibleToApplyOnlineForm();

  checkAuthHeader(assertAuthenticatedHeader);
};

export default submitAnswersFromExporterLocationHappyPath;

import completeAndSubmitBuyerCountryForm from '../forms';

/**
 * completeAndSubmitAllInsuranceEligibilityAnswers
 * completes and submits insurance eligibility answers until the check your answers page
 */
const completeAndSubmitAllInsuranceEligibilityAnswers = () => {
  cy.completeStartForm();
  cy.completeCheckIfEligibleForm();
  cy.completeExporterLocationForm();
  cy.completeCompaniesHouseNumberForm();
  cy.completeAndSubmitCompaniesHouseSearchForm({});
  cy.completeEligibilityCompanyDetailsForm();
  completeAndSubmitBuyerCountryForm({});
  cy.completeAndSubmitTotalValueInsuredForm({});
  cy.completeCoverPeriodForm({});
  cy.completeUkGoodsAndServicesForm();
  cy.completeEndBuyerForm();
};

export default completeAndSubmitAllInsuranceEligibilityAnswers;

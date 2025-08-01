import { COMPANIES_HOUSE_NUMBER } from '../../constants/examples';

/**
 * completeAndSubmitAllInsuranceEligibilityAnswers
 * completes and submits insurance eligibility answers until the check your answers page
 * @param {string} companyNumber: companies house number - defaults to COMPANIES_HOUSE_NUMBER
 */
const completeAndSubmitAllInsuranceEligibilityAnswers = ({ companyNumber = COMPANIES_HOUSE_NUMBER }) => {
  cy.navigateToCheckIfEligibleUrl();

  cy.completeCheckIfEligibleForm();
  cy.completeExporterLocationForm();
  cy.completeCompaniesHouseNumberForm();
  cy.completeAndSubmitCompaniesHouseSearchForm({ companyNumber });
  cy.completeEligibilityCompanyDetailsForm();
  cy.completeAndSubmitBuyerCountryForm({});
  cy.completeAndSubmitTotalValueInsuredForm({});
  cy.completeCoverPeriodForm({});
  cy.completeUkGoodsAndServicesForm();
  cy.completeEndBuyerForm();
  cy.completePartyToConsortiumForm({});
  cy.completeMemberOfAGroupForm({});
};

export default completeAndSubmitAllInsuranceEligibilityAnswers;

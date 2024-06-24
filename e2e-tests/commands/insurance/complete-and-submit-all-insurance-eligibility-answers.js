import completeAndSubmitBuyerCountryForm from '../forms';
import { COMPANIES_HOUSE_NUMBER } from '../../constants/examples';

/**
 * completeAndSubmitAllInsuranceEligibilityAnswers
 * completes and submits insurance eligibility answers until the check your answers page
 */
const completeAndSubmitAllInsuranceEligibilityAnswers = ({ companyNumber = COMPANIES_HOUSE_NUMBER }) => {
  cy.completeStartForm();
  cy.completeCheckIfEligibleForm();
  cy.completeExporterLocationForm();
  cy.completeCompaniesHouseNumberForm();
  cy.completeAndSubmitCompaniesHouseSearchForm({ companyNumber });
  cy.completeEligibilityCompanyDetailsForm();
  completeAndSubmitBuyerCountryForm({});
  cy.completeAndSubmitTotalValueInsuredForm({});
  cy.completeCoverPeriodForm({});
  cy.completeUkGoodsAndServicesForm();
  cy.completeEndBuyerForm();
};

export default completeAndSubmitAllInsuranceEligibilityAnswers;

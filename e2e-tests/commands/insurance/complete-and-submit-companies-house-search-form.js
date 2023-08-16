import { companyDetails } from '../../pages/your-business';

/**
 * completeAndSubmitCompaniesHouseSearchForm
 * completes the companies house search form and presses the search button
 * @param {Object} companyHouseNumberVariables
 */
const completeAndSubmitCompaniesHouseSearchForm = ({ companiesHouseNumber }) => {
  cy.keyboardInput(companyDetails.companiesHouseSearch(), companiesHouseNumber);
  companyDetails.companiesHouseSearchButton().click();
};

export default completeAndSubmitCompaniesHouseSearchForm;

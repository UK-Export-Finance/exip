import { companiesHouseNumber } from '../../pages/your-business';
import { submitButton } from '../../pages/shared';
import { COMPANIES_HOUSE_NUMBER } from '../../constants';

/**
 * completeAndSubmitCompaniesHouseSearchForm
 * completes the companies house search form and presses the search button
 * @param {Object} companyHouseNumberVariables
 */
const completeAndSubmitCompaniesHouseSearchForm = ({ companiesHouseNumber: companiesHouseNumberValue = COMPANIES_HOUSE_NUMBER }) => {
  cy.keyboardInput(companiesHouseNumber.input(), companiesHouseNumberValue);
  submitButton().click();
};

export default completeAndSubmitCompaniesHouseSearchForm;

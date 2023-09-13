import { companiesHouseNumber } from '../../pages/your-business';
import { submitButton } from '../../pages/shared';
import { COMPANIES_HOUSE_NUMBER } from '../../constants';

/**
 * completeAndSubmitCompaniesHouseSearchForm
 * Complete and submit the companies house search form
 * @param {String} Application reference number
 * @param {String} Companies house number
 */
const completeAndSubmitCompaniesHouseSearchForm = ({ referenceNumber, companyNumber = COMPANIES_HOUSE_NUMBER }) => {
  cy.interceptCompaniesHousePost({ referenceNumber });

  cy.keyboardInput(companiesHouseNumber.input(), companyNumber);
  submitButton().click();
};

export default completeAndSubmitCompaniesHouseSearchForm;

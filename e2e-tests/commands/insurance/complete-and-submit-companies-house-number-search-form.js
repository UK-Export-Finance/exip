import { field, submitButton } from '../../pages/shared';
import { COMPANIES_HOUSE_NUMBER } from '../../constants';

/**
 * completeAndSubmitCompaniesHouseSearchForm
 * Complete and submit the companies house search form
 * @param {String} Application reference number
 * @param {String} Companies house number
 */
const completeAndSubmitCompaniesHouseSearchForm = ({ referenceNumber, companyNumber = COMPANIES_HOUSE_NUMBER }) => {
  cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });

  cy.keyboardInput(field(COMPANIES_HOUSE_NUMBER).input(), companyNumber);
  submitButton().click();
};

export default completeAndSubmitCompaniesHouseSearchForm;

import { field } from '../../pages/shared';
import { COMPANIES_HOUSE_NUMBER } from '../../constants/examples';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitCompaniesHouseSearchForm
 * Complete and submit the companies house search form
 * @param {String} Companies house number
 */
const completeAndSubmitCompaniesHouseSearchForm = ({ companyNumber = COMPANIES_HOUSE_NUMBER }) => {
  cy.interceptCompaniesHousePost({ companyNumber });

  cy.keyboardInput(field(FIELD_ID).input(), companyNumber);
  cy.clickSubmitButton();
};

export default completeAndSubmitCompaniesHouseSearchForm;

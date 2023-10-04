import { field, submitButton } from '../../pages/shared';
import { COMPANIES_HOUSE_NUMBER } from '../../constants/examples';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';

const {
  EXPORTER_BUSINESS: { COMPANIES_HOUSE_NUMBER: FIELD_ID },
} = INSURANCE_FIELD_IDS;

/**
 * completeAndSubmitCompaniesHouseSearchForm
 * Complete and submit the companies house search form
 * @param {String} Application reference number
 * @param {String} Companies house number
 */
const completeAndSubmitCompaniesHouseSearchForm = ({ referenceNumber, companyNumber = COMPANIES_HOUSE_NUMBER }) => {
  cy.interceptCompaniesHousePost({ referenceNumber, companyNumber });

  cy.keyboardInput(field(FIELD_ID).input(), companyNumber);
  submitButton().click();
};

export default completeAndSubmitCompaniesHouseSearchForm;

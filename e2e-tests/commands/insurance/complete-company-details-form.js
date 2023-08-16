import { companyDetails } from '../../pages/your-business';
import { FIELD_IDS } from '../../constants';

const {
  YOUR_COMPANY: {
    TRADING_NAME,
    TRADING_ADDRESS,
    WEBSITE,
    PHONE_NUMBER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;
/**
 * completeCompaniesDetailsForm
 * fills in the company details form
 * fills in optional fields if they are provided
 * does not submit the form
 * @param {Object} companyDetailsVariables - companiesHouseNumber, phoneNumber and website
 */
const completeCompaniesDetailsForm = ({ phoneNumber, website }) => {
  companyDetails[TRADING_NAME].yesRadioInput().click();
  companyDetails[TRADING_ADDRESS].yesRadioInput().click();

  if (phoneNumber) {
    cy.keyboardInput(companyDetails[PHONE_NUMBER].input(), phoneNumber);
  }

  if (website) {
    cy.keyboardInput(companyDetails[WEBSITE].input(), website);
  }
};

export default completeCompaniesDetailsForm;

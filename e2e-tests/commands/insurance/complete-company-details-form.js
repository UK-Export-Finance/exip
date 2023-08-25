import { companyDetails } from '../../pages/your-business';
import { FIELD_IDS } from '../../constants';
import { yesRadioInput } from '../../pages/shared';

const {
  YOUR_COMPANY: {
    WEBSITE,
    PHONE_NUMBER,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

/**
 * completeCompaniesDetailsForm
 * fills in the company details form
 * fills in optional fields if they are provided
 * does not submit the form
 * @param {Object} variables - phoneNumber and website
 */
const completeCompaniesDetailsForm = ({ phoneNumber, companyWebsite }) => {
  yesRadioInput().first().click();
  yesRadioInput().eq(1).click();

  if (phoneNumber) {
    cy.keyboardInput(companyDetails[PHONE_NUMBER].input(), phoneNumber);
  }

  if (companyWebsite) {
    cy.keyboardInput(companyDetails[WEBSITE].input(), companyWebsite);
  }
};

export default completeCompaniesDetailsForm;

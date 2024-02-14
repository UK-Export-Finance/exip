import { FIELD_IDS } from '../../constants';
import { field, yesRadio } from '../../pages/shared';

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
  yesRadio().label().first().click();
  yesRadio().label().eq(1).click();

  if (phoneNumber) {
    cy.keyboardInput(field(PHONE_NUMBER).input(), phoneNumber);
  }

  if (companyWebsite) {
    cy.keyboardInput(field(WEBSITE).input(), companyWebsite);
  }
};

export default completeCompaniesDetailsForm;

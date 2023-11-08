import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field, yesRadioInput, noRadioInput } from '../../pages/shared';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      WEBSITE,
      PHONE_NUMBER,
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeCompaniesDetailsForm
 * fills in the company details form
 * @param {Boolean} differentTradingAddress
 * @param {String} phoneNumber
 * @param {String} companyWebsite
 */
const completeCompaniesDetailsForm = ({
  differentTradingAddress = false,
  phoneNumber,
  companyWebsite,
}) => {
  yesRadioInput().first().click();

  if (differentTradingAddress) {
    yesRadioInput().eq(1).click();
  } else {
    noRadioInput().eq(1).click();
  }

  if (phoneNumber) {
    cy.keyboardInput(field(PHONE_NUMBER).input(), phoneNumber);
  }

  if (companyWebsite) {
    cy.keyboardInput(field(WEBSITE).input(), companyWebsite);
  }
};

export default completeCompaniesDetailsForm;

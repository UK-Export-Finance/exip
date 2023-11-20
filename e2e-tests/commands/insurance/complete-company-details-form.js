import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field, yesRadioInput, noRadioInput } from '../../pages/shared';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      WEBSITE,
      PHONE_NUMBER,
      ALTERNATIVE_TRADING_NAME,
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
  differentTradingName = false,
  differentTradingAddress = false,
  phoneNumber,
  companyWebsite,
}) => {
  if (differentTradingName) {
    yesRadioInput().first().click();
  } else {
    noRadioInput().first().click();
  }

  if (differentTradingName) {
    field(ALTERNATIVE_TRADING_NAME).input().type('test');
  }

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

import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field, yesRadioInput, noRadioInput } from '../../pages/shared';
import application from '../../fixtures/application';

const { YOUR_COMPANY } = application;

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      WEBSITE,
      PHONE_NUMBER,
      DIFFERENT_TRADING_NAME,
    },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeCompaniesDetailsForm
 * fills in the company details form
 * @param {Boolean} differentTradingName
 * @param {Boolean} differentTradingAddress
 * @param {String} phoneNumber
 * @param {String} companyWebsite
 * @param {Boolean} completeDifferentTradingName
 */
const completeCompaniesDetailsForm = ({
  differentTradingName = false,
  differentTradingAddress = false,
  phoneNumber,
  companyWebsite,
  completeDifferentTradingName = true,
}) => {
  if (differentTradingName) {
    yesRadioInput().first().click();
  } else {
    noRadioInput().first().click();
  }

  if (differentTradingName && completeDifferentTradingName) {
    cy.keyboardInput(field(DIFFERENT_TRADING_NAME).input(), YOUR_COMPANY[DIFFERENT_TRADING_NAME]);
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

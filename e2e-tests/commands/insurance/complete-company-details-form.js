import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field } from '../../pages/shared';
import application from '../../fixtures/application';

const { YOUR_COMPANY } = application;

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { WEBSITE, PHONE_NUMBER, DIFFERENT_TRADING_NAME },
  },
} = INSURANCE_FIELD_IDS;

/**
 * completeCompaniesDetailsForm
 * fills in the company details form
 * @param {boolean} differentTradingName
 * @param {boolean} differentTradingAddress
 * @param {string} phoneNumber
 * @param {string} companyWebsite
 * @param {boolean} completeDifferentTradingName
 */
const completeCompaniesDetailsForm = ({
  differentTradingName = false,
  differentTradingAddress = false,
  phoneNumber,
  companyWebsite,
  completeDifferentTradingName = true,
}) => {
  if (differentTradingName) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }

  if (differentTradingName && completeDifferentTradingName) {
    cy.keyboardInput(field(DIFFERENT_TRADING_NAME).input(), YOUR_COMPANY[DIFFERENT_TRADING_NAME]);
  }

  if (differentTradingAddress) {
    cy.clickYesRadioInput(1);
  } else {
    cy.clickNoRadioInput(1);
  }

  if (phoneNumber) {
    cy.keyboardInput(field(PHONE_NUMBER).input(), phoneNumber);
  }

  if (companyWebsite) {
    cy.keyboardInput(field(WEBSITE).input(), companyWebsite);
  }
};

export default completeCompaniesDetailsForm;

import { field } from '../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import mockApplication from '../../../fixtures/application';

const {
  BROKER_DETAILS: { NAME, EMAIL, POSTCODE, BUILDING_NUMBER_OR_NAME },
} = POLICY_FIELD_IDS;

/**
 * assertBrokerDetailsFieldValues
 * Assert all field values in the "broker details" form.
 * @param {string} expectedName: Name
 * @param {string} expectedEmail: Email
 * @param {boolean} isBasedInUk: Broker is based in the UK
 * @param {string} expectedPostcode: Broker's postcode
 * @param {string} expectedBuildingNumberOrName: Broker's building name or number
 */
const assertBrokerDetailsFieldValues = ({
  expectedName = mockApplication.BROKER[NAME],
  expectedEmail = mockApplication.BROKER[EMAIL],
  isBasedInUk = false,
  expectedPostcode = mockApplication.BROKER[POSTCODE],
  expectedBuildingNumberOrName = mockApplication.BROKER[BUILDING_NUMBER_OR_NAME],
}) => {
  cy.checkValue(field(NAME), expectedName);
  cy.checkValue(field(EMAIL), expectedEmail);

  if (isBasedInUk) {
    cy.assertYesRadioOptionIsChecked();
    cy.assertNoRadioOptionIsNotChecked();

    cy.checkValue(field(POSTCODE), expectedPostcode);
    cy.checkValue(field(BUILDING_NUMBER_OR_NAME), expectedBuildingNumberOrName);
  } else {
    cy.assertNoRadioOptionIsChecked();
    cy.assertYesRadioOptionIsNotChecked();
  }
};

export default assertBrokerDetailsFieldValues;

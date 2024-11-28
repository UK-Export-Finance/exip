import { field } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import mockApplication from '../../fixtures/application';

const { BROKER } = mockApplication;

const {
  BROKER_DETAILS: { NAME, POSTCODE, BUILDING_NUMBER_OR_NAME },
} = POLICY_FIELD_IDS;

const { EMAIL } = ACCOUNT_FIELD_IDS;

/**
 * completeBrokerDetailsForm
 * Complete and submit "broker details" form
 * @param {String} name: Broker name
 * @param {String} email: Broker email
 * @param {String} fullAddress: Broker's full address
 * @param {Boolean} isBasedInUk: Broker is based in the UK
 * @param {String} postcode: Broker's postcode
 * @param {String} buildingNumberOrName: Broker's building name or number
 */
const completeBrokerDetailsForm = ({
  name = BROKER[NAME],
  email = BROKER[EMAIL],
  // TODO: EMS-3974 - make this have a true default
  isBasedInUk = false,
  postcode = BROKER[POSTCODE],
  buildingNumberOrName = BROKER[BUILDING_NUMBER_OR_NAME],
}) => {
  cy.keyboardInput(field(NAME).input(), name);
  cy.keyboardInput(field(EMAIL).input(), email);

  if (isBasedInUk) {
    cy.clickYesRadioInput();

    cy.keyboardInput(field(POSTCODE).input(), postcode);
    cy.keyboardInput(field(BUILDING_NUMBER_OR_NAME).input(), buildingNumberOrName);
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeBrokerDetailsForm;

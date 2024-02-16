import { field } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import mockApplication from '../../fixtures/application';

const { BROKER } = mockApplication;

const {
  BROKER_DETAILS: { NAME, EMAIL, FULL_ADDRESS },
} = POLICY_FIELD_IDS;

/**
 * completeBrokerDetailsForm
 * Complete and submit "broker details" form
 * @param {String} name: Broker name
 * @param {String} email: Broker email
 * @param {String} fullAddress: Broker's full address
 */
const completeBrokerDetailsForm = ({
  name = BROKER[NAME],
  email = BROKER[EMAIL],
  fullAddress = BROKER[FULL_ADDRESS],
}) => {
  cy.keyboardInput(field(NAME).input(), name);
  cy.keyboardInput(field(EMAIL).input(), email);
  cy.keyboardInput(field(FULL_ADDRESS).textarea(), fullAddress);
};

export default completeBrokerDetailsForm;

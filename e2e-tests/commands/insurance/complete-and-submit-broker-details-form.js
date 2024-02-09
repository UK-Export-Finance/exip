import { field } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import mockApplication from '../../fixtures/application';

const { BROKER } = mockApplication;

const {
  BROKER_DETAILS: { NAME, EMAIL, FULL_ADDRESS },
} = POLICY_FIELD_IDS;

/**
 * completeAndSubmitBrokerDetailsForm
 * Complete and submit "broker details" form
 */
const completeAndSubmitBrokerDetailsForm = () => {
  cy.keyboardInput(field(NAME).input(), BROKER[NAME]);
  cy.keyboardInput(field(EMAIL).input(), BROKER[EMAIL]);
  cy.keyboardInput(field(FULL_ADDRESS).textarea(), BROKER[FULL_ADDRESS]);

  cy.clickSubmitButton();
};

export default completeAndSubmitBrokerDetailsForm;

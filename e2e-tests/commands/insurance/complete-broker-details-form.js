import { field } from '../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import mockApplication from '../../fixtures/application';

const { BROKER } = mockApplication;

const {
  BROKER_DETAILS: { NAME },
} = POLICY_FIELD_IDS;

const { EMAIL } = ACCOUNT_FIELD_IDS;

/**
 * completeBrokerDetailsForm
 * Complete and submit "broker details" form
 * @param {String} name: Broker name
 * @param {String} email: Broker email
 */
const completeBrokerDetailsForm = ({ name = BROKER[NAME], email = BROKER[EMAIL] }) => {
  cy.keyboardInput(field(NAME).input(), name);
  cy.keyboardInput(field(EMAIL).input(), email);
};

export default completeBrokerDetailsForm;

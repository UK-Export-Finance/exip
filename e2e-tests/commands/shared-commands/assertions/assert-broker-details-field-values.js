import { field } from '../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import mockApplication from '../../../fixtures/application';

const {
  BROKER_DETAILS: { NAME, EMAIL },
} = POLICY_FIELD_IDS;

/**
 * assertBrokerDetailsFieldValues
 * Assert all field values in the "broker details" form.
 * @param {String} expectedName: Name
 * @param {String} expectedEmail: Email
 */
const assertBrokerDetailsFieldValues = ({ expectedName = mockApplication.BROKER[NAME], expectedEmail = mockApplication.BROKER[EMAIL] }) => {
  cy.checkValue(field(NAME), expectedName);
  cy.checkValue(field(EMAIL), expectedEmail);
};

export default assertBrokerDetailsFieldValues;

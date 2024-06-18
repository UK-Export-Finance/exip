import { field as fieldSelector } from '../../../pages/shared';
import { EXPECTED_MULTI_LINE_STRING } from '../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import mockApplication from '../../../fixtures/application';

const {
  BROKER_DETAILS: {
    NAME,
    EMAIL,
    FULL_ADDRESS,
  },
} = POLICY_FIELD_IDS;

/**
 * assertBrokerDetailsFieldValues
 * Assert all field values in the "broker details" form.
 * @param {String} expectedName: Name
 * @param {String} expectedEmail: Email
 * @param {String} expectedFullAddress: Full address
 */
const assertBrokerDetailsFieldValues = ({
  expectedName = mockApplication.BROKER[NAME],
  expectedEmail = mockApplication.BROKER[EMAIL],
  expectedFullAddress = EXPECTED_MULTI_LINE_STRING,
}) => {
  cy.checkValue(fieldSelector(NAME), expectedName);
  cy.checkValue(fieldSelector(EMAIL), expectedEmail);

  cy.checkTextareaValue({
    fieldId: FULL_ADDRESS,
    expectedValue: expectedFullAddress,
  });
};

export default assertBrokerDetailsFieldValues;

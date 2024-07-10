import { field as fieldSelector } from '../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  POLICY: {
    DIFFERENT_NAME_ON_POLICY: {
      POSITION,
    },
  },
  ACCOUNT: {
    FIRST_NAME, LAST_NAME, EMAIL,
  },
} = INSURANCE_FIELD_IDS;

/**
 * assertDifferentNameOnPolicyFieldValues
 * Assert all field values in the "different name on policy" form.
 * @param {String} expectedFirstName: First name
 * @param {String} expectedLastName: Last name
 * @param {String} expectedEmail: Email
 * @param {String} expectedPosition: Position
 */
const assertDifferentNameOnPolicyFieldValues = ({
  expectedFirstName = '',
  expectedLastName = '',
  expectedEmail = '',
  expectedPosition = '',
}) => {
  cy.checkValue(fieldSelector(FIRST_NAME), expectedFirstName);
  cy.checkValue(fieldSelector(LAST_NAME), expectedLastName);
  cy.checkValue(fieldSelector(EMAIL), expectedEmail);
  cy.checkValue(fieldSelector(POSITION), expectedPosition);
};

export default assertDifferentNameOnPolicyFieldValues;

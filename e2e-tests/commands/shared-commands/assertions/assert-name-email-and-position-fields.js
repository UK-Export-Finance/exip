import { field } from '../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';

const {
  POLICY: {
    DIFFERENT_NAME_ON_POLICY: { POSITION },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

/**
 * assertNameEmailAndPositionFields
 * Asserts FIRST_NAME, LAST_NAME, EMAIL and POSITION fields' values.
 * @param {String} expectedFirstName: First name
 * @param {String} expectedLastName: Last name
 * @param {String} expectedEmail: Email address
 * @param {String} expectedPosition: Position
 */
const assertNameEmailAndPositionFields = ({ expectedFirstName, expectedLastName, expectedEmail, expectedPosition }) => {
  cy.checkValue(field(FIRST_NAME), expectedFirstName);
  cy.checkValue(field(LAST_NAME), expectedLastName);
  cy.checkValue(field(EMAIL), expectedEmail);
  cy.checkValue(field(POSITION), expectedPosition);
};

export default assertNameEmailAndPositionFields;

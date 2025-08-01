import { field } from '../../../pages/shared';

/**
 * assertEmptyFieldValue
 * Assert that a field value is empty.
 * @param {string} fieldId: Field ID
 */
const assertEmptyFieldValue = (fieldId) => {
  cy.checkValue(field(fieldId), '');
};

export default assertEmptyFieldValue;

import { field } from '../../../pages/shared';

/**
 * assertEmptyTextareaFieldValue
 * Assert that a textarea field value is empty.
 * @param {String} fieldId: Field ID
 */
const assertEmptyTextareaFieldValue = (fieldId) => {
  cy.checkValue(field(fieldId).textarea(), '');
};

export default assertEmptyTextareaFieldValue;

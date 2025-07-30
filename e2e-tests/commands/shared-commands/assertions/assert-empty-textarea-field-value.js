import { field } from '../../../pages/shared';

/**
 * assertEmptyTextareaFieldValue
 * Assert that a textarea field value is empty.
 * @param {string} fieldId: Field ID
 */
const assertEmptyTextareaFieldValue = (fieldId) => {
  field(fieldId).textarea().should('have.value', '');
};

export default assertEmptyTextareaFieldValue;

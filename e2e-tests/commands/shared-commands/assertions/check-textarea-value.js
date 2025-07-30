import { field as fieldSelector } from '../../../pages/shared';

/**
 * checkTextareaValue
 * Check a textarea's value
 * @param {number} fieldId: Field ID
 * @param {string} expectedValue: Expected value
 */
const checkTextareaValue = ({ fieldId, expectedValue }) => {
  const field = fieldSelector(fieldId);

  const textareaField = {
    ...field,
    input: field.textarea,
  };

  cy.checkValue(textareaField, expectedValue);
};

export default checkTextareaValue;

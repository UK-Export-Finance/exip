import { submitButton } from '../../../pages/shared';
/**
 * changes input for select inputs
 * @param {Object} fieldVariables
 * @param {Function} input cypress input selector
 */
const changeAnswerSelectField = (fieldVariables, input) => {
  const { newValueInput } = fieldVariables;

  input.select(newValueInput);

  submitButton().click();
};

export default changeAnswerSelectField;

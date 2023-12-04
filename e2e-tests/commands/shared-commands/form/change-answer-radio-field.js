import { radios, submitButton } from '../../../pages/shared';
/**
 * changes radio input/option
 * @param {Object} fieldVariables
 * @param {Function} input cypress input selector
 */
const changeAnswerRadioField = (fieldVariables) => {
  const { fieldId, newValueInput } = fieldVariables;

  radios(fieldId, newValueInput).option.input().click();

  submitButton().click();
};

export default changeAnswerRadioField;

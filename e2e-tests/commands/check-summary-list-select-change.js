import { submitButton } from '../pages/shared';
import { checkChangeLinkUrl, checkChangeAnswerRendered } from './check-summary-list-field-change';

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

export {
  checkChangeLinkUrl,
  changeAnswerSelectField,
  checkChangeAnswerRendered,
};

import { radios } from '../../../pages/shared';
/**
 * changes radio input/option
 * @param {Object} fieldVariables
 */
const changeAnswerRadioField = (fieldVariables) => {
  const { fieldId, newValueInput } = fieldVariables;

  radios(fieldId, newValueInput).option.input().click();

  cy.clickSubmitButton();
};

export default changeAnswerRadioField;

import { radios } from '../../../pages/shared';
/**
 * changes radio input/option
 * @param {object} fieldVariables
 */
const changeAnswerRadioField = (fieldVariables) => {
  const { fieldId, newValueInput } = fieldVariables;

  radios(fieldId, newValueInput).option.label().click();

  cy.clickSubmitButton();
};

export default changeAnswerRadioField;

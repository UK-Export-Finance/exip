import { autoCompleteField } from '../pages/shared';

/**
 * autocompleteKeyboardInput
 * Type text into an autocomplete input.
 * For example, country or currency autocomplete fields.
 * @param {string} fieldId: Autocomplete field ID
 * @param {string} text: Text to enter
 */
const autocompleteKeyboardInput = (fieldId, text) => {
  const autocompleteField = autoCompleteField(fieldId);

  cy.keyboardInput(autocompleteField.input(), text);

  const results = autocompleteField.results();
  results.first().click();
};

export default autocompleteKeyboardInput;

import { countryInput } from '../pages/shared';

/**
 * autocompleteKeyboardInput
 * Type text into an autocomplete input.
 * For example, country or currency autocomplete fields.
 * @param {String} fieldId: Autocomplete field ID
 * @param {String} text: Text to enter
 */
const autocompleteKeyboardInput = (fieldId, text) => {
  const autocompleteField = countryInput.field(fieldId);

  cy.keyboardInput(autocompleteField.input(), text);

  const results = autocompleteField.results();
  results.first().click();
};

export default autocompleteKeyboardInput;

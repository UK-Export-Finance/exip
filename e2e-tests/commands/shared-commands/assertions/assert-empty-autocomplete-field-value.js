import { autoCompleteField } from '../../../pages/shared';

/**
 * assertEmptyAutocompleteFieldValue
 * Assert that an autocomplete field value is empty.
 * @param {String} fieldId: Field ID
 */
const assertEmptyAutocompleteFieldValue = (fieldId) => {
  cy.checkValue(autoCompleteField(fieldId), '');
};

export default assertEmptyAutocompleteFieldValue;
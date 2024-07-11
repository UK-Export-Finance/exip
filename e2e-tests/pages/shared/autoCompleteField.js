import fieldSelector from './field';

/**
 * autoCompleteField
 * "Autocomplete" cypress selector.
 * This field is used for any autocomplete fields, e.g country and currency fields.
 * @param {String} fieldId: Field ID
 * @returns {Object} Autocomplete field selectors with bespoke input, result and noResults selectors.
 */
const autoCompleteField = (fieldId) => ({
  ...fieldSelector(fieldId),
  input: () => cy.get(`#${fieldId}`),
  results: () => cy.get(`#${fieldId} + ul li`),
  noResults: () => cy.get('.autocomplete__option--no-results'),
});

export default autoCompleteField;

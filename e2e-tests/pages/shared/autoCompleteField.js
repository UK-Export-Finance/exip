import fieldSelector from './field';

/**
 * autoCompleteField
 * "Autocomplete" cypress selector.
 * This field is used for any autocomplete fields, e.g country and currency fields.
 * @param {String} fieldId: Field ID
 * @returns 
 */
const autoCompleteField = (fieldId) => ({
  ...fieldSelector(fieldId),
  input: () => cy.get(`#${fieldId}`),
  results: () => cy.get(`#${fieldId} + ul li`),
  noResults: () => cy.get('.autocomplete__option--no-results'),
});

export default autoCompleteField;

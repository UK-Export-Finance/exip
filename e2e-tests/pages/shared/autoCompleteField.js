import fieldSelector from './field';

const autoCompleteField = (fieldId) => ({
  ...fieldSelector(fieldId),
  input: () => cy.get(`#${fieldId}`),
  results: () => cy.get(`#${fieldId} + ul li`),
  noResults: () => cy.get('.autocomplete__option--no-results'),
});

export default autoCompleteField;

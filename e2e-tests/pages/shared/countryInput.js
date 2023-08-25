const countryInput = {
  field: (fieldId) => ({
    label: () => cy.get(`[data-cy="${fieldId}-label"]`),
    hint: () => cy.get(`[data-cy="${fieldId}-hint"]`),
    input: () => cy.get(`#${fieldId}`),
    results: () => cy.get(`#${fieldId} + ul li`),
    noResults: () => cy.get('.autocomplete__option--no-results'),
    errorMessage: () => cy.get(`[data-cy="${fieldId}-error-message"]`),
  }),
};

export default countryInput;

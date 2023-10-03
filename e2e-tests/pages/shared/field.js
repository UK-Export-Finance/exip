const field = (id) => ({
  label: () => cy.get(`[data-cy="${id}-label"]`),
  hint: () => cy.get(`[data-cy="${id}-hint"]`),
  input: () => cy.get(`[data-cy="${id}-input"]`),
  errorMessage: () => cy.get(`[data-cy="${id}-error-message"]`),
});

export default field;

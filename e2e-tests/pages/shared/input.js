const input = {
  field: (field) => ({
    label: () => cy.get(`[data-cy="${field}-label"]`),
    hint: () => cy.get(`[data-cy="${field}-hint"]`),
    input: () => cy.get(`[data-cy="${field}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${field}-error-message"]`),
  }),
};

export default input;

const feedbackPage = {
  field: (fieldId) => ({
    heading: () => cy.get(`[data-cy="${fieldId}-heading"]`),
    label: () => cy.get(`[data-cy="${fieldId}-label"]`),
    hint: () => cy.get(`[data-cy="${fieldId}-hint"]`),
    input: () => cy.get(`[data-cy="${fieldId}"]`),
    errorMessage: () => cy.get(`[data-cy="${fieldId}-error-message"]`),
  }),
};

export default feedbackPage;

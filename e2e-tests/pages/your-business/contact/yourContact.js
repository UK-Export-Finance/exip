const yourContactPage = {
  contactDetailsLegend: () => cy.get('[data-cy="contact-details-legend"]'),
  contactDetailsHint: () => cy.get('[data-cy="contact-details-hint"]'),
  field: (field) => ({
    label: () => cy.get(`[data-cy="${field}-label"]`),
    hint: () => cy.get(`[data-cy="${field}-hint"]`),
    input: () => cy.get(`[data-cy="${field}-input"]`),
    details: () => cy.get(`[data-cy="${field}"]`),
    errorMessage: () => cy.get(`[data-cy="${field}-error-message"]`),
  }),
};

export default yourContactPage;

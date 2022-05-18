const partials = {
  backLink: () => cy.get('[data-cy="back-link"]'),
  errorSummaryListItems: () => cy.get('.govuk-error-summary li'),
};

export default partials;

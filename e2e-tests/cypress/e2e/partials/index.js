import footer from './footer';

const partials = {
  backLink: () => cy.get('[data-cy="back-link"]'),
  errorSummaryListItems: () => cy.get('.govuk-error-summary li'),
  errorSummaryListItemLinks: () => cy.get('.govuk-error-summary li a'),
  footer,
};

export default partials;

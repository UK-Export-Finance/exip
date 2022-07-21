import footer from './footer';

const partials = {
  backLink: () => cy.get('[data-cy="back-link"]'),
  errorSummaryListItems: () => cy.get('.govuk-error-summary li'),
  errorSummaryListItemLinks: () => cy.get('.govuk-error-summary li a'),
  phaseBanner: {
    tag: () => cy.get('.govuk-phase-banner__content__tag'),
    text: () => cy.get('[data-cy="phase-banner-text"]'),
    feedbackLink: () => cy.get('[data-cy="phase-banner-feedback-link"]'),
  },
  footer,
};

export default partials;

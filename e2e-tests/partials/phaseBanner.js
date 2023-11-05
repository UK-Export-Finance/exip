const phaseBanner = {
  tag: () => cy.get('.govuk-phase-banner__content__tag'),
  text: () => cy.get('[data-cy="phase-banner-text"]'),
  feedbackLink: () => cy.get('[data-cy="phase-banner-feedback-link"]'),
};

export default phaseBanner;

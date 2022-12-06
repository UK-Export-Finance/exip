import cookieBanner from './cookieBanner';
import footer from './footer';
import phaseBanner from './phaseBanner';

const partials = {
  backLink: () => cy.get('[data-cy="back-link"]'),
  cookieBanner,
  errorSummaryListItems: () => cy.get('.govuk-error-summary li'),
  errorSummaryListItemLinks: () => cy.get('.govuk-error-summary li a'),
  footer,
  phaseBanner,
  skipLink: () => cy.get('[data-cy="skip-link"]'),
};

export default partials;

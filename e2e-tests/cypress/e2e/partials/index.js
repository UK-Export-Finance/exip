import cookieBanner from './cookieBanner';
import footer from './footer';
import phaseBanner from './phaseBanner';
import ukGoodsOrServicesDescription from './ukGoodsAndServicesDescription';

const partials = {
  backLink: () => cy.get('[data-cy="back-link"]'),
  cookieBanner,
  errorSummaryListItems: () => cy.get('.govuk-error-summary li'),
  errorSummaryListItemLinks: () => cy.get('.govuk-error-summary li a'),
  footer,
  skipLink: () => cy.get('[data-cy="skip-link"]'),
  phaseBanner,
  ukGoodsOrServicesDescription,
};

export default partials;

import cookieBanner from './cookieBanner';
import footer from './footer';
import header from './header';
import insurance from './insurance';
import phaseBanner from './phaseBanner';
import ukGoodsOrServicesCalculateDescription from './ukGoodsOrServicesCalculateDescription';
import ukGoodsOrServicesDescription from './ukGoodsAndServicesDescription';

const partials = {
  backLink: () => cy.get('[data-cy="back-link"]'),
  ukGoodsOrServicesCalculateDescription,
  cookieBanner,
  errorSummaryListItems: () => cy.get('.govuk-error-summary li'),
  errorSummaryListItemLinks: () => cy.get('.govuk-error-summary li a'),
  footer,
  header,
  insurance,
  skipLink: () => cy.get('[data-cy="skip-link"]'),
  phaseBanner,
  ukGoodsOrServicesDescription,
};

export default partials;

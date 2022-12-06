import cookieBanner from './cookieBanner';
import footer from './footer';
import header from './header';
import insurancePartials from './insurance';
import phaseBanner from './phaseBanner';
import ukGoodsOrServicesCalculateDescription from './ukGoodsOrServicesCalculateDescription';
import ukGoodsOrServicesDescription from './ukGoodsAndServicesDescription';
import yourBusinessSummaryList from './yourBusinessSummaryList';

const partials = {
  backLink: () => cy.get('[data-cy="back-link"]'),
  ukGoodsOrServicesCalculateDescription,
  cookieBanner,
  errorSummaryListItems: () => cy.get('.govuk-error-summary li'),
  errorSummaryListItemLinks: () => cy.get('.govuk-error-summary li a'),
  footer,
  header,
  insurancePartials,
  skipLink: () => cy.get('[data-cy="skip-link"]'),
  phaseBanner,
  ukGoodsOrServicesDescription,
  yourBusinessSummaryList,
};

export default partials;

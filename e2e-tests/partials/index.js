import cookieBanner from './cookieBanner';
import customerServiceContactDetails from './customerServiceContactDetails';
import footer from './footer';
import header from './header';
import insurancePartials from './insurance';
import phaseBanner from './phaseBanner';
import ukGoodsOrServicesCalculateDescription from './ukGoodsOrServicesCalculateDescription';
import ukGoodsOrServicesDescription from './ukGoodsAndServicesDescription';
import yourBusinessSummaryList from './yourBusinessSummaryList';

const partials = {
  ukGoodsOrServicesCalculateDescription,
  cookieBanner,
  customerServiceContactDetails,
  errorSummaryListHeading: () => cy.get('.govuk-error-summary h2'),
  errorSummaryListItems: () => cy.get('.govuk-error-summary li'),
  errorSummaryListItemLinks: () => cy.get('.govuk-error-summary li a'),
  footer,
  header,
  headingCaption: () => cy.get('[data-cy="heading-caption'),
  insurancePartials,
  skipLink: () => cy.get('[data-cy="skip-link"]'),
  phaseBanner,
  ukGoodsOrServicesDescription,
  yourBusinessSummaryList,
};

export default partials;

import creditPeriodWithBuyer from './creditPeriodWithBuyer';
import cookieBanner from './cookieBanner';
import customerServiceContactDetails from './customerServiceContactDetails';
import footer from './footer';
import header from './header';
import insurancePartials from './insurance';
import pagination from './pagination';
import phaseBanner from './phaseBanner';
import privateMarketWhyDescription from './privateMarketWhyDescription';
import ukGoodsOrServicesCalculateDescription from './ukGoodsOrServicesCalculateDescription';
import ukGoodsOrServicesDescription from './ukGoodsAndServicesDescription';

const partials = {
  cookieBanner,
  creditPeriodWithBuyer,
  customerServiceContactDetails,
  errorSummaryListHeading: () => cy.get('.govuk-error-summary h2'),
  errorSummaryListItems: () => cy.get('.govuk-error-summary li'),
  errorSummaryListItemLinks: () => cy.get('.govuk-error-summary li a'),
  footer,
  header,
  headingCaption: () => cy.get('[data-cy="heading-caption'),
  insurancePartials,
  html: (id) => cy.get(`[data-cy="${id}-html"]`),
  pagination,
  phaseBanner,
  provideAlternativeCurrencyLink: () => cy.get('[data-cy="provide-alternative-currency-link"]'),
  privateMarketWhyDescription,
  skipLink: () => cy.get('[data-cy="skip-link"]'),
  ukGoodsOrServicesCalculateDescription,
  ukGoodsOrServicesDescription,
};

export default partials;

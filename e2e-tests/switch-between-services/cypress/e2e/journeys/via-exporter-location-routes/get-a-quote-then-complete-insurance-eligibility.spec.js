import { ROUTES } from '../../../../../constants';

const {
  QUOTE: { BUYER_COUNTRY, TYPE_OF_BUYER, YOUR_QUOTE },
  INSURANCE: { ELIGIBILITY },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Get a quote, complete insurance eligibility and then re-visit the quote tool - all by visiting the buyer country form instead of via `start now` route',
  () => {
    const url = `${baseUrl}${YOUR_QUOTE}`;

    before(() => {
      cy.navigateToUrl(BUYER_COUNTRY);

      cy.submitQuoteAnswersHappyPathSinglePolicy({});
      cy.clickSubmitButton();

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it('allows an exporter to complete insurance eligibility when visiting the exporter location page directly', () => {
      cy.navigateToUrl(ELIGIBILITY.EXPORTER_LOCATION);

      cy.submitInsuranceEligibilityAnswersFromExporterLocationHappyPath({});
    });

    it('allows an exporter to get another quote when visiting the buyer country page directly', () => {
      cy.navigateToUrl(BUYER_COUNTRY);

      cy.completeAndSubmitBuyerCountryForm({});

      const expectedUrl = `${baseUrl}${TYPE_OF_BUYER}`;

      cy.assertUrl(expectedUrl);
    });
  },
);

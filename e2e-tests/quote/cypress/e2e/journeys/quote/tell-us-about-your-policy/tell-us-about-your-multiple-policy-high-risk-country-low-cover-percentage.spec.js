import { field as fieldSelector } from '../../../../../../pages/shared';

import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { GBP } from '../../../../../../fixtures/currencies';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';

const {
  ELIGIBILITY: { CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER, CREDIT_PERIOD },
} = FIELD_IDS;

const {
  QUOTE: { TELL_US_ABOUT_YOUR_POLICY, CHECK_YOUR_ANSWERS },
} = ROUTES;

const { HIGH_RISK_COUNTRY_1 } = COUNTRY_QUOTE_SUPPORT;

const baseUrl = Cypress.config('baseUrl');

context('Submit the "tell us about your single policy" form with low cover percentage of 90% and a high risk country', () => {
  const url = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}`;

  before(() => {
    cy.navigateToRootUrl();

    cy.completeAndSubmitBuyerCountryForm({ countryName: HIGH_RISK_COUNTRY_1.NAME });
    cy.completeAndSubmitBuyerBodyForm();
    cy.completeAndSubmitExporterLocationForm();
    cy.completeAndSubmitUkContentForm();
    cy.completeAndSubmitPolicyTypeMultiForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('when form is valid', () => {
    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(MAX_AMOUNT_OWED).input(), '100');
      fieldSelector(CURRENCY).input().select(GBP.isoCode);
      fieldSelector(PERCENTAGE_OF_COVER).input().select('90');
      fieldSelector(CREDIT_PERIOD).input().select('1');

      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(expectedUrl);
    });
  });
});

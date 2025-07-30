import { field as fieldSelector } from '../../../../../../pages/shared';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { GBP } from '../../../../../../fixtures/currencies';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';

const {
  ELIGIBILITY: { CURRENCY, CONTRACT_VALUE, PERCENTAGE_OF_COVER },
  POLICY_LENGTH,
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
    cy.completeAndSubmitPolicyTypeSingleForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('when form is valid', () => {
    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(POLICY_LENGTH).input(), 1);
      cy.keyboardInput(fieldSelector(CONTRACT_VALUE).input(), 100);
      fieldSelector(CURRENCY).input().select(GBP.isoCode);
      fieldSelector(PERCENTAGE_OF_COVER).input().select('90');

      cy.clickSubmitButton();

      const expectedUrl = `${baseUrl}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(expectedUrl);
    });
  });
});

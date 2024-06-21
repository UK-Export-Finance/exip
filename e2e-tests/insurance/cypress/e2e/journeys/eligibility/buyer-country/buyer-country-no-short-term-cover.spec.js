import { autoCompleteField } from '../../../../../../pages/shared';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';

const {
  START,
  ELIGIBILITY: { CONTRACT_TOO_SHORT },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const COUNTRY_NAME = COUNTRY_APPLICATION_SUPPORT.NO_SHORT_TERM_COVER.NAME;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Buyer country page - As an exporter, I want to check if UKEF offer credit insurance policy for where my buyer is based - submit no short term country cover',
  () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(START);

      cy.completeStartForm();
      cy.completeCheckIfEligibleForm();
      cy.completeExporterLocationForm();
      cy.completeCompaniesHouseNumberForm();
      cy.completeAndSubmitCompaniesHouseSearchForm({});
      cy.completeEligibilityCompanyDetailsForm();

      cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME);

      const results = autoCompleteField(FIELD_ID).results();
      results.first().click();

      cy.clickSubmitButton();
    });

    it('redirects to `cannot apply` exit page', () => {
      const expectedUrl = `${baseUrl}${CONTRACT_TOO_SHORT}`;

      cy.assertUrl(expectedUrl);
    });
  },
);

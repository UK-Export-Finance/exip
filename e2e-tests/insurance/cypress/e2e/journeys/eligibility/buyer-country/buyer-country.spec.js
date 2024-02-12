import { countryInput } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { FIELD_IDS } from '../../../../../../constants';
import { PAGES } from '../../../../../../content-strings';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../../../fixtures/countries';
import { assertCountryAutocompleteInput } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.BUYER_COUNTRY;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY, COMPANY_DETAILS, TOTAL_VALUE_INSURED },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const COUNTRY_NAME = COUNTRY_APPLICATION_SUPPORT.ONLINE.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Buyer country page - as an exporter, I want to check if UKEF offer credit insurance policy for where my buyer is based', () => {
  beforeEach(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();

    const expectedUrl = `${baseUrl}${BUYER_COUNTRY}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: BUYER_COUNTRY,
      backLink: COMPANY_DETAILS,
      assertAuthenticatedHeader: false,
      lightHouseThresholds: {
        performance: 70,
      },
    });
  });

  it('renders a hint', () => {
    cy.checkBuyerCountryInputHint();
  });

  describe('searchable autocomplete input', () => {
    assertCountryAutocompleteInput({ fieldId: FIELD_ID });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.clickSubmitButton();
      });

      it('should render validation errors', () => {
        cy.checkBuyerCountryValidationErrors();
      });

      it('should focus on input when clicking summary error message', () => {
        cy.checkBuyerCountryFocusAfterSummaryErrorClick();
      });
    });

    describe('when submitting with a supported country', () => {
      beforeEach(() => {
        cy.keyboardInput(countryInput.field(FIELD_ID).input(), COUNTRY_NAME);

        const results = countryInput.field(FIELD_ID).results();
        results.first().click();

        cy.clickSubmitButton();
      });

      it(`should redirect to ${TOTAL_VALUE_INSURED}`, () => {
        const expectedUrl = `${baseUrl}${TOTAL_VALUE_INSURED}`;

        cy.assertUrl(expectedUrl);
      });

      it('should prepopulate the field when going back to the page via back link', () => {
        cy.clickBackLink();

        const expectedValue = COUNTRY_NAME;

        cy.checkValue(countryInput.field(FIELD_ID), expectedValue);

        cy.checkText(countryInput.field(FIELD_ID).results(), expectedValue);
      });
    });
  });
});

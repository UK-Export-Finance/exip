import { countryInput, submitButton } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { FIELD_IDS } from '../../../../../../constants';
import { PAGES } from '../../../../../../content-strings';
import { COUNTRY_SUPPORTED_ONLINE } from '../../../../../../fixtures/countries';
import checkAutocompleteInput from '../../../../../../commands/shared-commands/assertions/check-autocomplete-input';

const CONTENT_STRINGS = PAGES.BUYER_COUNTRY;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY, COMPANY_DETAILS, INSURED_AMOUNT },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Buyer country page - as an exporter, I want to check if UKEF offer export insurance policy for where my buyer is based', () => {
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
    it('has working client side JS', () => {
      checkAutocompleteInput.hasWorkingClientSideJS(countryInput.field(FIELD_ID));
    });

    it('renders an input', () => {
      checkAutocompleteInput.rendersInput(countryInput.field(FIELD_ID));
    });

    it('renders `no results` message when no results are found', () => {
      checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(FIELD_ID), 'test');
    });

    it('renders a single country result after searching', () => {
      checkAutocompleteInput.rendersSingleResult(countryInput.field(FIELD_ID), 'Alg');
    });

    it('renders multiple country results after searching', () => {
      checkAutocompleteInput.rendersMultipleResults(countryInput.field(FIELD_ID), 'Be');
    });

    it('allows user to remove a selected country and search again', () => {
      checkAutocompleteInput.allowsUserToRemoveCountryAndSearchAgain(countryInput.field(FIELD_ID), 'Algeria', 'Brazil');
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        submitButton().click();
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
        cy.keyboardInput(countryInput.field(FIELD_ID).input(), COUNTRY_SUPPORTED_ONLINE.name);

        const results = countryInput.field(FIELD_ID).results();
        results.first().click();

        submitButton().click();
      });

      it(`should redirect to ${INSURED_AMOUNT}`, () => {
        const expectedUrl = `${baseUrl}${INSURED_AMOUNT}`;

        cy.assertUrl(expectedUrl);
      });

      it('should prepopulate the field when going back to the page via back link', () => {
        cy.clickBackLink();

        const expectedValue = COUNTRY_SUPPORTED_ONLINE.name;

        cy.checkValue(countryInput.field(FIELD_ID), expectedValue);

        cy.checkText(countryInput.field(FIELD_ID).results(), expectedValue);
      });
    });
  });
});

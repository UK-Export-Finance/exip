import { backLink, countryInput, submitButton } from '../../../../../../pages/shared';
import { LINKS, PAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import {
  checkInputHint,
  checkValidationErrors,
  checkFocusOnInputWhenClickingSummaryErrorMessage,
} from '../../../../../../commands/check-buyer-country-form';
import { COUNTRY_SUPPORTED_ONLINE } from '../../../../../../fixtures/countries';
import checkAutocompleteInput from '../../../../../../commands/check-autocomplete-input';

const CONTENT_STRINGS = PAGES.BUYER_COUNTRY;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const {
  QUOTE: { BUYER_COUNTRY, BUYER_BODY },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Buyer country page - as an exporter, I want to check if UKEF issue export insurance cover for where my buyer is based', () => {
  beforeEach(() => {
    cy.login();

    const expectedUrl = `${baseUrl}${BUYER_COUNTRY}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: BUYER_COUNTRY,
      backLink: LINKS.EXTERNAL.BEFORE_YOU_START,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      lightHouseThresholds: {
        performance: 70,
      },
    });
  });

  it('renders a hint', () => {
    checkInputHint();
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
        checkValidationErrors();
      });

      it('renders a back link with correct url', () => {
        const expectedHref = `${Cypress.config('baseUrl')}${BUYER_COUNTRY}`;

        cy.checkLink(
          backLink(),
          expectedHref,
          LINKS.BACK,
        );
      });

      it('should focus on input when clicking summary error message', () => {
        checkFocusOnInputWhenClickingSummaryErrorMessage();
      });
    });

    describe('when submitting with a supported country', () => {
      beforeEach(() => {
        cy.keyboardInput(countryInput.field(FIELD_ID).input(), COUNTRY_SUPPORTED_ONLINE.name);

        const results = countryInput.field(FIELD_ID).results();
        results.first().click();

        submitButton().click();
      });

      it(`should redirect to ${BUYER_BODY}`, () => {
        const expectedUrl = `${baseUrl}${BUYER_BODY}`;

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

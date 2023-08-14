import { backLink, buyerCountryPage, submitButton } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../../../commands/insurance/eligibility/forms';
import {
  checkInputHint,
  checkAutocompleteInput,
  checkValidationErrors,
  checkFocusOnInputWhenClickingSummaryErrorMessage,
} from '../../../../../../commands/check-buyer-country-form';
import { COUNTRY_SUPPORTED_ONLINE } from '../../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.BUYER_COUNTRY;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY, CHECK_IF_ELIGIBLE, EXPORTER_LOCATION },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Buyer country page - as an exporter, I want to check if UKEF offer export insurance policy for where my buyer is based', () => {
  beforeEach(() => {
    cy.navigateToUrl(START);

    completeStartForm();
    completeCheckIfEligibleForm();

    const expectedUrl = `${baseUrl}${BUYER_COUNTRY}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: BUYER_COUNTRY,
      backLink: CHECK_IF_ELIGIBLE,
      assertAuthenticatedHeader: false,
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
      checkAutocompleteInput.hasWorkingClientSideJS();
    });

    it('renders an input', () => {
      checkAutocompleteInput.rendersInput();
    });

    it('renders `no results` message when no results are found', () => {
      checkAutocompleteInput.rendersNoResultsMessage();
    });

    it('renders a single country result after searching', () => {
      checkAutocompleteInput.rendersSingleResult();
    });

    it('renders multiple country results after searching', () => {
      checkAutocompleteInput.rendersMultipleResults();
    });

    it('allows user to remove a selected country and search again', () => {
      checkAutocompleteInput.allowsUserToRemoveCountryAndSearchAgain();
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
        cy.keyboardInput(buyerCountryPage.input(), COUNTRY_SUPPORTED_ONLINE.name);

        const results = buyerCountryPage.results();
        results.first().click();

        submitButton().click();
      });

      it(`should redirect to ${EXPORTER_LOCATION}`, () => {
        const expectedUrl = `${baseUrl}${EXPORTER_LOCATION}`;

        cy.assertUrl(expectedUrl);
      });

      it('should prepopulate the field when going back to the page via back link', () => {
        cy.clickBackLink();

        const expectedValue = COUNTRY_SUPPORTED_ONLINE.name;

        cy.checkValue(buyerCountryPage, expectedValue);

        cy.checkText(buyerCountryPage.results(), expectedValue);
      });
    });
  });
});

import { backLink, buyerCountryPage, submitButton } from '../../../../pages/shared';
import { ROUTES } from '../../../../../../constants';
import { PAGES } from '../../../../../../content-strings';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../../support/insurance/eligibility/forms';
import {
  checkInputHint,
  checkAutocompleteInput,
  checkValidationErrors,
  checkFocusOnInputWhenClickingSummaryErrorMessage,
} from '../../../../../support/check-buyer-country-form';
import { COUNTRY_SUPPORTED_ONLINE } from '../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.BUYER_COUNTRY;

context('Insurance - Buyer country page - as an exporter, I want to check if UKEF offer export insurance policy for where my buyer is based', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE,
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
        backLink().should('exist');

        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY}`;

        backLink().should('have.attr', 'href', expected);
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

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION}`, () => {
        cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
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

import { backLink, buyerCountryPage, submitButton } from '../../../../../../pages/shared';
import { LINKS, PAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import {
  checkInputHint,
  checkAutocompleteInput,
  checkValidationErrors,
  checkFocusOnInputWhenClickingSummaryErrorMessage,
} from '../../../../../../commands/check-buyer-country-form';
import { COUNTRY_SUPPORTED_ONLINE } from '../../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.BUYER_COUNTRY;

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

      it(`should redirect to ${BUYER_BODY}`, () => {
        const expectedUrl = `${baseUrl}${BUYER_BODY}`;

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

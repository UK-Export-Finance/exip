import { buyerCountryPage, submitButton } from '../../../pages/shared';
import partials from '../../../partials';
import { LINKS, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import {
  checkInputHint,
  checkAutocompleteInput,
  checkValidationErrors,
  checkFocusOnInputWhenClickingSummaryErrorMessage,
} from '../../../../support/check-buyer-country-form';

const CONTENT_STRINGS = PAGES.BUYER_COUNTRY;

context('Buyer country page - as an exporter, I want to check if UKEF issue export insurance cover for where my buyer is based', () => {
  beforeEach(() => {
    cy.login();

    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.BUYER_COUNTRY,
      backLink: LINKS.EXTERNAL.BEFORE_YOU_START,
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
        partials.backLink().should('exist');

        const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.BUYER_COUNTRY}`;

        partials.backLink().should('have.attr', 'href', expected);
      });

      it('should focus on input when clicking summary error message', () => {
        checkFocusOnInputWhenClickingSummaryErrorMessage();
      });
    });

    describe('when submitting with a supported country', () => {
      it(`should redirect to ${ROUTES.QUOTE.BUYER_BODY}`, () => {
        cy.keyboardInput(buyerCountryPage.searchInput(), 'Algeria');

        const results = buyerCountryPage.results();
        results.first().click();

        submitButton().click();

        cy.url().should('include', ROUTES.QUOTE.BUYER_BODY);
      });
    });
  });
});

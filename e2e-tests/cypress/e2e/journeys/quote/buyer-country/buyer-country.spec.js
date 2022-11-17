import { buyerCountryPage, submitButton } from '../../../pages/shared';
import partials from '../../../partials';
import {
  BUTTONS,
  ERROR_MESSAGES,
  FIELDS,
  LINKS,
  ORGANISATION,
  PAGES,
} from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';
import {
  checkPageTitleAndHeading,
  checkInputHint,
  checkAutocompleteInput,
  checkSubmitButton,
  checkValidationErrors,
  checkFocusOnInputWhenClickingSummaryErrorMessage,
} from '../../../../support/check-buyer-country-form';

const CONTENT_STRINGS = PAGES.QUOTE.BUYER_COUNTRY;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Buyer country page - as an exporter, I want to check if UKEF issue export insurance cover for where my buyer is based', () => {
  beforeEach(() => {
    cy.login();

    cy.url().should('include', ROUTES.QUOTE.BUYER_COUNTRY);
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 70,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().should('have.attr', 'href', LINKS.EXTERNAL.BEFORE_YOU_START);
  });

  it('renders a page title and heading', () => {
    checkPageTitleAndHeading();
  });

  it('renders a hint', () => {
    checkInputHint();
  });

  describe('searchable autocomplete input', () => {
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

  it('renders a submit button', () => {
    checkSubmitButton();
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
        buyerCountryPage.searchInput().type('Algeria');

        const results = buyerCountryPage.results();
        results.first().click();

        submitButton().click();

        cy.url().should('include', ROUTES.QUOTE.BUYER_BODY);
      });
    });
  });
});

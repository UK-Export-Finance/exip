import { backLink, autoCompleteField } from '../../../../../../pages/shared';
import { LINKS, PAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';
import { assertCountryAutocompleteInput } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.BUYER_COUNTRY;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const {
  QUOTE: { BUYER_COUNTRY, BUYER_BODY },
} = ROUTES;

const supportedCountryName = COUNTRY_QUOTE_SUPPORT.ONLINE.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Buyer country page - as an exporter, I want to check if UKEF issue credit insurance cover for where my buyer is based', () => {
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

      it('renders a back link with correct url', () => {
        const expectedHref = `${baseUrl}${BUYER_COUNTRY}`;

        cy.checkLink(
          backLink(),
          expectedHref,
          LINKS.BACK,
        );
      });

      it('should focus on input when clicking summary error message', () => {
        cy.checkBuyerCountryFocusAfterSummaryErrorClick();
      });
    });

    describe('when submitting with a supported country', () => {
      const field = autoCompleteField(FIELD_ID);

      beforeEach(() => {
        cy.keyboardInput(field.input(), supportedCountryName);

        const results = field.results();
        results.first().click();

        cy.clickSubmitButton();
      });

      it(`should redirect to ${BUYER_BODY}`, () => {
        const expectedUrl = `${baseUrl}${BUYER_BODY}`;

        cy.assertUrl(expectedUrl);
      });

      it('should prepopulate the field when going back to the page via back link', () => {
        cy.clickBackLink();

        cy.checkValue(field, supportedCountryName);

        cy.checkText(field.results(), supportedCountryName);
      });
    });
  });
});

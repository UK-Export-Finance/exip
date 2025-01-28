import { backLink, autoCompleteField, cannotApplyPage } from '../../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY_EXIT;

const {
  QUOTE: { BUYER_COUNTRY, CANNOT_APPLY_EXIT },
} = ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const COUNTRY_NAME = COUNTRY_QUOTE_SUPPORT.NOT_SUPPORTED_1.NAME;

const baseUrl = Cypress.config('baseUrl');

context(
  'Buyer country page - as an exporter, I want to check if UKEF issue credit insurance cover for where my buyer is based - submit a country that cannot get a quote',
  () => {
    const url = `${baseUrl}${BUYER_COUNTRY}`;

    before(() => {
      cy.navigateToUrl(url);
      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);

      cy.keyboardInput(autoCompleteField(FIELD_ID).input(), COUNTRY_NAME);

      const results = autoCompleteField(FIELD_ID).results();
      results.first().click();

      cy.clickSubmitButton();
    });

    it(`should redirect to ${CANNOT_APPLY_EXIT} exit page`, () => {
      const expectedUrl = `${baseUrl}${CANNOT_APPLY_EXIT}`;

      cy.assertUrl(expectedUrl);
    });

    it('should render a back link with correct url', () => {
      cy.checkLink(backLink(), BUYER_COUNTRY, LINKS.BACK);
    });

    it('should render a specific reason', () => {
      const { REASON } = CONTENT_STRINGS;
      const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${COUNTRY_NAME}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;
      cy.checkText(cannotApplyPage.reason(), expected);
    });

    it('should prepopulate the field when going back to the page via back link', () => {
      cy.clickBackLink();

      const expectedValue = COUNTRY_NAME;

      cy.checkTextAndValue({
        textSelector: autoCompleteField(FIELD_ID).results(),
        expectedText: expectedValue,
        valueSelector: autoCompleteField(FIELD_ID),
        expectedValue,
      });
    });
  },
);

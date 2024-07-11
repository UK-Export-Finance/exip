import {
  backLink, autoCompleteField, cannotApplyPage,
} from '../../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;

const {
  QUOTE: { BUYER_COUNTRY, CANNOT_APPLY },
} = ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const NEW_COUNTRY_INPUT = COUNTRY_QUOTE_SUPPORT.UNSUPPORTED.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Buyer country page - as an exporter, I want to check if UKEF issue credit insurance cover for where my buyer is based - submit unsupported country', () => {
  const url = `${baseUrl}${BUYER_COUNTRY}`;

  before(() => {
    cy.navigateToUrl(url);
    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.keyboardInput(autoCompleteField(FIELD_ID).input(), NEW_COUNTRY_INPUT);

    const results = autoCompleteField(FIELD_ID).results();
    results.first().click();

    cy.clickSubmitButton();
  });

  it('redirects to `cannot obtain cover` exit page', () => {
    const expectedUrl = `${baseUrl}${CANNOT_APPLY}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders a back link with correct url', () => {
    cy.checkLink(
      backLink(),
      BUYER_COUNTRY,
      LINKS.BACK,
    );
  });

  it('renders a specific reason', () => {
    const { REASON } = CONTENT_STRINGS;
    const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${NEW_COUNTRY_INPUT}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });

  it('should prepopulate the field when going back to the page via back link', () => {
    cy.clickBackLink();

    const expectedValue = NEW_COUNTRY_INPUT;

    cy.checkValue(autoCompleteField(FIELD_ID), expectedValue);

    cy.checkText(autoCompleteField(FIELD_ID).results(), expectedValue);
  });
});

import { backLink, autoCompleteField } from '../../../../../../pages/shared';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { LINKS } from '../../../../../../content-strings';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../../fixtures/countries';

const {
  QUOTE: {
    BUYER_COUNTRY,
    GET_A_QUOTE_BY_EMAIL,
  },
} = ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const NEW_COUNTRY_INPUT = COUNTRY_QUOTE_SUPPORT.BY_EMAIL.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Buyer country page - as an exporter, I want to check if UKEF issue credit insurance cover for where my buyer is based - submit country that can only get a quote offline/via email', () => {
  const url = `${baseUrl}${BUYER_COUNTRY}`;

  beforeEach(() => {
    cy.navigateToUrl(url);
    cy.assertUrl(url);

    cy.keyboardInput(autoCompleteField(FIELD_ID).input(), NEW_COUNTRY_INPUT);

    const results = autoCompleteField(FIELD_ID).results();
    results.first().click();

    cy.clickSubmitButton();
  });

  it('redirects to `get a quote via email` exit page', () => {
    const expectedUrl = `${baseUrl}${GET_A_QUOTE_BY_EMAIL}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders a back link with correct url', () => {
    cy.checkLink(
      backLink(),
      BUYER_COUNTRY,
      LINKS.BACK,
    );
  });

  it('should prepopulate the field when going back to the page via back link', () => {
    cy.clickBackLink();

    const expectedValue = NEW_COUNTRY_INPUT;

    cy.checkValue(autoCompleteField(FIELD_ID), expectedValue);

    cy.checkText(autoCompleteField(FIELD_ID).results(), expectedValue);
  });
});

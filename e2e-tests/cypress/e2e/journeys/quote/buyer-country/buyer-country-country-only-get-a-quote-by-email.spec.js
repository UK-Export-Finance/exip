import { backLink, buyerCountryPage, submitButton } from '../../../pages/shared';
import { ROUTES } from '../../../../../constants';
import { LINKS } from '../../../../../content-strings';
import { COUNTRY_SUPPORTRED_BY_EMAIL } from '../../../../fixtures/countries';

const {
  QUOTE: {
    BUYER_COUNTRY,
    GET_A_QUOTE_BY_EMAIL,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Buyer country page - as an exporter, I want to check if UKEF issue export insurance cover for where my buyer is based - submit country that can only get a quote offline/via email', () => {
  const url = `${baseUrl}${BUYER_COUNTRY}`;

  beforeEach(() => {
    cy.navigateToUrl(url);
    cy.assertUrl(url);

    cy.keyboardInput(buyerCountryPage.input(), COUNTRY_SUPPORTRED_BY_EMAIL.name);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();
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

    const expectedValue = COUNTRY_SUPPORTRED_BY_EMAIL.name;

    cy.checkValue(buyerCountryPage, expectedValue);

    cy.checkText(buyerCountryPage.results(), expectedValue);
  });
});

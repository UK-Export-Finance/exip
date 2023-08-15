import {
  backLink, buyerCountryPage, cannotApplyPage, submitButton,
} from '../../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { COUNTRY_UNSUPPORTRED } from '../../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;
const { REASON } = CONTENT_STRINGS;

const {
  ELIGIBILITY: { BUYER_COUNTRY, CANNOT_APPLY },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Buyer country page - as an exporter, I want to check if UKEF offer export insurance policy for where my buyer is based - submit unsupported country', () => {
  const url = `${baseUrl}${BUYER_COUNTRY}`;

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.keyboardInput(buyerCountryPage.input(), COUNTRY_UNSUPPORTRED.name);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();
  });

  it('redirects to `cannot apply` exit page', () => {
    const expectedUrl = `${baseUrl}${CANNOT_APPLY}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders a reason', () => {
    cannotApplyPage.reason().should('exist');

    const expected = `${REASON.INTRO} ${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${COUNTRY_UNSUPPORTRED.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });

  it('renders a back link with correct url', () => {
    const expectedHref = `${baseUrl}${BUYER_COUNTRY}`;

    cy.checkLink(
      backLink(),
      expectedHref,
      LINKS.BACK,
    );
  });

  it('should prepopulate the field when going back to the page via back link', () => {
    cy.clickBackLink();

    const expectedValue = COUNTRY_UNSUPPORTRED.name;

    cy.checkValue(buyerCountryPage, expectedValue);

    cy.checkText(buyerCountryPage.results(), expectedValue);
  });
});

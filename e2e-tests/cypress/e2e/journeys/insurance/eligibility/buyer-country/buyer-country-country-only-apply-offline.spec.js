import { backLink, buyerCountryPage, submitButton } from '../../../../pages/shared';
import { ROUTES } from '../../../../../../constants';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../../support/insurance/eligibility/forms';
import { COUNTRY_SUPPORTRED_BY_EMAIL } from '../../../../../fixtures/countries';

context('Buyer country page - as an exporter, I want to check if UKEF issue export insurance cover for where my buyer is based - submit country that can only apply offline/via a physical form', () => {
  const buyerCountryUrl = ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(buyerCountryUrl);

    cy.keyboardInput(buyerCountryPage.input(), COUNTRY_SUPPORTRED_BY_EMAIL.name);

    const results = buyerCountryPage.results();
    results.first().click();

    submitButton().click();
  });

  it('redirects to `apply offline` exit page', () => {
    cy.assertUrl(ROUTES.INSURANCE.APPLY_OFFLINE);
  });

  it('renders a back link with correct url', () => {
    backLink().should('exist');

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY}`;

    backLink().should('have.attr', 'href', expected);
  });

  it('should prepopulate the field when going back to the page via back link', () => {
    cy.clickBackLink();

    const expectedValue = COUNTRY_SUPPORTRED_BY_EMAIL.name;

    cy.checkValue(buyerCountryPage, expectedValue);

    cy.checkText(buyerCountryPage.results(), expectedValue);
  });
});

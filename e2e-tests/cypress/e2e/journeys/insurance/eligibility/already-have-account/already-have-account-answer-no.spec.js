import {
  submitButton, tempCreateAccountButton, noRadioInput,
} from '../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const { START, ELIGIBILITY: { ALREADY_HAVE_ACCOUNT }, CREATE_ACCOUNT } = ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.ALREADY_HAVE_ACCOUNT;

context('Insurance - Eligibility - Already have account page - I want to confirm if I am eligible to use UKEF digital service for this Export Insurance Application so that I can be sure of the correct process that I can follow to complete my Export Insurance Application', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAnswersHappyPath();

    tempCreateAccountButton().click();

    const expected = `${Cypress.config('baseUrl')}${ALREADY_HAVE_ACCOUNT}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it(`should redirect to ${CREATE_ACCOUNT.YOUR_DETAILS}`, () => {
    noRadioInput().click();
    submitButton().click();

    cy.url().then((url) => {
      const expected = `${Cypress.config('baseUrl')}${CREATE_ACCOUNT.YOUR_DETAILS}`;
      cy.url().should('eq', expected);
    });
  });
});

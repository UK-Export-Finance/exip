import {
  submitButton, tempCreateAccountButton, noRadioInput,
} from '../../../../pages/shared';
import { ROUTES } from '../../../../../../constants';

const {
  START,
  ELIGIBILITY: { ALREADY_HAVE_ACCOUNT }, ACCOUNT: { CREATE_ACCOUNT },
  ROOT: INSURANCE_ROOT,
} = ROUTES.INSURANCE;

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

    const expected = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}${CREATE_ACCOUNT.YOUR_DETAILS}`;
    cy.url().should('eq', expected);
  });
});

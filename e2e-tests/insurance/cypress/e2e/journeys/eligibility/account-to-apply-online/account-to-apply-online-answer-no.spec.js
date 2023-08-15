import { submitButton, noRadioInput } from '../../../../../../pages/shared';
import { ROUTES } from '../../../../../../constants';

const {
  START,
  ELIGIBILITY: { ACCOUNT_TO_APPLY_ONLINE }, ACCOUNT: { CREATE },
} = ROUTES.INSURANCE;

context('Insurance - Eligibility - Account to apply online page - I want to confirm if I am eligible to use UKEF digital service for this Export Insurance Application so that I can be sure of the correct process that I can follow to complete my Export Insurance Application', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAnswersHappyPath();

    const expected = `${Cypress.config('baseUrl')}${ACCOUNT_TO_APPLY_ONLINE}`;

    cy.assertUrl(expected);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it(`should redirect to ${CREATE.YOUR_DETAILS}`, () => {
    noRadioInput().click();
    submitButton().click();

    const expected = `${Cypress.config('baseUrl')}${CREATE.YOUR_DETAILS}`;
    cy.assertUrl(expected);
  });
});

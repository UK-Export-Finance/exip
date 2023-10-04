import { signInPage } from '../../../../../../../pages/insurance/account/sign-in';
import passwordField from '../../../../../../../partials/insurance/passwordField';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import mockAccount from '../../../../../../../fixtures/account';

const {
  START,
  ACCOUNT: {
    CREATE: { YOUR_DETAILS },
  },
} = ROUTES;

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { YOUR_DETAILS: YOUR_DETAILS_ERROR_MESSAGES },
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Create - Your details page - form validation - As an Exporter, I want the system to verify that the email address that I register against my UKEF digital service account is unique, So that I can be sure that the system does not have multiple digital service accounts with the same email address', () => {
  let url;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    // create and verify an account
    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    cy.verifyAccountEmail();

    // go to create account page
    signInPage.createAccountLink().click();

    url = `${baseUrl}${YOUR_DETAILS}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.completeAndSubmitCreateAccountForm();
  });

  it('should render a validation error when trying to create an account with an email that already has an account', () => {
    const value = mockAccount.email;
    const fieldIndex = 0;
    const TOTAL_REQUIRED_FIELDS = 1;
    const expectedMessage = String(YOUR_DETAILS_ERROR_MESSAGES[EMAIL].ACCOUNT_ALREADY_EXISTS);

    cy.submitAndAssertFieldErrors(passwordField, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
  });
});

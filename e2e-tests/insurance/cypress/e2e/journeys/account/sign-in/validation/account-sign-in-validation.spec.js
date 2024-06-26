import { field, submitButton } from '../../../../../../../pages/shared';
import passwordField from '../../../../../../../partials/insurance/passwordField';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import account from '../../../../../../../fixtures/account';

const {
  START,
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = ROUTES;

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: { ACCOUNT: { SIGN_IN: SIGN_IN_ERROR_MESSAGES } },
} = ERROR_MESSAGES;

const TOTAL_REQUIRED_FIELDS = 2;

const assertAllFieldErrors = () => {
  cy.submitAndAssertFieldErrors(field(EMAIL), null, 0, TOTAL_REQUIRED_FIELDS, SIGN_IN_ERROR_MESSAGES[EMAIL].INCORRECT);
  cy.submitAndAssertFieldErrors(passwordField, null, 1, TOTAL_REQUIRED_FIELDS, SIGN_IN_ERROR_MESSAGES[PASSWORD].INCORRECT);
};

context('Insurance - Account - Sign in - Validation', () => {
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountSignIn();

    url = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('should render validation errors for all required fields', () => {
    submitButton().click();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when email is provided, but password is not', () => {
    cy.keyboardInput(field(EMAIL).input(), account[EMAIL]);

    submitButton().click();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when password is provided, but email is not', () => {
    field(EMAIL).input().clear();
    cy.keyboardInput(passwordField.input(), account[PASSWORD]);

    submitButton().click();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when email and password are provided, but email is incorrect', () => {
    cy.keyboardInput(field(EMAIL).input(), `incorrect-${account[EMAIL]}`);
    cy.keyboardInput(passwordField.input(), account[PASSWORD]);

    submitButton().click();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when email and password are provided, but password is incorrect', () => {
    cy.keyboardInput(field(EMAIL).input(), account[EMAIL]);
    cy.keyboardInput(passwordField.input(), `incorrect-${account[PASSWORD]}`);

    submitButton().click();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when email and password are provided and both are incorrect', () => {
    cy.keyboardInput(field(EMAIL).input(), `incorrect-${account[EMAIL]}`);
    cy.keyboardInput(passwordField.input(), `incorrect-${account[PASSWORD]}`);

    submitButton().click();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when password is a pure number', () => {
    cy.keyboardInput(field(EMAIL).input(), `incorrect-${account[EMAIL]}`);
    cy.keyboardInput(passwordField.input(), '12345');

    submitButton().click();

    assertAllFieldErrors();
  });
});

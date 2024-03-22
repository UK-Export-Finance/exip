import { field } from '../../../../../../../pages/shared';
import passwordField from '../../../../../../../partials/insurance/passwordField';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { assertEmailFieldValidation } from '../../../../../../../shared-test-assertions';
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

/**
 * assertAllFieldErrors
 * Assert field errors for the EMAIL and PASSWORD fields
 */
const assertAllFieldErrors = () => {
  cy.assertFieldErrors({
    field: field(EMAIL),
    errorIndex: 0,
    errorSummaryLength: TOTAL_REQUIRED_FIELDS,
    errorMessage: SIGN_IN_ERROR_MESSAGES[EMAIL].INCORRECT,
  });

  cy.assertFieldErrors({
    field: passwordField,
    errorIndex: 1,
    errorSummaryLength: TOTAL_REQUIRED_FIELDS,
    errorMessage: SIGN_IN_ERROR_MESSAGES[PASSWORD].INCORRECT,
  });
};

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Sign in - Validation', () => {
  let url;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountSignIn();

    url = `${baseUrl}${SIGN_IN_ROOT}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('should render validation errors for all required fields', () => {
    cy.clickSubmitButton();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when email is provided, but password is not', () => {
    cy.keyboardInput(field(EMAIL).input(), account[EMAIL]);

    cy.clickSubmitButton();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when password is provided, but email is not', () => {
    field(EMAIL).input().clear();
    cy.keyboardInput(passwordField.input(), account[PASSWORD]);

    cy.clickSubmitButton();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when email and password are provided, but email is incorrect', () => {
    cy.keyboardInput(field(EMAIL).input(), `incorrect-${account[EMAIL]}`);
    cy.keyboardInput(passwordField.input(), account[PASSWORD]);

    cy.clickSubmitButton();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when email and password are provided, but password is incorrect', () => {
    cy.keyboardInput(field(EMAIL).input(), account[EMAIL]);
    cy.keyboardInput(passwordField.input(), `incorrect-${account[PASSWORD]}`);

    cy.clickSubmitButton();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when email and password are provided and both are incorrect', () => {
    cy.keyboardInput(field(EMAIL).input(), `incorrect-${account[EMAIL]}`);
    cy.keyboardInput(passwordField.input(), `incorrect-${account[PASSWORD]}`);

    cy.clickSubmitButton();

    assertAllFieldErrors();
  });

  it('should render a validation error for both fields when password is a pure number', () => {
    cy.keyboardInput(field(EMAIL).input(), `incorrect-${account[EMAIL]}`);
    cy.keyboardInput(passwordField.input(), '12345');

    cy.clickSubmitButton();

    assertAllFieldErrors();
  });

  // email specific validation
  assertEmailFieldValidation({
    fieldId: EMAIL,
    errorIndex: 0,
    errorMessages: SIGN_IN_ERROR_MESSAGES[EMAIL],
    totalExpectedErrors: 2,
    totalExpectedOtherErrorsWithValidEmail: 1,
    isGenericErrorMessage: true,
    assertErrorWhenCorrectlyFormatted: false,
  });
});

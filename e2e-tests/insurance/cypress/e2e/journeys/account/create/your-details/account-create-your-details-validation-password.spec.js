import passwordField from '../../../../../../../partials/insurance/passwordField';
import { INVALID_PASSWORDS } from '../../../../../../../constants/examples';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  START,
  ACCOUNT: { CREATE: { YOUR_DETAILS } },
} = ROUTES;

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { YOUR_DETAILS: YOUR_DETAILS_ERROR_MESSAGES },
    },
  },
} = ERROR_MESSAGES;

const fieldErrorAssertions = (value) => ({
  field: passwordField,
  value,
  fieldIndex: 3,
  errorSummaryLength: 4,
  errorMessage: YOUR_DETAILS_ERROR_MESSAGES[PASSWORD].INCORRECT_FORMAT,
});

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Create - Your details page - form validation - password', () => {
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();

    url = `${baseUrl}${YOUR_DETAILS}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('should render a validation error when password does not have the minimum amount of characters', () => {
    const submittedValue = INVALID_PASSWORDS.NOT_MINIMUM_CHARACTERS;

    const {
      field,
      value,
      fieldIndex,
      errorSummaryLength,
      errorMessage,
    } = fieldErrorAssertions(submittedValue);

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, errorSummaryLength, errorMessage);
  });

  it('should render a validation error when password does not contain an uppercase letter', () => {
    const submittedValue = INVALID_PASSWORDS.NO_UPPERCASE_LETTER;

    const {
      field,
      value,
      fieldIndex,
      errorSummaryLength,
      errorMessage,
    } = fieldErrorAssertions(submittedValue);

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, errorSummaryLength, errorMessage);
  });

  it('should render a validation error when password does not contain a lowercase letter', () => {
    const submittedValue = INVALID_PASSWORDS.NO_LOWERCASE_LETTER;

    const {
      field,
      value,
      fieldIndex,
      errorSummaryLength,
      errorMessage,
    } = fieldErrorAssertions(submittedValue);

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, errorSummaryLength, errorMessage);
  });

  it('should render a validation error when password does not contain a number', () => {
    const submittedValue = INVALID_PASSWORDS.NO_NUMBER;

    const {
      field,
      value,
      fieldIndex,
      errorSummaryLength,
      errorMessage,
    } = fieldErrorAssertions(submittedValue);

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, errorSummaryLength, errorMessage);
  });

  it('should render a validation error when password does not contain a special character', () => {
    const submittedValue = INVALID_PASSWORDS.NO_SPECIAL_CHARACTER;

    const {
      field,
      value,
      fieldIndex,
      errorSummaryLength,
      errorMessage,
    } = fieldErrorAssertions(submittedValue);

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, errorSummaryLength, errorMessage);
  });
});

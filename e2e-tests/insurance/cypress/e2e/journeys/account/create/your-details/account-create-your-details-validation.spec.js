import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants/validation';
import assertNameFieldValidation from '../../../../../../../shared-test-assertions/name-field-validation';

const {
  ACCOUNT: {
    CREATE: { YOUR_DETAILS },
  },
} = ROUTES;

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { YOUR_DETAILS: YOUR_DETAILS_ERROR_MESSAGES },
    },
  },
} = ERROR_MESSAGES;

const { NAME: MAX_CHARACTERS } = MAXIMUM_CHARACTERS.ACCOUNT;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Create - Your details page - empty form validation', () => {
  let url;

  before(() => {
    cy.navigateToCheckIfEligibleUrl();

    cy.submitEligibilityAndStartAccountCreation();

    url = `${baseUrl}${YOUR_DETAILS}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  const TOTAL_REQUIRED_FIELDS = 4;
  const maximum = 'a'.repeat(MAX_CHARACTERS + 1);
  const totalExpectedErrors = 4;
  const totalExpectedOtherErrorsWithValidName = 3;

  assertNameFieldValidation({
    fieldId: FIRST_NAME,
    maximum,
    errorIndex: 0,
    errorMessages: YOUR_DETAILS_ERROR_MESSAGES[FIRST_NAME],
    totalExpectedErrors,
    totalExpectedOtherErrorsWithValidName,
  });

  assertNameFieldValidation({
    fieldId: LAST_NAME,
    errorIndex: 1,
    maximum,
    errorMessages: YOUR_DETAILS_ERROR_MESSAGES[LAST_NAME],
    totalExpectedErrors,
    totalExpectedOtherErrorsWithValidName,
  });

  it('should render email validation error', () => {
    cy.submitAndAssertFieldErrors({
      field: fieldSelector(EMAIL),
      errorIndex: 2,
      expectedErrorsCount: TOTAL_REQUIRED_FIELDS,
      expectedErrorMessage: YOUR_DETAILS_ERROR_MESSAGES[EMAIL].INCORRECT_FORMAT,
    });
  });

  it('should render password validation error', () => {
    cy.submitAndAssertFieldErrors({
      field: fieldSelector(PASSWORD),
      errorIndex: 3,
      expectedErrorsCount: TOTAL_REQUIRED_FIELDS,
      expectedErrorMessage: YOUR_DETAILS_ERROR_MESSAGES[PASSWORD].INCORRECT_FORMAT,
    });
  });
});

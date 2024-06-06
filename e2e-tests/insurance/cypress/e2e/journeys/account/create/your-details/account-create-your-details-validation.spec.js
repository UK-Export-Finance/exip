import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  START,
  ACCOUNT: {
    CREATE: { YOUR_DETAILS },
  },
} = ROUTES;

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PASSWORD,
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { YOUR_DETAILS: YOUR_DETAILS_ERROR_MESSAGES },
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Create - Your details page - empty form validation', () => {
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

  const TOTAL_REQUIRED_FIELDS = 4;

  it('should render first name validation error', () => {
    cy.navigateToUrl(url);

    cy.submitAndAssertFieldErrors({
      field: fieldSelector(FIRST_NAME),
      expectedErrorsCount: TOTAL_REQUIRED_FIELDS,
      expectedErrorMessage: YOUR_DETAILS_ERROR_MESSAGES[FIRST_NAME].IS_EMPTY,
    });
  });

  it('should render last name a validation error', () => {
    cy.submitAndAssertFieldErrors({
      field: fieldSelector(LAST_NAME),
      errorIndex: 1,
      expectedErrorsCount: TOTAL_REQUIRED_FIELDS,
      expectedErrorMessage: YOUR_DETAILS_ERROR_MESSAGES[LAST_NAME].IS_EMPTY,
    });
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

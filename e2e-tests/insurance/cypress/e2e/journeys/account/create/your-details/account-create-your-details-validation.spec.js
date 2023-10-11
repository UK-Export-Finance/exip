import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  START,
  ACCOUNT: { CREATE: { YOUR_DETAILS } },
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
    const field = fieldSelector(FIRST_NAME);
    const value = null;
    const fieldIndex = 0;
    const expectedMessage = String(YOUR_DETAILS_ERROR_MESSAGES[FIRST_NAME].IS_EMPTY);

    cy.navigateToUrl(url);

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
  });

  it('should render last name a validation error', () => {
    const field = fieldSelector(LAST_NAME);
    const value = null;
    const fieldIndex = 1;
    const expectedMessage = String(YOUR_DETAILS_ERROR_MESSAGES[LAST_NAME].IS_EMPTY);

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
  });

  it('should render email validation error', () => {
    const field = fieldSelector(EMAIL);
    const value = null;
    const fieldIndex = 2;
    const expectedMessage = String(YOUR_DETAILS_ERROR_MESSAGES[EMAIL].INCORRECT_FORMAT);

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
  });

  it('should render password validation error', () => {
    const field = fieldSelector(PASSWORD);
    const value = null;
    const fieldIndex = 3;
    const expectedMessage = String(YOUR_DETAILS_ERROR_MESSAGES[PASSWORD].INCORRECT_FORMAT);

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
  });
});

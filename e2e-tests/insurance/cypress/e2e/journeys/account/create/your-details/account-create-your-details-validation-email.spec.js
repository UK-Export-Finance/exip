import { field as fieldSelector } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { INVALID_EMAILS } from '../../../../../../../constants';

const {
  START,
  ACCOUNT: { CREATE: { YOUR_DETAILS } },
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

const expectedMessage = String(YOUR_DETAILS_ERROR_MESSAGES[EMAIL].INCORRECT_FORMAT);

const baseUrl = Cypress.config('baseUrl');

const submitAndAssertFieldErrors = (fieldValue) => {
  const field = fieldSelector(EMAIL);

  cy.keyboardInput(field.input(), fieldValue);

  cy.clickSubmitButton();

  cy.checkText(
    partials.errorSummaryListItems().eq(2),
    expectedMessage,
  );

  cy.checkText(field.errorMessage(), `Error: ${expectedMessage}`);
};

context('Insurance - Account - Create - Your details page - form validation - email', () => {
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

  it('should render a validation error when email does not contain an @ symbol', () => {
    const invalidEmail = INVALID_EMAILS.NO_AT_SYMBOL;

    submitAndAssertFieldErrors(invalidEmail);
  });

  it('should render a validation error when email does not contain at least one dot', () => {
    const invalidEmail = INVALID_EMAILS.NO_DOTS;

    submitAndAssertFieldErrors(invalidEmail);
  });

  it('should render a validation error when email contains a space', () => {
    const invalidEmail = INVALID_EMAILS.WITH_SPACE;

    submitAndAssertFieldErrors(invalidEmail);
  });

  it('should render a validation error when email does not contain a domain', () => {
    const invalidEmail = INVALID_EMAILS.NO_DOMAIN;

    submitAndAssertFieldErrors(invalidEmail);
  });
});

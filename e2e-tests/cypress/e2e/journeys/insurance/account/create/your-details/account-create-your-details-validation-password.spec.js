import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import accountFormFields from '../../../../../partials/insurance/accountFormFields';
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

const expectedMessage = YOUR_DETAILS_ERROR_MESSAGES[PASSWORD].INCORRECT_FORMAT;

const submitAndAssertFieldErrors = (fieldValue) => {
  const field = accountFormFields[PASSWORD];

  cy.keyboardInput(field.input(), fieldValue);

  submitButton().click();

  cy.checkText(
    partials.errorSummaryListItems().eq(3),
    expectedMessage,
  );

  cy.checkText(field.errorMessage(), `Error: ${expectedMessage}`);
};

context('Insurance - Account - Create - Your details page - form validation - password', () => {
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();

    url = `${Cypress.config('baseUrl')}${YOUR_DETAILS}`;

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('should render a validation error when password does not have the minimum amount of characters', () => {
    const invalidPassword = 'Mock1!';

    submitAndAssertFieldErrors(invalidPassword);
  });

  it('should render a validation error when password does not contain an uppercase letter', () => {
    const invalidPassword = 'mockpassword1!';

    submitAndAssertFieldErrors(invalidPassword);
  });

  it('should render a validation error when password does not contain a lowercase letter', () => {
    const invalidPassword = 'MOCKPASSWORD1!';

    submitAndAssertFieldErrors(invalidPassword);
  });

  it('should render a validation error when password does not contain a number', () => {
    const invalidPassword = 'Mockpassword!';

    submitAndAssertFieldErrors(invalidPassword);
  });

  it('should render a validation error when password does not contain a special character', () => {
    const invalidPassword = 'Mockpassword1';

    submitAndAssertFieldErrors(invalidPassword);
  });
});

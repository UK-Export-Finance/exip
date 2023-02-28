import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import accountFormFields from '../../../../../partials/insurance/accountFormFields';
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

const expectedMessage = YOUR_DETAILS_ERROR_MESSAGES[EMAIL].INCORRECT_FORMAT;

const submitAndAssertFieldErrors = (fieldValue) => {
  const field = accountFormFields[EMAIL];

  cy.keyboardInput(field.input(), fieldValue);

  submitButton().click();

  cy.checkText(
    partials.errorSummaryListItems().eq(2),
    expectedMessage,
  );

  cy.checkText(field.errorMessage(), `Error: ${expectedMessage}`);
};

context('Insurance - Account - Create - Your details page - form validation - email', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();

    const expected = `${Cypress.config('baseUrl')}${YOUR_DETAILS}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe('when email does not contain an @ symbol', () => {
    it('should render a validation error', () => {
      const invalidEmail = INVALID_EMAILS.NO_AT_SYMBOL;

      submitAndAssertFieldErrors(invalidEmail);
    });
  });

  describe('when email does not contain at least one dot', () => {
    it('should render a validation error', () => {
      const invalidEmail = INVALID_EMAILS.NO_DOTS;

      submitAndAssertFieldErrors(invalidEmail);
    });
  });

  describe('when email contains a space', () => {
    it('should render a validation error', () => {
      const invalidEmail = INVALID_EMAILS.WITH_SPACE;

      submitAndAssertFieldErrors(invalidEmail);
    });
  });

  describe('when email does not contain a domain', () => {
    it('should render a validation error', () => {
      const invalidEmail = INVALID_EMAILS.NO_DOMAIN;

      submitAndAssertFieldErrors(invalidEmail);
    });
  });
});

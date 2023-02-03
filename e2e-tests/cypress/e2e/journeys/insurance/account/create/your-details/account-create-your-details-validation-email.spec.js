import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

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
  const field = yourDetailsPage[EMAIL];

  field.input().clear().type(fieldValue, { delay: 0 });
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
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when email does not contain an @ symbol', () => {
    it('should render a validation error', () => {
      const invalidEmail = 'mockemail.com';

      submitAndAssertFieldErrors(invalidEmail);
    });
  });

  describe('when email does not contain at least one dot', () => {
    it('should render a validation error', () => {
      const invalidEmail = 'mock@emailcom';

      submitAndAssertFieldErrors(invalidEmail);
    });
  });

  describe('when email contains a space', () => {
    it('should render a validation error', () => {
      const invalidEmail = 'mock@email .com';

      submitAndAssertFieldErrors(invalidEmail);
    });
  });

  describe('when email does not contain a domain', () => {
    it('should render a validation error', () => {
      const invalidEmail = 'mock@email.';

      submitAndAssertFieldErrors(invalidEmail);
    });
  });
});

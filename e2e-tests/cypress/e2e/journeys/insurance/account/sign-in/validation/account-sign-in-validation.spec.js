import { submitButton } from '../../../../../pages/shared';
import accountFormFields from '../../../../../partials/insurance/accountFormFields';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import account from '../../../../../../fixtures/account';

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
  cy.submitAndAssertFieldErrors(accountFormFields[EMAIL], null, 0, TOTAL_REQUIRED_FIELDS, SIGN_IN_ERROR_MESSAGES[EMAIL].INCORRECT);
  cy.submitAndAssertFieldErrors(accountFormFields[PASSWORD], null, 1, TOTAL_REQUIRED_FIELDS, SIGN_IN_ERROR_MESSAGES[PASSWORD].INCORRECT);
};

context('Insurance - Account - Sign in - Validation', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountSignIn();

    const expected = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('should render validation errors for all required fields', () => {
    submitButton().click();

    assertAllFieldErrors();
  });

  describe('when email is provided, but password is not', () => {
    it('should render a validation error for both fields', () => {
      accountFormFields[EMAIL].input().type(account[EMAIL], { delay: 0 });

      submitButton().click();

      assertAllFieldErrors();
    });
  });

  describe('when password is provided, but email is not', () => {
    it('should render a validation error for both fields', () => {
      accountFormFields[EMAIL].input().clear();
      accountFormFields[PASSWORD].input().type(account[PASSWORD], { delay: 0 });

      submitButton().click();

      assertAllFieldErrors();
    });
  });

  // TODO: EMS-870 - create an account and enable these tests
  // describe('when email does not match the created account, but password is correct', () => {
  //   it('should render a validation error for both fields', () => {
  //     accountFormFields[EMAIL].input().clear().type(`incorrect-${account[EMAIL]}`, { delay: 0 });
  //     accountFormFields[PASSWORD].input().clear().type(account[PASSWORD], { delay: 0 });

  //     submitButton().click();

  //     assertAllFieldErrors();
  //   });
  // });

  // describe('when password does not match the created account, but email is correct', () => {
  //   it('should render a validation error for both fields', () => {
  //     accountFormFields[EMAIL].input().clear().type(account[EMAIL], { delay: 0 });
  //     accountFormFields[PASSWORD].input().clear().type(`incorrect-${account[PASSWORD]}`, { delay: 0 });

  //     submitButton().click();

  //     assertAllFieldErrors();
  //   });
  // });
});

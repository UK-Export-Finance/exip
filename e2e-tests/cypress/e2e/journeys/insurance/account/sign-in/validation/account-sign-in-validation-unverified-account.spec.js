import accountFormFields from '../../../../../partials/insurance/accountFormFields';
import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import partials from '../../../../../partials';
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

context('Insurance - Account - Sign in - Validation - unverified account', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    partials.backLink().click();

    yourDetailsPage.signInButtonLink().click();

    const expected = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;
    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe('when valid credentials are submitted, but the account is not verifed', () => {
    it('should render a validation error for both fields and retain the submitted values', () => {
      cy.submitAndAssertFieldErrors(accountFormFields[EMAIL], account[EMAIL], 0, TOTAL_REQUIRED_FIELDS, SIGN_IN_ERROR_MESSAGES[EMAIL].INCORRECT);
      cy.submitAndAssertFieldErrors(accountFormFields[PASSWORD], account[PASSWORD], 1, TOTAL_REQUIRED_FIELDS, SIGN_IN_ERROR_MESSAGES[PASSWORD].INCORRECT);

      accountFormFields[EMAIL].input().should('have.value', account[EMAIL]);
      accountFormFields[PASSWORD].input().should('have.value', account[PASSWORD]);
    });
  });
});

import { submitButton } from '../../../../pages/shared';
import { signInPage } from '../../../../pages/insurance/account/sign-in';
import accountFormFields from '../../../../partials/insurance/accountFormFields';
import { ROUTES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import mockAccount from '../../../../../fixtures/account';

const {
  INSURANCE: {
    ACCOUNT: {
      SIGN_IN: { ROOT: SIGN_IN_ROOT },
    },
  },
  PROBLEM_WITH_SERVICE,
} = ROUTES;

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

context('Insurance - Account - Password reset page - Account not found', () => {
  before(() => {
    cy.navigateToUrl(SIGN_IN_ROOT);

    // navigate to password reset page
    signInPage.resetPasswordLink().click();

    // account has not been created, so it will not be found.
    cy.keyboardInput(accountFormFields[EMAIL].input(), mockAccount[EMAIL]);

    submitButton().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
    const expected = `${Cypress.config('baseUrl')}${PROBLEM_WITH_SERVICE}`;

    cy.url().should('eq', expected);
  });
});

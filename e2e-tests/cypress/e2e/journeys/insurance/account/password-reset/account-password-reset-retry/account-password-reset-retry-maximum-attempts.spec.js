import { backLink } from '../../../../../pages/shared';
import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import { signInPage } from '../../../../../pages/insurance/account/sign-in';
import { ACCOUNT } from '../../../../../../../constants/account';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT },
    SUSPENDED: { ROOT: SUSPENDED_ROOT },
  },
} = ROUTES;

context('Insurance - Account - Password reset page - Submitting the form successfully over the maximum threshold should block the account', () => {
  let url;

  before(() => {
    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    // go back to create account page
    backLink().click();

    // navigate to sign in page
    yourDetailsPage.signInButtonLink().click();

    // navigate to password reset page
    signInPage.resetPasswordLink().click();

    url = `${Cypress.config('baseUrl')}${PASSWORD_RESET_ROOT}`;

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    const attemptsToMake = [...Array(ACCOUNT.MAX_PASSWORD_RESET_TRIES)];

    attemptsToMake.forEach((item, index) => {
      cy.completeAndSubmitPasswordResetForm({ assertRedirectUrl: false });

      const isLastAttempt = index + 1 === attemptsToMake.length;

      if (!isLastAttempt) {
        backLink().click();
      }
    });
  });

  after(() => {
    cy.deleteAccount();
  });

  it(`should redirect to ${SUSPENDED_ROOT}`, () => {
    const expected = `${Cypress.config('baseUrl')}${SUSPENDED_ROOT}`;

    cy.url().should('eq', expected);
  });
});

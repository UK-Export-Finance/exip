import { confirmEmailPage } from '../../../../../../../pages/insurance/account/create';
import { signInPage } from '../../../../../../../pages/insurance/account/sign-in';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: { CREATE: { YOUR_DETAILS }, VERIFY_EMAIL },
} = INSURANCE_ROUTES;

context('Insurance - Account - Create - Resend confirm email page - Request a new `confirm email` link once and sign in', () => {
  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(YOUR_DETAILS);
    cy.completeAndSubmitCreateAccountForm();

    confirmEmailPage.havingProblems.requestNew.link().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe(`when navigating to ${VERIFY_EMAIL} with a valid token query parameter and then signing in with a valid security code`, () => {
    it('should be successful (completeSignInAndOTP command asserts URL)', () => {
      cy.verifyAccountEmail();
      signInPage.successBanner.container().should('exist');

      cy.completeSignInAndOTP({});
    });
  });
});

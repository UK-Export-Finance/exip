import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import invalidLinkPage from '../../../../../../../pages/insurance/account/invalid-link';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    SUSPENDED: {
      VERIFY_EMAIL,
      VERIFY_EMAIL_INVALID_LINK,
    },
  },
} = ROUTES;

context('Insurance - Account - Suspended - verify email - Visit with an invalid token query param', () => {
  const baseUrl = Cypress.config('baseUrl');
  const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}`;
  const verifyEmailLinkExpiredUrl = `${baseUrl}${VERIFY_EMAIL_INVALID_LINK}`;
  const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;

  before(() => {
    cy.navigateToUrl(`${verifyEmailUrl}?token=invalid`);
  });

  it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, () => {
    cy.assertUrl(verifyEmailLinkExpiredUrl);
  });

  it(`should redirect to ${SIGN_IN_ROOT} when clicking the 'return to sign in' button/link`, () => {
    cy.navigateToUrl(verifyEmailLinkExpiredUrl);

    invalidLinkPage.returnToSignInButton().click();

    cy.assertUrl(signInUrl);
  });
});

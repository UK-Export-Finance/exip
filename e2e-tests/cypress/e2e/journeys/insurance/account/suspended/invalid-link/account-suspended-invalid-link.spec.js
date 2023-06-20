import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { PAGES } from '../../../../../../../content-strings';
import linkInvalidPage from '../../../../../pages/insurance/account/link-invalid';

const {
  ACCOUNT: {
    SUSPENDED: {
      VERIFY_EMAIL,
      VERIFY_EMAIL_LINK_INVALID,
    },
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.LINK_INVALID;

context('Insurance - Account - Suspended - Verify email - Visit with an invalid token query param', () => {
  const baseUrl = Cypress.config('baseUrl');
  const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}`;
  const verifyEmailLinkInvalidUrl = `${baseUrl}${VERIFY_EMAIL_LINK_INVALID}`;
  const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;

  before(() => {
    cy.createAnAccountAndBecomeBlocked({ startReactivationJourney: true });
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when the user navigates to ${VERIFY_EMAIL} with an invalid token`, () => {
    it(`should redirect to ${VERIFY_EMAIL_LINK_INVALID} and render core page elements`, () => {
      cy.navigateToUrl(`${verifyEmailUrl}?token=invalid`);

      cy.assertUrl(verifyEmailLinkInvalidUrl);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: verifyEmailUrl,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        assertSubmitButton: false,
      });
    });
  });

  it(`should redirect to ${SIGN_IN_ROOT} when clicking the 'return to sign in' button/link`, () => {
    cy.navigateToUrl(verifyEmailLinkInvalidUrl);

    linkInvalidPage.returnToSignInButton().click();

    cy.assertUrl(signInUrl);
  });
});

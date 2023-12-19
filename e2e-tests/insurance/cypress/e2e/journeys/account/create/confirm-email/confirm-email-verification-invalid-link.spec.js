import invalidLinkPage from '../../../../../../../pages/insurance/account/invalid-link';
import { body } from '../../../../../../../pages/shared';
import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.INVALID_LINK;

const {
  START,
  ACCOUNT: {
    CREATE: { VERIFY_EMAIL, VERIFY_EMAIL_INVALID_LINK },
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = INSURANCE_ROUTES;

context('Insurance - Account - Create - Confirm email page - invalid link - As an Exporter I want to verify my email address for account creation, So that I can activate my email address and use it to create a digital service account with UKEF', () => {
  const baseUrl = Cypress.config('baseUrl');
  const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}`;
  const verifyEmailLinkInvalidUrl = `${baseUrl}${VERIFY_EMAIL_INVALID_LINK}`;
  const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe(`when navigating to ${VERIFY_EMAIL} with an invalid token query parameter`, () => {
    it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK} and renders page elements`, () => {
      cy.navigateToUrl(`${verifyEmailUrl}?token=invalid`);

      cy.assertUrl(verifyEmailLinkInvalidUrl);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: verifyEmailUrl,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        hasAForm: false,
      });

      cy.checkText(
        body(),
        CONTENT_STRINGS.BODY,
      );

      cy.checkLink(
        invalidLinkPage.returnToSignInButton(),
        SIGN_IN_ROOT,
        BUTTONS.RETURN_TO_SIGN_IN,
      );
    });

    it(`should redirect to ${SIGN_IN_ROOT} when clicking the 'return to sign in' button/link`, () => {
      cy.navigateToUrl(verifyEmailLinkInvalidUrl);

      invalidLinkPage.returnToSignInButton().click();

      cy.assertUrl(signInUrl);
    });
  });
});

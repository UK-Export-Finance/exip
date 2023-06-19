import linkInvalidPage from '../../../../../pages/insurance/account/link-invalid';
import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.LINK_INVALID;

const {
  START,
  ACCOUNT: {
    CREATE: { VERIFY_EMAIL, VERIFY_EMAIL_LINK_INVALID },
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = INSURANCE_ROUTES;

context('Insurance - Account - Create - Confirm email page - link invalid - As an Exporter I want to verify my email address for account creation, So that I can activate my email address and use it to create a digital service account with UKEF', () => {
  const baseUrl = Cypress.config('baseUrl');
  const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}`;
  const verifyEmailLinkInvalidUrl = `${baseUrl}${VERIFY_EMAIL_LINK_INVALID}`;

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
    it(`should redirect to ${VERIFY_EMAIL_LINK_INVALID} and renders page elements`, () => {
      cy.navigateToUrl(`${verifyEmailUrl}?token=invalid`);

      cy.assertUrl(verifyEmailLinkInvalidUrl);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: verifyEmailUrl,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        assertSubmitButton: false,
      });

      cy.checkText(
        linkInvalidPage.body(),
        CONTENT_STRINGS.BODY,
      );

      cy.checkLink(
        linkInvalidPage.returnToSignInButton(),
        SIGN_IN_ROOT,
        BUTTONS.RETURN_TO_SIGN_IN,
      );
    });
  });
});

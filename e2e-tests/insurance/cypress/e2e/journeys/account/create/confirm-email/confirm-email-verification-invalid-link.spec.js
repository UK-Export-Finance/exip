import invalidLinkPage from '../../../../../../../pages/insurance/account/invalid-link';
import { body } from '../../../../../../../pages/shared';
import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.INVALID_LINK;

const {
  ACCOUNT: {
    CREATE: { VERIFY_EMAIL, VERIFY_EMAIL_INVALID_LINK },
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = INSURANCE_ROUTES;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

context(
  'Insurance - Account - Create - Confirm email page - invalid link - As an Exporter I want to verify my email address for account creation, So that I can activate my email address and use it to create a digital service account with UKEF',
  () => {
    const baseUrl = Cypress.config('baseUrl');
    const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}`;
    const verifyEmailLinkInvalidUrl = `${baseUrl}${VERIFY_EMAIL_INVALID_LINK}`;
    const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;

    let accountId;
    let hash;
    const invalid = 'invalid';

    before(() => {
      cy.deleteAccount();

      cy.navigateToCheckIfEligibleUrl();

      cy.submitEligibilityAndStartAccountCreation();
      cy.completeAndSubmitCreateAccountForm();

      cy.getAccountByEmail(accountEmail).then((responseData) => {
        const [firstAccount] = responseData;

        const { id, verificationHash } = firstAccount;

        accountId = id;
        hash = verificationHash;
      });
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
          assertSaveAndBackButtonDoesNotExist: true,
        });

        cy.checkText(body(), CONTENT_STRINGS.BODY);

        cy.checkLink(invalidLinkPage.returnToSignInButton(), SIGN_IN_ROOT, BUTTONS.RETURN_TO_SIGN_IN);
      });

      it(`should redirect to ${SIGN_IN_ROOT} when clicking the 'return to sign in' button/link`, () => {
        cy.navigateToUrl(verifyEmailLinkInvalidUrl);

        invalidLinkPage.returnToSignInButton().click();

        cy.assertUrl(signInUrl);
      });
    });

    describe(`when navigating to ${VERIFY_EMAIL} with an invalid token in the url but a valid accountId`, () => {
      it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, () => {
        const url = `${baseUrl}${VERIFY_EMAIL}?token=${invalid}&id=${accountId}`;

        cy.navigateToUrl(url);

        cy.assertUrl(verifyEmailLinkInvalidUrl);
      });
    });

    describe(`when navigating to ${VERIFY_EMAIL} with valid token but invalid account id`, () => {
      it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, () => {
        const url = `${baseUrl}${VERIFY_EMAIL}?token=${hash}&id=${invalid}`;

        cy.navigateToUrl(url);

        cy.assertUrl(verifyEmailLinkInvalidUrl);
      });
    });

    describe(`when navigating to ${VERIFY_EMAIL} with valid token but no account id`, () => {
      it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, () => {
        const url = `${baseUrl}${VERIFY_EMAIL}?token=${hash}&id=`;

        cy.navigateToUrl(url);

        cy.assertUrl(verifyEmailLinkInvalidUrl);
      });
    });

    describe(`when navigating to ${VERIFY_EMAIL} with no token but a valid account id`, () => {
      it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, () => {
        const url = `${baseUrl}${VERIFY_EMAIL}?token=&id=${accountId}`;

        cy.navigateToUrl(url);

        cy.assertUrl(verifyEmailLinkInvalidUrl);
      });
    });
  },
);

import { signInPage } from '../../../../../../../pages/insurance/account/sign-in';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGN_IN.ROOT;

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL, VERIFY_EMAIL }, SIGN_IN },
} = INSURANCE_ROUTES;

context('Insurance - Account - Create - I want the system to generate account verification link for my email address, So that I can confirm that my email address exist and can be used to create my UKEF digital service account.', () => {
  const baseUrl = Cypress.config('baseUrl');

  before(() => {
    cy.deleteAccount();

    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    const expected = `${baseUrl}${CONFIRM_EMAIL}`;

    cy.assertUrl(expected);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe(`when navigating to ${VERIFY_EMAIL} with a valid token query parameter`, () => {
    it(`should validate the exporter, redirect to ${SIGN_IN.ROOT} and display a success banner`, () => {
      cy.verifyAccountEmail();

      const { successBanner } = signInPage;

      successBanner.container().should('exist');

      cy.checkText(successBanner.heading(), CONTENT_STRINGS.SUCCESS_BANNER.HEADING);
      cy.checkText(successBanner.continue(), CONTENT_STRINGS.SUCCESS_BANNER.SIGN_IN_TO_CONTINUE);
    });
  });
});

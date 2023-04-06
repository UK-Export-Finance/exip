import header from '../../../../partials/header';
import { signInPage } from '../../../../pages/insurance/account/sign-in';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGN_IN.ROOT;

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
  DASHBOARD,
} = ROUTES;

context('Insurance - Account - Sign out - As an Exporter, I want to be able to sign out of the service from any of the digital service pages, So that I can readily maintain the security of my digital service account', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe("when clicking the header's `sign out` link", () => {
    before(() => {
      header.navigation.signOut().click();
    });

    it(`should redirect to ${SIGN_IN_ROOT} and display an 'important' banner with signed out copy`, () => {
      const expectedUrl = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;

      cy.url().should('eq', expectedUrl);

      signInPage.importantBanner.container().should('exist');

      cy.checkText(signInPage.importantBanner.heading(), CONTENT_STRINGS.IMPORTANT_BANNER.SUCCESSFULLY_SIGNED_OUT);
    });

    it(`should now redirect to ${SIGN_IN_ROOT} when visiting an authenticated page because the user session has been deleted`, () => {
      // try to navigate to an authenticated route
      cy.navigateToUrl(DASHBOARD);

      // should be taken to the sign in paeg
      const expectedUrl = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;

      cy.url().should('eq', expectedUrl);
    });
  });
});

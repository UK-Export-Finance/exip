import noAccessToApplicationPage from '../../pages/insurance/noAccessToApplication';
import { enterCodePage } from '../../pages/insurance/account/sign-in';
import { submitButton } from '../../pages/shared';
import { PAGES } from '../../../../content-strings';
import { FIELD_IDS } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import account from '../../../fixtures/account';

const CONTENT_STRINGS = PAGES.INSURANCE.NO_ACCESS_TO_APPLICATION_PAGE;

const {
  ROOT,
  DASHBOARD,
  ALL_SECTIONS,
  NO_ACCESS_TO_APPLICATION,
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    ACCOUNT: { SECURITY_CODE },
  },
} = FIELD_IDS;

const secondAccountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_2');

context('Insurance - no access to application page', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.saveSession();

    // sign into an account, create an application.
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', url);

      // create and sign into a different account and try to access to the application
      const {
        firstName,
        lastName,
        password,
      } = account;

      return cy.createAccount(firstName, lastName, secondAccountEmail, password).then((verifyAccountUrl) => {
        // verify the account by navigating to the "verify account" page
        cy.navigateToUrl(verifyAccountUrl);

        // sign in to the account. Behind the scenes, an application is created at this point.
        cy.completeAndSubmitSignInAccountForm(secondAccountEmail, password);

        // get the OTP security code
        return cy.accountAddAndGetOTP(secondAccountEmail).then((securityCode) => {
          cy.keyboardInput(enterCodePage[SECURITY_CODE].input(), securityCode);

          // submit the OTP security code
          submitButton().click();

          // assert we are on the dashboard
          const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;
          cy.url().should('eq', expectedUrl);
        });
      });
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    // delete first account (uses default GOV_NOTIFY_EMAIL_RECIPIENT email)
    cy.deleteAccount();

    // delete second account
    cy.deleteAccount(secondAccountEmail);
  });

  describe('when trying to access an application created by the previous user', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, () => {
      const expectedUrl = `${Cypress.config('baseUrl')}${NO_ACCESS_TO_APPLICATION}`;

      cy.url().should('eq', expectedUrl);
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: NO_ACCESS_TO_APPLICATION,
        assertSubmitButton: false,
        assertBackLink: false,
      });
    });

    it('renders `check URL` text', () => {
      cy.checkText(noAccessToApplicationPage.checkUrl(), CONTENT_STRINGS.CHECK_URL);
    });
  });
});

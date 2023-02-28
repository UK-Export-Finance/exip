import { enterCodePage } from '../../../../../pages/insurance/account/sign-in';
import { submitButton } from '../../../../../pages/shared';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import api from '../../../../../../support/api';

const {
  START,
  ACCOUNT: {
    SIGN_IN: { ENTER_CODE, REQUEST_NEW_CODE },
  },
  ROOT,
  DASHBOARD,
} = ROUTES;

const {
  ACCOUNT: { SECURITY_CODE },
} = INSURANCE_FIELD_IDS;

context('Insurance - Account - Sign in - I want to enter the new security code sent to my email by UK Export Finance, So that I can sign in into my UKEF digital service account', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    cy.verifyAccountEmail();

    cy.completeAndSubmitSignInAccountForm();

    enterCodePage.requestNewCodeLink().click();

    submitButton().click();

    const expected = `${Cypress.config('baseUrl')}${ENTER_CODE}`;
    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe('when submitting a valid security code', () => {
    it(`should redirect to ${ROOT}${DASHBOARD}`, () => {
      /**
       * Create and get an OTP for the exporter's account directly from the API,
       * so that we can assert enter a valid security code and continue the journey.
       * This is to ensure that we are testing a real world scenario.
       *
       * The alternative approach is to either intercept the UI requests and fake the security code validation,
       * or have email inbox testing capabilities which can be risky/flaky.
       * This approach practically mimics "get my security code from my email inbox".
       */
      const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT');

      api.addAndGetOTP(exporterEmail).then((validSecurityCode) => {
        cy.keyboardInput(enterCodePage[SECURITY_CODE].input(), validSecurityCode);

        submitButton().click();

        const expectedUrl = `${Cypress.config('baseUrl')}${ROOT}${DASHBOARD}`;

        cy.url().should('eq', expectedUrl);
      });
    });
  });
});

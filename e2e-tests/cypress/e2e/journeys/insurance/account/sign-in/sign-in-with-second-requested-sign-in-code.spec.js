import { enterCodePage } from '../../../../pages/insurance/account/sign-in';
import accountFormFields from '../../../../partials/insurance/accountFormFields';
import { submitButton } from '../../../../pages/shared';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import account from '../../../../../fixtures/account';
import api from '../../../../../support/api';

const {
  START,
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT, ENTER_CODE, REQUEST_NEW_CODE },
  },
  DASHBOARD,
} = ROUTES;

const {
  ACCOUNT: { EMAIL, PASSWORD, SECURITY_CODE },
} = INSURANCE_FIELD_IDS;

context('Insurance - Account - Sign in - I want to enter the new security code sent to my email by UK Export Finance, So that I can sign in into my UKEF digital service account', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    cy.verifyAccountEmail();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`);

    cy.keyboardInput(accountFormFields[EMAIL].input(), account[EMAIL]);
    cy.keyboardInput(accountFormFields[PASSWORD].input(), account[PASSWORD]);

    submitButton().click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${ENTER_CODE}`);

    enterCodePage.requestNewCodeLink().click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${REQUEST_NEW_CODE}`);

    submitButton().click();

    cy.url().should('eq', `${Cypress.config('baseUrl')}${ENTER_CODE}`);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('when submitting a valid security code', () => {
    let validSecurityCode;

    before(async () => {
      /**
       * Create and get an OTP for the exporter's account directly from the API,
       * so that we can assert enter a valid security code and continue the journey.
       * This is to ensure that we are testing a real world scenario.
       *
       * The alternative approach is to either intercept the UI requests and fake the security code validation,
       * or have email inbox testing capabilities which can be risky/flaky.
       * This approach practically mimics "get my security code from my email inbox".
       */
      const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      validSecurityCode = await api.addAndGetOTP(exporterEmail);
    });

    it(`should redirect to ${DASHBOARD}`, () => {
      cy.keyboardInput(enterCodePage[SECURITY_CODE].input(), validSecurityCode);

      submitButton().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      cy.url().should('eq', expectedUrl);
    });
  });
});

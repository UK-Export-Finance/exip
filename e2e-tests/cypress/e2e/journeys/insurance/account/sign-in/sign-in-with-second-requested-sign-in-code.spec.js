import { enterCodePage } from '../../../../pages/insurance/account/sign-in';
import dashboardPage from '../../../../pages/insurance/dashboard';
import accountFormFields from '../../../../partials/insurance/accountFormFields';
import { submitButton } from '../../../../pages/shared';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import account from '../../../../../fixtures/account';

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
  const baseUrl = Cypress.config('baseUrl');

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    cy.verifyAccountEmail();

    cy.assertUrl(`${baseUrl}${SIGN_IN_ROOT}`);

    cy.keyboardInput(accountFormFields[EMAIL].input(), account[EMAIL]);
    cy.keyboardInput(accountFormFields[PASSWORD].input(), account[PASSWORD]);

    submitButton().click();

    cy.assertUrl(`${baseUrl}${ENTER_CODE}`);

    enterCodePage.requestNewCodeLink().click();

    cy.assertUrl(`${baseUrl}${REQUEST_NEW_CODE}`);

    submitButton().click();

    cy.assertUrl(`${baseUrl}${ENTER_CODE}`);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    dashboardPage.table.body.lastRow.referenceNumberLink().click();

    cy.getReferenceNumber().then((referenceNumber) => {
      cy.deleteApplication(referenceNumber);
    });
  });

  describe('when submitting a valid security code', () => {
    let validSecurityCode;

    before(() => {
      // create and get an OTP for the exporter's account
      cy.accountAddAndGetOTP().then((securityCode) => {
        validSecurityCode = securityCode;
      });
    });

    it(`should redirect to ${DASHBOARD}`, () => {
      cy.keyboardInput(enterCodePage[SECURITY_CODE].input(), validSecurityCode);

      submitButton().click();

      const expectedUrl = `${baseUrl}${DASHBOARD}`;

      cy.assertUrl(expectedUrl);
    });
  });
});

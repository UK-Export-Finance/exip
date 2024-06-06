import { enterCodePage } from '../../../../../../pages/insurance/account/sign-in';
import passwordField from '../../../../../../partials/insurance/passwordField';
import { field } from '../../../../../../pages/shared';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import account from '../../../../../../fixtures/account';

const {
  START,
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT, ENTER_CODE, REQUEST_NEW_CODE },
  },
} = ROUTES;

const {
  ACCOUNT: { EMAIL, PASSWORD, ACCESS_CODE },
} = INSURANCE_FIELD_IDS;

context(
  'Insurance - Account - Sign in - Second requested sign in code - I want to enter the new access code sent to my email by UK Export Finance, So that I can sign in into my UKEF digital service account',
  () => {
    const baseUrl = Cypress.config('baseUrl');

    before(() => {
      cy.deleteAccount();

      cy.navigateToUrl(START);

      cy.submitEligibilityAndStartAccountCreation();
      cy.completeAndSubmitCreateAccountForm();

      cy.verifyAccountEmail();

      cy.assertUrl(`${baseUrl}${SIGN_IN_ROOT}`);

      cy.keyboardInput(field(EMAIL).input(), account[EMAIL]);
      cy.keyboardInput(passwordField.input(), account[PASSWORD]);

      cy.clickSubmitButton();

      cy.assertUrl(`${baseUrl}${ENTER_CODE}`);

      enterCodePage.requestNewCodeLink().click();

      cy.assertUrl(`${baseUrl}${REQUEST_NEW_CODE}`);

      cy.clickSubmitButton();

      cy.assertUrl(`${baseUrl}${ENTER_CODE}`);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.getReferenceNumber().then((referenceNumber) => {
        cy.deleteApplication(referenceNumber);
      });
    });

    describe('when submitting a valid access code', () => {
      let validAccessCode;

      before(() => {
        // create and get an OTP for the exporter's account
        cy.accountAddAndGetOTP().then((accessCode) => {
          validAccessCode = accessCode;
        });
      });

      it('should redirect to `all sections`', () => {
        cy.keyboardInput(field(ACCESS_CODE).input(), validAccessCode);

        cy.clickSubmitButton();

        cy.getReferenceNumber().then((referenceNumber) => {
          cy.assertAllSectionsUrl(referenceNumber);
        });
      });
    });
  },
);

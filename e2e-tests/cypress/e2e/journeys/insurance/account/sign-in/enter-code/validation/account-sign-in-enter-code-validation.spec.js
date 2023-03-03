import { submitButton } from '../../../../../../pages/shared';
import { enterCodePage } from '../../../../../../pages/insurance/account/sign-in';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../../constants/routes/insurance';
import api from '../../../../../../../support/api';

const {
  START,
  ACCOUNT: { SIGN_IN: { ENTER_CODE } },
  DASHBOARD,
} = ROUTES;

const {
  ACCOUNT: { SECURITY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: { ACCOUNT: { [SECURITY_CODE]: SECURITY_CODE_ERROR_MESSAGE } },
} = ERROR_MESSAGES;

const field = enterCodePage[SECURITY_CODE];
let value = null;
const fieldIndex = 0;
const TOTAL_REQUIRED_FIELDS = 1;
const expectedMessage = SECURITY_CODE_ERROR_MESSAGE.INCORRECT;

context('Insurance - Account - Sign in - Enter code - validation', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('when the account is verified', () => {
    before(() => {
      cy.verifyAccountEmail();

      cy.completeAndSubmitSignInAccountForm();

      const expectedUrl = `${Cypress.config('baseUrl')}${ENTER_CODE}`;

      cy.url().should('eq', expectedUrl);
    });

    describe('when submitting an empty form', () => {
      it('should render a validation error', () => {
        cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
      });
    });

    describe('when submitting an invalid security code', () => {
      it('should render a validation error and retain the submitted value', () => {
        const invalidSecurityCode = '123456';
        value = invalidSecurityCode;

        cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);

        cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);

        enterCodePage[SECURITY_CODE].input().should('have.value', invalidSecurityCode);
      });
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

        const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT');

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
});

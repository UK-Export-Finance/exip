import { enterCodePage } from '../../../../../../pages/insurance/account/sign-in';
import dashboardPage from '../../../../../../pages/insurance/dashboard';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../../constants/routes/insurance';

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
  const url = `${Cypress.config('baseUrl')}${ENTER_CODE}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    cy.navigateToUrl(url);

    cy.verifyAccountEmail();

    cy.completeAndSubmitSignInAccountForm({});

    cy.url().should('eq', url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    dashboardPage.table.body.lastRow.referenceNumberLink().click();

    cy.getReferenceNumber().then((referenceNumber) => {
      cy.deleteAccountAndApplication(referenceNumber);
    });
  });

  it('should render a validation error when submitting an empty form', () => {
    cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
  });

  it('should render a validation error and retain the submitted value when submitting an invalid security code', () => {
    const invalidSecurityCode = '123456';
    value = invalidSecurityCode;

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);

    enterCodePage[SECURITY_CODE].input().should('have.value', invalidSecurityCode);
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
      cy.navigateToUrl(url);

      cy.completeAndSubmitEnterCodeAccountForm(validSecurityCode);

      const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;

      cy.url().should('eq', expectedUrl);
    });
  });
});

import { field as fieldSelector } from '../../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../../constants/routes/insurance';

const {
  START,
  ACCOUNT: { SIGN_IN: { ENTER_CODE } },
  DASHBOARD,
  ALL_SECTIONS,
  ROOT,
} = ROUTES;

const {
  ACCOUNT: { SECURITY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: { ACCOUNT: { [SECURITY_CODE]: SECURITY_CODE_ERROR_MESSAGE } },
} = ERROR_MESSAGES;

const field = fieldSelector(SECURITY_CODE);
let value = null;
const fieldIndex = 0;
const TOTAL_REQUIRED_FIELDS = 1;
const expectedMessage = String(SECURITY_CODE_ERROR_MESSAGE.INCORRECT);

context('Insurance - Account - Sign in - Enter code - validation', () => {
  const url = `${Cypress.config('baseUrl')}${ENTER_CODE}`;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    cy.navigateToUrl(url);

    cy.verifyAccountEmail();

    cy.completeAndSubmitSignInAccountForm({});

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.getReferenceNumber().then((referenceNumber) => {
      cy.deleteApplication(referenceNumber);
    });
  });

  it('should render a validation error when submitting an empty form', () => {
    cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);
  });

  it('should render a validation error and retain the submitted value when submitting an invalid security code', () => {
    const invalidSecurityCode = '123456';
    value = invalidSecurityCode;

    cy.submitAndAssertFieldErrors(field, value, fieldIndex, TOTAL_REQUIRED_FIELDS, expectedMessage);

    field.input().should('have.value', invalidSecurityCode);
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

      cy.getReferenceNumber().then((referenceNumber) => {
        const expectedUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;
        cy.assertUrl(expectedUrl);
      });
    });
  });
});

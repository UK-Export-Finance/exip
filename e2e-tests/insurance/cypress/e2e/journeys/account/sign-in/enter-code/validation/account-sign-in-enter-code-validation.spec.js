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
  ACCOUNT: { ACCESS_CODE },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: { ACCOUNT: { [ACCESS_CODE]: ACCESS_CODE_ERROR_MESSAGE } },
} = ERROR_MESSAGES;

const field = fieldSelector(ACCESS_CODE);
const expectedErrorMessage = String(ACCESS_CODE_ERROR_MESSAGE.INCORRECT);

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Sign in - Enter code - validation', () => {
  const url = `${baseUrl}${ENTER_CODE}`;

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
    cy.submitAndAssertFieldErrors({ field, expectedErrorMessage });
  });

  it('should render a validation error and retain the submitted value when submitting an invalid access code', () => {
    const invalidAccessCode = '123456';

    cy.submitAndAssertFieldErrors({
      field,
      value: invalidAccessCode,
      expectedErrorMessage,
    });

    field.input().should('have.value', invalidAccessCode);
  });

  describe('when submitting a valid access code', () => {
    let validAccessCode;

    before(() => {
      // create and get an OTP for the exporter's account
      cy.accountAddAndGetOTP().then((accessCode) => {
        validAccessCode = accessCode;
      });
    });

    it(`should redirect to ${DASHBOARD}`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitEnterCodeAccountForm(validAccessCode);

      cy.getReferenceNumber().then((referenceNumber) => {
        const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;
        cy.assertUrl(expectedUrl);
      });
    });
  });
});

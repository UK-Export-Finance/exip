import { brokerPage } from '../../../../../../../pages/insurance/policy';
import { field as fieldSelector } from '../../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const {
  BROKER: {
    USING_BROKER: FIELD_ID,
    EMAIL,
  },
} = FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_ROOT,
  },
} = INSURANCE_ROUTES;

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.POLICY;

const field = brokerPage[FIELD_ID];

const ERROR_ASSERTIONS = {
  errorField: fieldSelector(EMAIL),
  expectedErrorsCount: 5,
  errorIndex: 3,
  errorMessage: BROKER_ERRORS[EMAIL].INCORRECT_FORMAT,
};

context('Insurance - Policy - Broker Page - Validation - Email', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitAboutGoodsOrServicesForm();
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER_ROOT}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should display validation errors when the email field is left empty', () => {
    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, null, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain an @ symbol', () => {
    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'testemail.com';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain at least one dot', () => {
    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@emailcom';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email contains a space', () => {
    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@email. com';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });

  it('should display validation errors when email does not contain a domain', () => {
    field.yesRadioInput().click();

    const {
      errorField, errorIndex, expectedErrorsCount, errorMessage,
    } = ERROR_ASSERTIONS;

    const inputValue = 'test@email.';

    // EMAIL error check
    cy.submitAndAssertFieldErrors(errorField, inputValue, errorIndex, expectedErrorsCount, errorMessage);
  });
});

import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants/validation';
import { assertEmailFieldValidation } from '../../../../../../../shared-test-assertions';

const {
  BROKER_DETAILS: { NAME, EMAIL, FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    BROKER_DETAILS_ROOT,
  },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    POLICY: {
      BROKER_DETAILS: BROKER_DETAILS_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const {
  BROKER_DETAILS: FIELD_STRINGS,
} = POLICY_FIELDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker details page - validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(NAME, () => {
    const { MAXIMUM } = FIELD_STRINGS[NAME];

    const field = fieldSelector(NAME);
    const expectedErrorsCount = 3;

    const ERROR_MESSAGES_OBJECT = BROKER_DETAILS_ERROR_MESSAGES[NAME];

    it(`should render validation errors when ${NAME} is left empty`, () => {
      cy.navigateToUrl(url);

      cy.submitAndAssertFieldErrors({
        field,
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.IS_EMPTY,
      });
    });

    it(`should render validation errors when ${NAME} is over ${MAXIMUM} characters`, () => {
      cy.navigateToUrl(url);

      cy.submitAndAssertFieldErrors({
        field,
        value: 'a'.repeat(MAXIMUM + 1),
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.ABOVE_MAXIMUM,
      });
    });
  });

  assertEmailFieldValidation({
    fieldId: EMAIL,
    errorIndex: 1,
    errorMessages: BROKER_DETAILS_ERROR_MESSAGES[EMAIL],
    totalExpectedErrors: 3,
    totalExpectedOtherErrorsWithValidEmail: 2,
  });

  describe(FULL_ADDRESS, () => {
    const field = fieldSelector(FULL_ADDRESS);

    const textareaField = {
      ...field,
      input: field.textarea,
    };

    const errorIndex = 2;
    const expectedErrorsCount = 3;

    const ERROR_MESSAGES_OBJECT = BROKER_DETAILS_ERROR_MESSAGES[FULL_ADDRESS];

    it(`should render validation errors when ${FULL_ADDRESS} is left empty`, () => {
      cy.navigateToUrl(url);

      cy.submitAndAssertFieldErrors({
        field: textareaField,
        errorIndex,
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.IS_EMPTY,
      });
    });

    it(`should render validation errors when ${FULL_ADDRESS} is over ${MAXIMUM_CHARACTERS.FULL_ADDRESS} characters`, () => {
      cy.navigateToUrl(url);

      cy.submitAndAssertFieldErrors({
        field: textareaField,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.FULL_ADDRESS + 1),
        errorIndex,
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.ABOVE_MAXIMUM,
      });
    });
  });
});

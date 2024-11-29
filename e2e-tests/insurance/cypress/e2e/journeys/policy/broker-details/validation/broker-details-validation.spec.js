import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants/validation';
import { assertEmailFieldValidation } from '../../../../../../../shared-test-assertions';

const {
  BROKER_DETAILS: { NAME, EMAIL, IS_BASED_IN_UK, POSTCODE, BUILDING_NUMBER_OR_NAME },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_DETAILS_ROOT },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    POLICY: { BROKER_DETAILS: BROKER_DETAILS_ERROR_MESSAGES },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker details page - validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'broker', usingBroker: true });

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

    it(`should render validation errors when ${NAME} is over ${MAXIMUM_CHARACTERS.BROKER_NAME} characters`, () => {
      cy.navigateToUrl(url);

      cy.submitAndAssertFieldErrors({
        field,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.BROKER_NAME + 1),
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

  describe(`when ${IS_BASED_IN_UK} is 'yes'`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();
    });

    it(`should render a validation error when ${POSTCODE} is not provided`, () => {
      const field = fieldSelector(POSTCODE);

      const ERROR_MESSAGES_OBJECT = BROKER_DETAILS_ERROR_MESSAGES[POSTCODE];

      cy.submitAndAssertFieldErrors({
        field,
        value: '',
        errorIndex: 2,
        expectedErrorsCount: 4,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.IS_EMPTY,
      });
    });

    it(`should render a validation error when ${BUILDING_NUMBER_OR_NAME} is not provided`, () => {
      const field = fieldSelector(BUILDING_NUMBER_OR_NAME);

      const ERROR_MESSAGES_OBJECT = BROKER_DETAILS_ERROR_MESSAGES[BUILDING_NUMBER_OR_NAME];

      cy.submitAndAssertFieldErrors({
        field,
        value: '',
        errorIndex: 3,
        expectedErrorsCount: 4,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.IS_EMPTY,
      });
    });

    it(`should render a validation error when ${BUILDING_NUMBER_OR_NAME} is above the maximum`, () => {
      const field = fieldSelector(BUILDING_NUMBER_OR_NAME);

      const ERROR_MESSAGES_OBJECT = BROKER_DETAILS_ERROR_MESSAGES[BUILDING_NUMBER_OR_NAME];

      cy.submitAndAssertFieldErrors({
        field,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.BROKER_BUILDING_NUMBER_OR_NAME) + 1,
        errorIndex: 3,
        expectedErrorsCount: 4,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.ABOVE_MAXIMUM,
      });
    });
  });
});

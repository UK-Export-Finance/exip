import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ACCOUNT_FIELDS } from '../../../../../../../content-strings/fields/insurance/account';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { assertEmailFieldValidation } from '../../../../../../../shared-test-assertions';

const ERRORS = ERROR_MESSAGES.INSURANCE.POLICY.DIFFERENT_NAME_ON_POLICY;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    DIFFERENT_NAME_ON_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    DIFFERENT_NAME_ON_POLICY: {
      POSITION,
    },
  },
  ACCOUNT: {
    FIRST_NAME, LAST_NAME, EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const {
  MAXIMUM: {
    NAME: { CHARACTERS: MAX_NAME_CHARACTERS },
  },
} = ACCOUNT_FIELDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Different name on Policy page - Validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;

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

  describe(FIRST_NAME, () => {
    const FIELD_ID = FIRST_NAME;
    const ERROR = ERRORS[FIELD_ID];

    const { field, numberOfExpectedErrors, errorIndex } = {
      field: fieldSelector(FIELD_ID),
      numberOfExpectedErrors: 4,
      errorIndex: 0,
    };

    it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
      const value = '';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.IS_EMPTY);
    });

    it(`should render validation errors when ${FIELD_ID} is over ${MAX_NAME_CHARACTERS} characters`, () => {
      const value = 'a'.repeat(MAX_NAME_CHARACTERS + 1);

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.ABOVE_MAXIMUM);
    });

    it(`should render validation errors when ${FIELD_ID} contains a special character`, () => {
      const value = 'a!';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.INCORRECT_FORMAT);
    });

    it(`should render validation errors when ${FIELD_ID} contains a number`, () => {
      const value = 'a1';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.INCORRECT_FORMAT);
    });

    it(`should render validation errors when ${FIELD_ID} contains a number and special character`, () => {
      const value = 'a1!';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.INCORRECT_FORMAT);
    });
  });

  describe(LAST_NAME, () => {
    const FIELD_ID = LAST_NAME;
    const ERROR = ERRORS[FIELD_ID];

    const { field, numberOfExpectedErrors, errorIndex } = {
      field: fieldSelector(FIELD_ID),
      numberOfExpectedErrors: 4,
      errorIndex: 1,
    };

    it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
      const value = '';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.IS_EMPTY);
    });

    it(`should render validation errors when ${FIELD_ID} is over ${MAX_NAME_CHARACTERS} characters`, () => {
      const value = 'a'.repeat(MAX_NAME_CHARACTERS + 1);

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.ABOVE_MAXIMUM);
    });

    it(`should render validation errors when ${FIELD_ID} contains a special character`, () => {
      const value = 'a!';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.INCORRECT_FORMAT);
    });

    it(`should render validation errors when ${FIELD_ID} contains a number`, () => {
      const value = 'a1';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.INCORRECT_FORMAT);
    });

    it(`should render validation errors when ${FIELD_ID} contains a number and special character`, () => {
      const value = 'a1!';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, ERROR.INCORRECT_FORMAT);
    });
  });

  describe(EMAIL, () => {
    const FIELD_ID = EMAIL;

    assertEmailFieldValidation({
      fieldId: EMAIL,
      errorIndex: 2,
      errorMessages: ERRORS[FIELD_ID],
      totalExpectedErrors: 4,
      totalExpectedOtherErrorsWithValidEmail: 3,
      assertMaximumLength: true,
    });
  });

  describe(POSITION, () => {
    const FIELD_ID = POSITION;
    const ERROR = ERRORS[FIELD_ID];

    const ERROR_ASSERTIONS = {
      field: fieldSelector(FIELD_ID),
      numberOfExpectedErrors: 4,
      errorIndex: 3,
    };

    it(`should render validation errors when ${FIELD_ID} left empty`, () => {
      const errorMessage = ERROR.IS_EMPTY;

      const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;
      const value = '';

      cy.submitAndAssertFieldErrors(field, value, errorIndex, numberOfExpectedErrors, errorMessage);
    });
  });
});

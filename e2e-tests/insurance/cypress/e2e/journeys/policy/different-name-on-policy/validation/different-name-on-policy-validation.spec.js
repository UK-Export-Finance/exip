import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ACCOUNT_FIELDS } from '../../../../../../../content-strings/fields/insurance/account';
import { POLICY_FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
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

const {
  DIFFERENT_NAME_ON_POLICY: {
    [POSITION]: {
      MAXIMUM: MAX_POSITION_CHARACTERS,
    },
  },
} = POLICY_FIELDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Different name on Policy page - Validation', () => {
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

    const assertions = {
      field: fieldSelector(FIELD_ID),
      expectedErrorsCount: 4,
    };

    it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR.IS_EMPTY });
    });

    it(`should render validation errors when ${FIELD_ID} is over ${MAX_NAME_CHARACTERS} characters`, () => {
      const value = 'a'.repeat(MAX_NAME_CHARACTERS + 1);

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.ABOVE_MAXIMUM });
    });

    it(`should render validation errors when ${FIELD_ID} contains a special character`, () => {
      const value = 'a!';

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.INCORRECT_FORMAT });
    });

    it(`should render validation errors when ${FIELD_ID} contains a number`, () => {
      const value = 'a1';

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.INCORRECT_FORMAT });
    });

    it(`should render validation errors when ${FIELD_ID} contains a number and special character`, () => {
      const value = 'a1!';

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.INCORRECT_FORMAT });
    });
  });

  describe(LAST_NAME, () => {
    const FIELD_ID = LAST_NAME;
    const ERROR = ERRORS[FIELD_ID];

    const assertions = {
      field: fieldSelector(FIELD_ID),
      errorIndex: 1,
      expectedErrorsCount: 4,
    };

    it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR.IS_EMPTY });
    });

    it(`should render validation errors when ${FIELD_ID} is over ${MAX_NAME_CHARACTERS} characters`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a'.repeat(MAX_NAME_CHARACTERS + 1),
        expectedErrorMessage: ERROR.ABOVE_MAXIMUM,
      });
    });

    it(`should render validation errors when ${FIELD_ID} contains a special character`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a!',
        expectedErrorMessage: ERROR.INCORRECT_FORMAT,
      });
    });

    it(`should render validation errors when ${FIELD_ID} contains a number`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a2',
        expectedErrorMessage: ERROR.INCORRECT_FORMAT,
      });
    });

    it(`should render validation errors when ${FIELD_ID} contains a number and special character`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a1!',
        expectedErrorMessage: ERROR.INCORRECT_FORMAT,
      });
    });
  });

  assertEmailFieldValidation({
    fieldId: EMAIL,
    errorIndex: 2,
    errorMessages: ERRORS[EMAIL],
    totalExpectedErrors: 4,
    totalExpectedOtherErrorsWithValidEmail: 3,
  });

  describe(POSITION, () => {
    const FIELD_ID = POSITION;
    const ERROR = ERRORS[FIELD_ID];

    const assertions = {
      field: fieldSelector(FIELD_ID),
      errorIndex: 3,
      expectedErrorsCount: 4,
    };

    it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR.IS_EMPTY });
    });

    it(`should render validation errors when ${FIELD_ID} is over ${MAX_POSITION_CHARACTERS} characters`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a'.repeat(MAX_POSITION_CHARACTERS + 1),
        expectedErrorMessage: ERROR.ABOVE_MAXIMUM,
      });
    });

    it(`should render validation errors when ${FIELD_ID} contains a special character`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a!',
        expectedErrorMessage: ERROR.INCORRECT_FORMAT,
      });
    });

    it(`should render validation errors when ${FIELD_ID} contains a number`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a1',
        expectedErrorMessage: ERROR.INCORRECT_FORMAT,
      });
    });

    it(`should render validation errors when ${FIELD_ID} contains a number and special character`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a2!',
        expectedErrorMessage: ERROR.INCORRECT_FORMAT,
      });
    });
  });
});

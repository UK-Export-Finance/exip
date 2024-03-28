import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { POLICY_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/policy';
import account from '../../../../../../../fixtures/account';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    DIFFERENT_NAME_ON_POLICY,
    NAME_ON_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    NAME_ON_POLICY: {
      NAME, POSITION, SAME_NAME, OTHER_NAME,
    },
  },
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
  },
} = INSURANCE_FIELD_IDS;

const {
  NAME_ON_POLICY: {
    OPTIONS,
    [POSITION]: { MAXIMUM },
  },
} = FIELDS;

const NAME_ON_POLICY_ERRORS = ERROR_MESSAGES.INSURANCE.POLICY.NAME_ON_POLICY;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Name on policy - Validation', () => {
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

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when no radios are selected', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should display validation error', () => {
      const expectedErrorsCount = 1;
      const expectedErrorMessage = NAME_ON_POLICY_ERRORS[NAME].IS_EMPTY;

      cy.submitAndAssertRadioErrors({
        field: fieldSelector(SAME_NAME),
        expectedErrorsCount,
        expectedErrorMessage,
      });
    });
  });

  describe(POSITION, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      fieldSelector(SAME_NAME).label().click();
    });

    const assertions = {
      field: fieldSelector(POSITION),
    };

    const ERROR = NAME_ON_POLICY_ERRORS[POSITION];

    describe(`when ${POSITION} is left empty`, () => {
      it('should render validation errors', () => {
        cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR.IS_EMPTY });
      });

      it(`should render the ${SAME_NAME} radio text`, () => {
        const nameAndEmail = `${account[FIRST_NAME]} ${account[LAST_NAME]} (${account[EMAIL]})`;
        cy.checkText(fieldSelector(SAME_NAME).label(), nameAndEmail);
      });

      it(`should render the ${OTHER_NAME} radio text`, () => {
        cy.checkText(fieldSelector(OTHER_NAME).label(), OPTIONS.OTHER_NAME.TEXT);
      });
    });

    it(`should render validation errors when ${POSITION} is over ${MAXIMUM} characters`, () => {
      const value = 'a'.repeat(FIELDS.NAME_ON_POLICY[POSITION].MAXIMUM + 1);

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.ABOVE_MAXIMUM });
    });

    it(`should render validation errors when ${POSITION} contains a special character`, () => {
      const value = 'a!';

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.INCORRECT_FORMAT });
    });

    it(`should render validation errors when ${POSITION} contains a number`, () => {
      const value = 'a1';

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.INCORRECT_FORMAT });
    });

    it(`should render validation errors when ${POSITION} contains a number and special character`, () => {
      const value = 'a1!';

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.INCORRECT_FORMAT });
    });
  });

  describe(`when ${OTHER_NAME} is selected`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should NOT display validation error, but redirect to the next page', () => {
      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });

      cy.assertErrorSummaryListDoesNotExist();

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;
      cy.assertUrl(expectedUrl);
    });
  });
});

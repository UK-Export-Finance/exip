import { field as fieldSelector } from '../../../../../../../pages/shared';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants/validation';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import mockNameWithSpecialCharacters from '../../../../../../../fixtures/name-with-special-characters';

const ERRORS = ERROR_MESSAGES.INSURANCE.POLICY;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    LOSS_PAYEE_DETAILS_ROOT,
  },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    LOSS_PAYEE_DETAILS: {
      NAME,
      LOCATION,
      IS_LOCATED_IN_UK,
    },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Loss Payee Details - Validation', () => {
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
      cy.completeAndSubmitBrokerForm({ usingBroker: false });
      cy.completeAndSubmitLossPayeeForm({ appointingLossPayee: true });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`;

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
    const FIELD_ID = NAME;
    const ERROR = ERRORS[FIELD_ID];

    const assertions = {
      field: fieldSelector(FIELD_ID),
      expectedErrorsCount: 2,
    };

    it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage: ERROR.IS_EMPTY });
    });

    it(`should render validation errors when ${FIELD_ID} is over ${MAXIMUM_CHARACTERS.LOSS_PAYEE_NAME} characters`, () => {
      const value = 'a'.repeat(MAXIMUM_CHARACTERS.LOSS_PAYEE_NAME + 1);

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR.ABOVE_MAXIMUM });
    });

    it(`should not render validation errors when ${FIELD_ID} contains numbers and special characters`, () => {
      const nameValue = mockNameWithSpecialCharacters('name');
      cy.keyboardInput(fieldSelector(FIELD_ID).input(), nameValue);

      cy.clickSubmitButton();

      cy.assertErrorSummaryListLength(1);
    });
  });

  describe(LOCATION, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    const FIELD_ID = LOCATION;
    const ERROR = ERRORS[FIELD_ID];

    it('should display validation error when radio is not selected', () => {
      const radioField = {
        ...fieldSelector(FIELD_ID),
        input: fieldSelector(`${LOCATION}-${IS_LOCATED_IN_UK}`).input,
      };

      cy.submitAndAssertRadioErrors({
        field: radioField,
        errorIndex: 1,
        expectedErrorsCount: 2,
        expectedErrorMessage: ERROR.IS_EMPTY,
      });
    });
  });
});

import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { ACCOUNT_FIELDS } from '../../../../../../../content-strings/fields/insurance/account';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';

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

const {
  MAXIMUM: {
    NAME: { CHARACTERS: MAX_NAME_CHARACTERS },
  },
} = ACCOUNT_FIELDS;

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

    const { field, numberOfExpectedErrors, errorIndex } = {
      field: fieldSelector(FIELD_ID),
      numberOfExpectedErrors: 2,
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
  });

  describe(LOCATION, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    const FIELD_ID = LOCATION;
    const ERROR = ERRORS[FIELD_ID];

    it('should display validation error when radio is not selected', () => {
      const expectedErrorsCount = 2;
      const expectedErrorMessage = ERROR.IS_EMPTY;

      const radioField = {
        ...fieldSelector(FIELD_ID),
        input: fieldSelector(`${LOCATION}-${IS_LOCATED_IN_UK}`).input,
      };

      cy.submitAndAssertRadioErrors(
        radioField,
        1,
        expectedErrorsCount,
        expectedErrorMessage,
      );
    });
  });
});

import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';

const ERRORS = ERROR_MESSAGES.INSURANCE.POLICY;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    LOSS_PAYEE_FINANCIAL_UK_ROOT,
  },
} = INSURANCE_ROUTES;

const {
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const FIELD_ID = FINANCIAL_ADDRESS;

const MAXIMUM = MAXIMUM_CHARACTERS.FULL_ADDRESS;

context('Insurance - Policy - Loss Payee Financial details UK - Financial address - Validation', () => {
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
      cy.completeAndSubmitLossPayeeDetailsForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_UK_ROOT}`;

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

  const ERROR = ERRORS[FIELD_ID];

  const { numberOfExpectedErrors, errorIndex } = {
    numberOfExpectedErrors: 3,
    errorIndex: 2,
  };

  const financialAddressField = fieldSelector(FIELD_ID);

  const textareaField = {
    ...financialAddressField,
    input: financialAddressField.textarea,
  };

  it(`should render validation errors when ${FIELD_ID} is left empty`, () => {
    const value = '';

    cy.submitAndAssertFieldErrors(textareaField, value, errorIndex, numberOfExpectedErrors, ERROR.IS_EMPTY);
  });

  it(`should render validation errors when ${FIELD_ID} is over ${MAXIMUM} characters`, () => {
    const value = '1'.repeat(MAXIMUM + 1);

    cy.submitAndAssertFieldErrors(textareaField, value, errorIndex, numberOfExpectedErrors, ERROR.ABOVE_MAXIMUM);
  });
});

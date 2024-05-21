import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { bicSwiftCodeFieldValidation } from '../../../../../../../shared-test-assertions';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/policy';
import { field as fieldSelector } from '../../../../../../../pages/shared';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: {
    LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT,
  },
} = INSURANCE_ROUTES;

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: {
    BIC_SWIFT_CODE: FIELD_ID,
  },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Loss Payee Financial Details International - BIC/SWIFT code - Validation', () => {
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
      cy.completeAndSubmitLossPayeeForm({ isAppointingLossPayee: true });
      cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK: false });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`;

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

  bicSwiftCodeFieldValidation();

  describe(`when ${FIELD_ID} is correctly entered with lowercase letters and numbers`, () => {
    it('should not render validation errors', () => {
      cy.keyboardInput(fieldSelector(FIELD_ID).input(), 'letters123');

      cy.clickSubmitButton();

      cy.assertErrorSummaryListLength(2);
    });
  });
});

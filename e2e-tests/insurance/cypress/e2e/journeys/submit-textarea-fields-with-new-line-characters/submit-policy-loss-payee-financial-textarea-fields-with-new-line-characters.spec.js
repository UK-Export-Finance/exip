import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { EXPECTED_MULTI_LINE_STRING } from '../../../../../constants';

const {
  ROOT,
  POLICY: { LOSS_PAYEE_DETAILS_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT },
} = INSURANCE_ROUTES;

const {
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Textarea fields - Loss payee financial details textarea fields should render new lines without character codes after submission', () => {
  let referenceNumber;
  let nominatedLossPayeeUrl;
  let financialUkUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      /**
       * Set the default state of the policy section,
       * so that all optional fields are required.
       */
      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm({});
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({ sameName: true });
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: false });
      cy.completeAndSubmitLossPayeeForm({ isAppointingLossPayee: true });
      cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK: true });

      nominatedLossPayeeUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`;
      financialUkUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`${FINANCIAL_ADDRESS} - financial details UK`, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(financialUkUrl);

        cy.completeAndSubmitLossPayeeFinancialDetailsUkForm({});

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: FINANCIAL_ADDRESS,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });

  describe(`${FINANCIAL_ADDRESS} - financial details international`, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(nominatedLossPayeeUrl);

        cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK: false });
        cy.completeAndSubmitLossPayeeFinancialDetailsInternationalForm({});

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: FINANCIAL_ADDRESS,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });
});

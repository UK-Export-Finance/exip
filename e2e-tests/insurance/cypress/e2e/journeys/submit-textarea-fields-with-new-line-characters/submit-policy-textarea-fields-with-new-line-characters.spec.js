import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { MULTI_LINE_STRING, EXPECTED_MULTI_LINE_STRING } from '../../../../../constants';

const {
  ROOT,
  POLICY: { PRE_CREDIT_PERIOD, BROKER_MANUAL_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const {
  CREDIT_PERIOD_WITH_BUYER,
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Textarea fields - `Policy` textarea fields should render new lines without character codes after submission', () => {
  let referenceNumber;
  let preCreditPeriodUrl;
  let brokerManualAddressUrl;

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
      cy.completeAndSubmitNameOnPolicyForm({ sameName: false });
      cy.completeAndSubmitDifferentNameOnPolicyForm({});
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({ usingBroker: true });

      preCreditPeriodUrl = `${baseUrl}${ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;
      brokerManualAddressUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`;
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(CREDIT_PERIOD_WITH_BUYER, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(preCreditPeriodUrl);

        cy.completeAndSubmitPreCreditPeriodForm({
          needPreCreditPeriod: true,
          description: MULTI_LINE_STRING,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: CREDIT_PERIOD_WITH_BUYER,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });

  describe(FULL_ADDRESS, () => {
    describe('when submitting the textarea field with new lines va the `enter` key and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(brokerManualAddressUrl);

        cy.completeAndSubmitBrokerManualAddressForm({
          fullAddress: MULTI_LINE_STRING,
        });

        cy.clickBackLink();
      });

      it('should render new line characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: FULL_ADDRESS,
          expectedValue: EXPECTED_MULTI_LINE_STRING,
        });
      });
    });
  });
});

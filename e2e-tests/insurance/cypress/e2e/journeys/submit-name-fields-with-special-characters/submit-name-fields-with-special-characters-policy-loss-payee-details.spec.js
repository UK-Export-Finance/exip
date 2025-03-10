import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { field } from '../../../../../pages/shared';
import application from '../../../../../fixtures/application';

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { LOSS_PAYEE_DETAILS_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT },
} = INSURANCE_ROUTES;

const {
  LOSS_PAYEE_DETAILS: { NAME },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const { POLICY } = application;

const nameValue = `${POLICY[NAME]}-'`;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Name fields - Loss payee details - Name field should render special characters without character codes after submission', () => {
  let referenceNumber;
  let url;
  let financialUkUrl;
  let financialInternationalUrl;

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

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`;
      financialUkUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;
      financialInternationalUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`;

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
    describe('when submitting the name field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(url);

        cy.completeAndSubmitLossPayeeDetailsForm({ name: nameValue });

        cy.clickBackLink();

        cy.assertUrl(url);
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkValue(field(NAME), nameValue);
      });
    });
  });

  describe(`${FINANCIAL_ADDRESS} - financial details UK`, () => {
    describe('when submitting the name field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(url);

        cy.completeAndSubmitLossPayeeDetailsForm({});
        cy.completeAndSubmitLossPayeeFinancialDetailsUkForm({ financialAddress: nameValue });

        cy.clickBackLink();

        cy.assertUrl(financialUkUrl);
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: FINANCIAL_ADDRESS,
          expectedValue: nameValue,
        });
      });
    });
  });

  describe(`${FINANCIAL_ADDRESS} - financial details international`, () => {
    describe('when submitting the name field with special characters and going back to the page', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(url);

        cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK: false });
        cy.completeAndSubmitLossPayeeFinancialDetailsInternationalForm({ financialAddress: nameValue });

        cy.clickBackLink();

        cy.assertUrl(financialInternationalUrl);
      });

      it('should render special characters exactly as they were submitted', () => {
        cy.checkTextareaValue({
          fieldId: FINANCIAL_ADDRESS,
          expectedValue: nameValue,
        });
      });
    });
  });
});

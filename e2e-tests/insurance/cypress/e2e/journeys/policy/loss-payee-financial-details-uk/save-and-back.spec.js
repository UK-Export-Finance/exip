import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_FINANCIAL_UK: {
    ACCOUNT_NUMBER, SORT_CODE,
  },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Loss Payee Financial Details - UK page - Save and go back - As an Exporter, I want to be able to save my entries on the page, So that I can continue the application at a later date without losing progress', () => {
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
      cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form', () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsInProgress();
    });
  });

  describe(`when submitting a form with only ${ACCOUNT_NUMBER} via 'save and go back' button`, () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeLossPayeeFinancialDetailsUkForm({
        sortCode: null,
        financialAddress: null,
      });

      cy.clickSaveAndBackButton();

      cy.checkTaskPolicyStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertLossPayeeFinancialUkFieldValues({
          expectedSortCode: null,
          expectedFinancialAddress: null,
        });
      });
    });
  });

  describe(`when submitting a form with only ${SORT_CODE} via 'save and go back' button`, () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeLossPayeeFinancialDetailsUkForm({
        accountNumber: null,
        financialAddress: null,
        clearInputs: true,
      });

      cy.clickSaveAndBackButton();

      cy.checkTaskPolicyStatusIsInProgress();
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertLossPayeeFinancialUkFieldValues({
          expectedAccountNumber: null,
          expectedFinancialAddress: null,
          clearInputs: true,
        });
      });
    });
  });

  describe(`when submitting a form with only ${FINANCIAL_ADDRESS} via 'save and go back' button`, () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeLossPayeeFinancialDetailsUkForm({
        accountNumber: null,
        sortCode: null,
        clearInputs: true,
      });

      cy.clickSaveAndBackButton();

      cy.checkTaskPolicyStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertLossPayeeFinancialUkFieldValues({
          expectedAccountNumber: null,
          expectedSortCode: null,
          clearInputs: true,
        });
      });
    });
  });

  describe('when all fields are provided', () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `completed`', () => {
      cy.navigateToUrl(url);

      cy.completeLossPayeeFinancialDetailsUkForm({});

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskPolicyStatusIsComplete();
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.startInsurancePolicySection({});

        // go through 9 policy forms.
        cy.clickSubmitButtonMultipleTimes({ count: 9 });

        cy.assertLossPayeeFinancialUkFieldValues({});
      });
    });
  });
});

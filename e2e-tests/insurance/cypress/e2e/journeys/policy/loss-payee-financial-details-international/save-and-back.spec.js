import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: {
    BIC_SWIFT_CODE, IBAN,
  },
  FINANCIAL_ADDRESS,
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: {
    LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Loss Payee Financial Details - International - Save and go back - As an Exporter, I want to be able to save my entries on the page, So that I can continue the application at a later date without losing progress', () => {
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

      url = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`;

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

  describe(`when submitting a form with only ${BIC_SWIFT_CODE} via 'save and go back' button`, () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeLossPayeeFinancialDetailsInternationalForm({
        iban: null,
        financialAddress: null,
      });

      cy.clickSaveAndBackButton();

      cy.checkTaskPolicyStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertLossPayeeFinancialInternationalFieldValues({
          expectedIban: null,
          expectedFinancialAddress: null,
        });
      });
    });
  });

  describe(`when submitting a form with only ${IBAN} via 'save and go back' button`, () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeLossPayeeFinancialDetailsInternationalForm({
        bicSwiftCode: null,
        financialAddress: null,
        clearInputs: true,
      });

      cy.clickSaveAndBackButton();

      cy.checkTaskPolicyStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertLossPayeeFinancialInternationalFieldValues({
          expectedBicSwiftCode: null,
          expectedFinancialAddress: null,
          clearInputs: true,
        });
      });
    });
  });

  describe(`when submitting a form with only ${FINANCIAL_ADDRESS} via 'save and go back' button`, () => {
    it('should redirect to `all sections` and retain the `insurance policy` task status as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeLossPayeeFinancialDetailsInternationalForm({
        bicSwiftCode: null,
        iban: null,
        clearInputs: true,
      });

      cy.clickSaveAndBackButton();

      cy.checkTaskPolicyStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertLossPayeeFinancialInternationalFieldValues({
          expectedBicSwiftCode: null,
          expectedIban: null,
          clearInputs: true,
        });
      });
    });
  });

  describe('when all fields are provided', () => {
    it('should redirect to `all sections` and update the `insurance policy` task status to `completed`', () => {
      cy.navigateToUrl(url);

      cy.completeLossPayeeFinancialDetailsInternationalForm({});

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

        cy.assertLossPayeeFinancialInternationalFieldValues({});
      });
    });
  });
});

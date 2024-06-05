import { FIELD_VALUES } from '../../../../../constants';

const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

context('Insurance - Policy - Complete the entire section as a multiple contract policy', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm({ policyType });
      cy.completeAndSubmitMultipleContractPolicyForm({});
      cy.completeAndSubmitExportValueForm({ policyType });
      cy.completeAndSubmitNameOnPolicyForm({});
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({});
      cy.completeAndSubmitLossPayeeForm({});

      /**
       * Submit the "Policy - check your answers" form,
       * This proceeds to the next part of the flow - "All sections"
       */
      cy.clickSubmitButton();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should change the `type of policy`` task status to `completed` in the `all sections` page', () => {
    cy.assertAllSectionsUrl(referenceNumber);

    cy.checkTaskPolicyStatusIsComplete();
  });
});

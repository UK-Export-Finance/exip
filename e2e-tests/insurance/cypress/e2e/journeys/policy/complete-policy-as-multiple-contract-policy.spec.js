import { FIELD_VALUES, ROUTES } from '../../../../../constants';

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
  },
} = ROUTES;

const policyType = FIELD_VALUES.POLICY_TYPE.MULTIPLE;

const baseUrl = Cypress.config('baseUrl');

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
       * This proceeds to the next part of the flow - "Export contract - start"
       * From here, we can get back to the "All sections" page.
       */
      cy.clickSubmitButton();
      cy.clickAllSectionsLink();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should change the 'type of policy' task status to 'completed' in the ${ALL_SECTIONS} page`, () => {
    const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

    cy.assertUrl(expectedUrl);

    cy.checkTaskPolicyStatusIsComplete();
  });
});

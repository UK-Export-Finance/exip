import { FIELD_VALUES, ROUTES } from '../../../../../constants';

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Complete the entire section as a single contract policy', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
      cy.completeAndSubmitSingleContractPolicyForm({});
      cy.completeAndSubmitTotalContractValueForm({});
      cy.completeAndSubmitNameOnPolicyForm({});
      cy.completeAndSubmitPreCreditPeriodForm({});
      cy.completeAndSubmitAnotherCompanyForm({});
      cy.completeAndSubmitBrokerForm({});

      // go back to the all sections page
      cy.clickSaveAndBackButton();
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

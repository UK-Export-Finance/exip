import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_SERVICE },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent service - Save and go back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitExportContractForms({ stopSubmittingAfter: 'agentDetails', isUsingAgent: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_SERVICE}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.clickSaveAndBackButton();
    });

    it('should redirect to `all sections`', () => {
      cy.assertAllSectionsUrl(referenceNumber);
    });
  });

  describe('when fields are partially completed', () => {
    it('should retain the status of task `export contract` as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeAgentServiceForm({
        serviceDescription: '',
      });

      cy.clickSaveAndBackButton();

      cy.assertAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted value', () => {
        cy.navigateToUrl(url);

        cy.assertAgentServiceFieldValues({
          expectedDescription: '',
        });
      });
    });
  });

  describe('when all fields are provided - agentIsCharging as false', () => {
    it('should update the `export contract` task status to `completed`', () => {
      cy.navigateToUrl(url);

      cy.completeAgentServiceForm({ agentIsCharging: false });

      cy.clickSaveAndBackButton();

      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsComplete();
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.startInsuranceExportContractSection({});

        // go through 5 export contract forms.
        cy.clickSubmitButtonMultipleTimes({ count: 5 });

        cy.assertAgentServiceFieldValues({});
      });
    });
  });

  describe('when all fields are provided - agentIsCharging as true', () => {
    it('should retain the status of task `export contract` as `in progress`', () => {
      cy.navigateToUrl(url);

      cy.completeAgentServiceForm({ agentIsCharging: true });

      cy.clickSaveAndBackButton();

      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.checkTaskExportContractStatusIsInProgress();
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.startInsuranceExportContractSection({});

        // go through 5 export contract forms.
        cy.clickSubmitButtonMultipleTimes({ count: 5 });

        cy.assertAgentServiceFieldValues({ agentIsCharging: true });
      });
    });
  });
});

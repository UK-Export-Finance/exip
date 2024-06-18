context('Insurance - Complete `prepare your application` tasks', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      cy.navigateToAllSectionsUrl(referenceNumber);

      cy.assertAllSectionsUrl(referenceNumber);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToAllSectionsUrl(referenceNumber);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('`prepare application` tasks', () => {
    it('renders a `your business` task with a status of `completed`', () => {
      cy.checkTaskBusinessStatusIsComplete();
    });

    it('renders a `your buyer` task with a status of `completed`', () => {
      cy.checkTaskBuyerStatusIsComplete();
    });

    it('renders a `type of policy` task with a status of `completed`', () => {
      cy.checkTaskPolicyStatusIsComplete();
    });

    it('renders a `export contract` task with a status of `completed`', () => {
      cy.checkTaskExportContractStatusIsComplete();
    });
  });

  describe('`submit application` tasks', () => {
    it('renders a `check your answers` task with a status of `not started yet`', () => {
      cy.checkTaskCheckAnswersStatusIsNotStartedYet();
    });

    it('renders a `declarations` task with a status of `not started yet`', () => {
      cy.checkTaskCheckAnswersStatusIsNotStartedYet();
    });
  });
});

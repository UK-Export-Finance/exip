import { APPLICATION } from '../../../../../../constants';

context('Insurance - submit an application - Multiple policy type, attempted private market cover, using an agent, agent is charging', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      totalContractValueOverThreshold: true,
      attemptedPrivateMarketCover: true,
      isUsingAgent: true,
      agentIsCharging: true,
    }).then((refNumber) => {
      referenceNumber = refNumber;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should successfully submit the application and redirect to `application submitted`', () => {
    cy.assertApplicationSubmittedUrl(referenceNumber);
  });
});

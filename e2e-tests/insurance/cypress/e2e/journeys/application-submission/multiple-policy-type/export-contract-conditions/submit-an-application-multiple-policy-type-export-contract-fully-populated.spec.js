import { APPLICATION } from '../../../../../../../constants';

context('Insurance - submit an application - Multiple policy type, fully populated export contract', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      agentIsCharging: true,
      agentChargeMethodFixedSum: true,
      attemptedPrivateMarketCover: true,
      isUsingAgent: true,
      finalDestinationKnown: true,
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      totalContractValueOverThreshold: true,
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

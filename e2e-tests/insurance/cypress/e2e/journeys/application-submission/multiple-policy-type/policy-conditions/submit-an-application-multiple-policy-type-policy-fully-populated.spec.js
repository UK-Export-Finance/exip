import { APPLICATION } from '../../../../../../../constants';

context('Insurance - submit an application - Multiple policy type - fully populated', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      policyType: APPLICATION.POLICY_TYPE.MULTIPLE,
      differentPolicyContact: true,
      isAppointingLossPayee: true,
      needPreCreditPeriod: true,
      otherCompanyInvolved: true,
      totalContractValueOverThreshold: true,
      hasHadCreditInsuranceCoverWithBuyer: true,
      usingBroker: true,
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

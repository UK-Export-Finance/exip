context('Insurance - submit an application - Single policy type - fully populated', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      differentPolicyContact: true,
      isAppointingLossPayee: true,
      needPreCreditPeriod: true,
      otherCompanyInvolved: true,
      totalContractValueOverThreshold: true,
      hasHadCreditInsuranceCoverWithBuyer: true,
      usingBroker: true,
      brokerIsBasedInUk: true,
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

  it('should render the application in a `submitted` state in the dashboard', () => {
    cy.assertDashboardApplicationSubmitted(referenceNumber);
  });
});

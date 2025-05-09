context('Insurance - submit an application - Single policy type, Loss payee - Financial details UK ', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      isAppointingLossPayee: true,
      lossPayeeIsLocatedInUK: true,
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

context('Insurance - submit an application - Single policy type, exporter has connection with buyer', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      hasConnectionToBuyer: true,
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

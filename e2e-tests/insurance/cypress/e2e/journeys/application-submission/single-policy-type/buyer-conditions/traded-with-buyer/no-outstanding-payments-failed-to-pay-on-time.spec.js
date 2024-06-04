context('Insurance - submit an application - Single policy type, exporter has traded with buyer, no outstanding payments, failed to pay on time', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      exporterHasTradedWithBuyer: true,
      buyerOutstandingPayments: false,
      buyerFailedToPayOnTime: true,
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

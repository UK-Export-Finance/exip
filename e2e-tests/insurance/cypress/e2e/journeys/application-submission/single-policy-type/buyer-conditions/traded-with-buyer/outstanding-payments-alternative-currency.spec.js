context('Insurance - submit an application - Single policy type, exporter has traded with buyer, has outstanding payments, alternative currency', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      alternativeBuyerCurrency: true,
      exporterHasTradedWithBuyer: true,
      buyerOutstandingPayments: true,
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

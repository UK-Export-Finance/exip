context('Insurance - submit an application - Single policy type, exporter has connection with buyer, has traded with buyer before', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      hasConnectionToBuyer: true,
      exporterHasTradedWithBuyer: true,
      fullyPopulatedBuyerTradingHistory: true,
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

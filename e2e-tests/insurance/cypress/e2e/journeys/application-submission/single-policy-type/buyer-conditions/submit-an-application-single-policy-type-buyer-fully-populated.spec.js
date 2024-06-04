context('Insurance - submit an application - Single policy type, fully populated buyer', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      hasConnectionToBuyer: true,
      exporterHasTradedWithBuyer: true,
      buyerOutstandingPayments: true,
      buyerFailedToPayOnTime: true,
      hasHadCreditInsuranceCover: true,
      exporterHasBuyerFinancialAccounts: true,
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

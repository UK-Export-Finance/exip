context('Insurance - submit an application - Single policy type, minimal buyer', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      hasConnectionToBuyer: false,
      exporterHasTradedWithBuyer: false,
      buyerOutstandingPayments: false,
      buyerFailedToPayOnTime: false,
      hasHadCreditInsuranceCoverWithBuyer: false,
      exporterHasBuyerFinancialAccounts: false,
      totalContractValueOverThreshold: false,
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

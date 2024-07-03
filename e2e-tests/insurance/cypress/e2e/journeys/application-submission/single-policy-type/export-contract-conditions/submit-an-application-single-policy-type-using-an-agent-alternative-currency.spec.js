context('Insurance - submit an application - Single policy type, using an agent,  fixed sum method, alternative currency', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      isUsingAgent: true,
      agentIsCharging: true,
      agentChargeMethodFixedSum: true,
      alternativeCurrencyExportContract: true,
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

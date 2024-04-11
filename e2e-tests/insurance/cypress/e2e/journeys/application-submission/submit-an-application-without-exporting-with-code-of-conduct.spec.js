context('Insurance - submit an application - Single policy type, without `exporting with code of conduct` declaration', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({ exportingWithCodeOfConduct: false }).then((refNumber) => {
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

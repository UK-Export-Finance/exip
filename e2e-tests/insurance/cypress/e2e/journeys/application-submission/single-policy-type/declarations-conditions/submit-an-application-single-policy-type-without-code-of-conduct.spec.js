context('Insurance - submit an application - Single policy type, without `have code of conduct` declaration', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({ hasAntiBriberyCodeOfConduct: false, exportingWithCodeOfConduct: false }).then((refNumber) => {
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

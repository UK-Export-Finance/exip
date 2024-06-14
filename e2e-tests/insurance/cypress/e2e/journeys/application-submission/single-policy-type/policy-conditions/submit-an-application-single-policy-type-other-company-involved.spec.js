context('Insurance - submit an application - Single policy type, other company involved', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({ otherCompanyInvolved: true }).then((refNumber) => {
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

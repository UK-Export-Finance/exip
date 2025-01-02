context('Insurance - submit an application, Single contract policy, modern slavery declaration - `offenses or investigations`', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({
      isNotAwareOfExistingSlavery: null,
      cannotAdhereToAllRequirements: null,
      offensesOrInvestigations: false,
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

  it('should render the application in a `submitted` state in the dashboard', () => {
    cy.assertDashboardApplicationSubmitted(referenceNumber);
  });
});

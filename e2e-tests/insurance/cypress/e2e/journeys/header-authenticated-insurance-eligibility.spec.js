import dashboardPage from '../../../../pages/insurance/dashboard';

context('Insurance - header - authenticated - complete insurance eligibility', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the dashboard
      cy.clickHeaderApplicationsLink();

      // start a new application
      dashboardPage.startNewApplicationButton().click();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should render an authenticated header in each insurance eligibility page', () => {
    cy.submitInsuranceEligibilityAnswersFromExporterLocationHappyPath({});
  });
});

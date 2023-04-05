import header from '../../partials/header';
import dashboardPage from '../../pages/insurance/dashboard';

context('Insurance - header - authenticated - complete insurance eligibility', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      // go to the dashboard
      header.navigation.applications().click();

      // start a new application
      dashboardPage.startNewApplication().click();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it('should render an authenticated header in each insurance eligibility page', () => {
    cy.submitInsuranceEligibilityAnswersFromBuyerCountryHappyPath();
  });
});

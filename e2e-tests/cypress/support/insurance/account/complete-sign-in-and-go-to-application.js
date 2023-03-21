import completeInsuranceEligibilitySignInAndGoToDashboard from './complete-insurance-eligibility-sign-in-and-go-to-dashboard';
import insurancePages from '../../../e2e/pages/insurance';

/**
 * completeSignInAndGoToApplication
 * 1) Complete "sign in and go to dashboard"
 * 2) Click on the application link in the dashboard
 * 3) Get and return the application reference number from the URL for consumption in the tests
 * @return {String} Application reference number
 */
const completeSignInAndGoToApplication = () => {
  // complete sign in and go to dashboad
  completeInsuranceEligibilitySignInAndGoToDashboard();

  // go to the newly created application
  insurancePages.dashboardPage.table.body.lastRow.referenceNumber().click();

  // get the reference number and return for consumption in the test
  cy.getReferenceNumber().then((referenceNumber) => referenceNumber);
};

export default completeSignInAndGoToApplication;

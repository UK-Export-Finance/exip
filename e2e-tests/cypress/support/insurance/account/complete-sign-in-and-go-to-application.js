import completeInsuranceEligibilitySignInAndGoToDashboard from './complete-insurance-eligibility-sign-in-and-go-to-dashboard';
import deleteAccount from './delete-account';
import insurancePages from '../../../e2e/pages/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../constants/field-ids/insurance';
import mockAccount from '../../../fixtures/account';

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

/**
 * completeSignInAndGoToApplication
 * 1) Delete the account
 * 2) Complete "sign in and go to dashboard"
 * 3) Click on the application link in the dashboard
 * 4) Get and return the application reference number from the URL for consumption in the tests
 * @param {String} Account email address
 * @return {String} Application reference number
 */
const completeSignInAndGoToApplication = (email = mockAccount[EMAIL]) => {
  // delete the account
  deleteAccount(email);

  // complete sign in and go to dashboad
  completeInsuranceEligibilitySignInAndGoToDashboard(email);

  // go to the newly created application
  insurancePages.dashboardPage.table.body.lastRow.referenceNumberLink().click();

  // get the reference number and return for consumption in the test
  cy.getReferenceNumber().then((referenceNumber) => referenceNumber);
};

export default completeSignInAndGoToApplication;

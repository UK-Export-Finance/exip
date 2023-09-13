import completeInsuranceEligibilitySignInAndGoToDashboard from './complete-insurance-eligibility-sign-in-and-go-to-dashboard';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import mockAccount from '../../../fixtures/account';

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

/**
 * completeSignInAndGoToApplication
 * 1) Complete "sign in and go to dashboard"
 * 2) As there is only application, it should go straight to the application
 * 3) Get and return the application reference number from the URL for consumption in the tests
 * @param {String} Account email address
 * @return {String} Application reference number
 */
// const completeSignInAndGoToApplication = (email = mockAccount[EMAIL]) => {
const completeSignInAndGoToApplication = (email = mockAccount[EMAIL]) =>
  // complete sign in and go to dashboard
  completeInsuranceEligibilitySignInAndGoToDashboard(email).then(({ accountId }) => {
    // get the reference number and return for consumption in the test
    cy.getReferenceNumber().then((referenceNumber) => ({ accountId, referenceNumber }));
  });
// };

export default completeSignInAndGoToApplication;

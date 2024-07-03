import createAnAccountAndApplicationAndSignIn from './create-an-account-and-application-and-sign-in';
import completeInsuranceEligibilitySignInAndGoToDashboard from './complete-insurance-eligibility-sign-in-and-go-to-dashboard';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import mockAccount from '../../../fixtures/account';

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

/**
 * completeSignInAndGoToApplication
 * Create an account, sign in and create an application via the API or via the full eligibility flow.
 * @param {String} email: Account email address
 * @param {Boolean} mockAccount: Flag whether to create the application via API instead of going through the eligibility journey. Defaults to true.
 * @param {String} companyNumber: Company number/Companies house number
 * @param {Boolean} totalContractValueOverThreshold: if total contract value in eligibility should be over threshold
 * @return {Object} Account ID, application reference number
 */
const completeSignInAndGoToApplication = ({
  email = mockAccount[EMAIL],
  createApplicationViaApi = true,
  companyNumber,
  totalContractValueOverThreshold = false,
}) => {
  if (createApplicationViaApi) {
    /**
     * 1) Create an account via the API.
     * 2) Verify account by navigating to the verification URL with a valid token.
     * 3) Create an application directly via the API, associated with the created user; Avoiding going through the full eligibility flow.
     * 4) Sign into the account, submitting a valid OTP.
     * 5) Assert that the user is taken to the "all sections" application page.
     */
    return createAnAccountAndApplicationAndSignIn(email, companyNumber, totalContractValueOverThreshold).then(({ accountId, referenceNumber }) => ({
      accountId,
      referenceNumber,
    }));
  }
  /**
   * 1) Navigate to the start page.
   * 2) Go through the full eligibility flow.
   * 3) Create an account via the API.
   * 4) Verify account by navigating to the verification URL with a valid token.
   * 5) Sign into the account, submitting a valid OTP.
   * 6) Assert that the user is taken to the "all sections" application page.
   */
  return completeInsuranceEligibilitySignInAndGoToDashboard({ email, companyNumber }).then(({ accountId, referenceNumber }) => ({
    accountId,
    referenceNumber,
  }));
};

export default completeSignInAndGoToApplication;

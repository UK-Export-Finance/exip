import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import getAccountByField from '../../../helpers/get-account-by-field';
import generateOTPAndUpdateAccount from '../../../helpers/generate-otp-and-update-account';
import { Account, AddOtpToAccountVariables, AddAndGetOtpResponse, Context } from '../../../types';

/**
 * addAndGetOTP
 * - Generate and add a OTP to an account and return in the response.
 * - NOTE: this is used for E2E testing purposes only.
 * - The alternative approach is to have email inbox testing capabilities which can be risky/flaky.
 * @param {object} root: GraphQL root variables
 * @param {object} variables: GraphQL variables for the AddOtpToAccount mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<object>} Object with success flag and OTP
 */
const addAndGetOTP = async (root: any, variables: AddOtpToAccountVariables, context: Context): Promise<AddAndGetOtpResponse> => {
  try {
    console.info('Adding OTP to an account');

    const { email } = variables;

    // Get the account the email is associated with.
    const account = (await getAccountByField(context, ACCOUNT_FIELD_IDS.EMAIL, email)) as Account;

    if (!account) {
      console.info('Unable to generate and add OTP to an account - no account found');

      return { success: false };
    }

    // generate OTP and update the account
    const { securityCode } = await generateOTPAndUpdateAccount(context, account.id);

    return {
      success: true,
      securityCode,
    };
  } catch (error) {
    console.error('Error adding OTP to an account (addAndGetOTP mutation) %o', error);

    throw new Error(`Adding OTP to an account (addAndGetOTP mutation) ${error}`);
  }
};

export default addAndGetOTP;

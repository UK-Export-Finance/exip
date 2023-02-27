import { Context } from '.keystone/types'; // eslint-disable-line
import getAccountByField from '../helpers/get-account-by-field';
import isValidAccountPassword from '../helpers/is-valid-account-password';
import generateOTPAndUpdateAccount from '../helpers/generate-otp-and-update-account';
import sendEmail from '../emails';
import { AccountSignInVariables, AccountSignInResponse } from '../types';

/**
 * accountSignIn
 * - Get and validate email and password
 * - Generate an OTP, save in the database
 * - Send the user an email with security code
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the AccountSignIn mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const accountSignIn = async (root: any, variables: AccountSignInVariables, context: Context): Promise<AccountSignInResponse> => {
  try {
    console.info('Signing in exporter account');

    const { email, password } = variables;

    // Get the account the email is associated with.
    const exporter = await getAccountByField(context, 'email', email);

    if (!exporter) {
      console.info('Unable to validate exporter account - no account found');

      return { success: false };
    }

    if (isValidAccountPassword(password, exporter.salt, exporter.hash)) {
      // generate OTP and update the account
      const { securityCode } = await generateOTPAndUpdateAccount(context, exporter.id);

      // send "security code" email.
      const emailResponse = await sendEmail.securityCodeEmail(email, exporter.firstName, securityCode);

      if (emailResponse.success) {
        return {
          ...emailResponse,
          accountId: exporter.id,
        };
      }

      return {
        success: false,
      };
    }

    // invalid credentials.
    return { success: false };
  } catch (err) {
    console.error(err);
    throw new Error(`Validating password or sending email for account sign in (accountSignIn mutation) ${err}`);
  }
};

export default accountSignIn;

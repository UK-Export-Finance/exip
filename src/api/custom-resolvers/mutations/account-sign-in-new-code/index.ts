import getAccountById from '../../../helpers/get-account-by-id';
import generateOTPAndUpdateAccount from '../../../helpers/generate-otp-and-update-account';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import { AccountSignInSendNewCodeVariables, AccountSignInResponse, Context } from '../../../types';

/**
 * accountSignInSendNewCode
 * - Generate a new OTP, save in the database
 * - Send the user an email with security code
 * @param {Object} root: GraphQL root variables
 * @param {Object} variables: GraphQL variables for the AccountSignInNewCode mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag
 */
const accountSignInSendNewCode = async (root: any, variables: AccountSignInSendNewCodeVariables, context: Context): Promise<AccountSignInResponse> => {
  try {
    console.info('Generating and sending new sign in code for account');

    const { accountId } = variables;

    // get the account
    const account = await getAccountById(context, accountId);

    if (!account) {
      console.info('Unable to validate account - no account found');

      return { success: false };
    }

    // generate OTP and update the account
    const { securityCode } = await generateOTPAndUpdateAccount(context, account.id);

    // send "security code" email.
    const { email } = account;

    const name = getFullNameString(account);

    const emailResponse = await sendEmail.accessCodeEmail(email, name, String(securityCode));

    if (emailResponse?.success) {
      return {
        ...emailResponse,
        accountId: account.id,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error('Error generating and sending new sign in code for account (accountSignInSendNewCode mutation) %o', error);

    throw new Error(`Generating and sending new sign in code for account (accountSignInSendNewCode mutation) ${error}`);
  }
};

export default accountSignInSendNewCode;

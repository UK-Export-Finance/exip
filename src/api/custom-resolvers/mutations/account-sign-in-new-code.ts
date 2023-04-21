import { Context } from '.keystone/types'; // eslint-disable-line
import getExporterById from '../../helpers/get-exporter-by-id';
import generateOTPAndUpdateAccount from '../../helpers/generate-otp-and-update-account';
import sendEmail from '../../emails';
import { AccountSignInSendNewCodeVariables, AccountSignInResponse } from '../../types';

/**
 * accountSignInSendNewCode
 * - Generate a new OTP, save in the database
 * - Send the user an email with security code
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the AccountSignInNewCode mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const accountSignInSendNewCode = async (root: any, variables: AccountSignInSendNewCodeVariables, context: Context): Promise<AccountSignInResponse> => {
  try {
    console.info('Generating and sending new sign in code for exporter account');

    const { accountId } = variables;

    // get the exporter
    const exporter = await getExporterById(context, accountId);

    if (!exporter) {
      console.info('Unable to validate exporter account - no account found');

      return { success: false };
    }

    // generate OTP and update the account
    const { securityCode } = await generateOTPAndUpdateAccount(context, exporter.id);

    // send "security code" email.
    const { email, firstName } = exporter;

    const emailResponse = await sendEmail.securityCodeEmail(email, firstName, securityCode);

    if (emailResponse.success) {
      return {
        ...emailResponse,
        accountId: exporter.id,
      };
    }

    return {
      success: false,
    };
  } catch (err) {
    console.error(err);
    throw new Error(`Generating and sending new sign in code for exporter account (accountSignInSendNewCode mutation) ${err}`);
  }
};

export default accountSignInSendNewCode;

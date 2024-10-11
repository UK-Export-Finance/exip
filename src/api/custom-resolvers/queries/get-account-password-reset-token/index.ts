import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import getAccountByField from '../../../helpers/get-account-by-field';
import { Account, AccountPasswordResetTokenResponse, Context, GetAccountPasswordResetTokenVariables } from '../../../types';

/**
 * getAccountPasswordResetToken
 * - Get an account's reset password token and return in the response.
 * - NOTE: this is used for E2E testing purposes only.
 * - The alternative approach is to have email inbox testing capabilities which can be risky/flaky.
 * @param {Object} root: GraphQL root variables
 * @param {Object} variables: GraphQL variables for the GetAccountPasswordResetToken mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag and Password reset token
 */
const getAccountPasswordResetToken = async (
  root: any,
  variables: GetAccountPasswordResetTokenVariables,
  context: Context,
): Promise<AccountPasswordResetTokenResponse> => {
  console.info('Getting account password reset token');

  try {
    const { email } = variables;

    /**
     * Get the account the email is associated with.
     * If an account does not exist, return success=false
     */
    const account = (await getAccountByField(context, ACCOUNT_FIELD_IDS.EMAIL, email)) as Account;

    if (!account) {
      console.info('Unable to get account password reset token - account does not exist');

      return { success: false };
    }

    if (account.passwordResetHash) {
      return {
        success: true,
        token: account.passwordResetHash,
      };
    }

    console.info('Unable to get account password reset token - reset hash does not exist');

    return { success: false };
  } catch (error) {
    console.error('Error getting account password reset token %o', error);

    throw new Error(`Getting account password reset token ${error}`);
  }
};

export default getAccountPasswordResetToken;

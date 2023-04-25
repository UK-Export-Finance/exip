import { Context } from '.keystone/types'; // eslint-disable-line
import { FIELD_IDS } from '../../constants';
import getAccountByField from '../../helpers/get-account-by-field';
import { GetAccountPasswordResetTokenVariables, GetAccountPasswordResetTokenResponse } from '../../types';

/**
 * getAccountPasswordResetToken
 * - Get an account's reset password token and return in the response.
 * - NOTE: this is used for E2E testing purposes only.
 * - The alternative approach is to have email inbox testing capabilities which can be risky/flaky.
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the GetAccountPasswordResetToken mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag and Password reset token
 */
const getAccountPasswordResetToken = async (
  root: any,
  variables: GetAccountPasswordResetTokenVariables,
  context: Context,
): Promise<GetAccountPasswordResetTokenResponse> => {
  console.info('Getting account password reset token');

  try {
    const { email } = variables;

    // Get the account the email is associated with.
    const account = await getAccountByField(context, FIELD_IDS.ACCOUNT.EMAIL, email);

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
  } catch (err) {
    throw new Error(`Getting account password reset token ${err}`);
  }
};

export default getAccountPasswordResetToken;

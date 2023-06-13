import { Context } from '.keystone/types'; // eslint-disable-line
import { isAfter } from 'date-fns';
import { FIELD_IDS } from '../../../constants';
import getAccountByField from '../../../helpers/get-account-by-field';
import { VerifyAccountPasswordResetTokenVariables, AccountPasswordResetTokenResponse } from '../../../types';

const {
  ACCOUNT: { PASSWORD_RESET_HASH, PASSWORD_RESET_EXPIRY },
} = FIELD_IDS.INSURANCE;

/**
 * verifyAccountPasswordResetToken
 * - Get an account's reset password token and return in the response.
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the VerifyAccountPasswordResetToken mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const verifyAccountPasswordResetToken = async (
  root: any,
  variables: VerifyAccountPasswordResetTokenVariables,
  context: Context,
): Promise<AccountPasswordResetTokenResponse> => {
  console.info('Verifying account password reset token');

  try {
    const { token } = variables;

    // Get the account the token is associated with.
    const account = await getAccountByField(context, PASSWORD_RESET_HASH, token);

    if (!account) {
      console.info('Unable to verify account password reset token - account does not exist');

      return { success: false };
    }

    // check that the reset token period has not expired.
    const now = new Date();

    const hasExpired = isAfter(now, account[PASSWORD_RESET_EXPIRY]);

    if (hasExpired) {
      console.info('Account password reset token has expired');

      return {
        success: false,
        expired: true,
      };
    }

    return { success: true };
  } catch (err) {
    throw new Error(`Verifying account password reset token ${err}`);
  }
};

export default verifyAccountPasswordResetToken;

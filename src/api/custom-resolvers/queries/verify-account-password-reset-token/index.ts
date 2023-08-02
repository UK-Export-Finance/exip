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

    // get the account the token is associated with.
    const account = await getAccountByField(context, PASSWORD_RESET_HASH, token);

    if (account) {
      // check that the reset token period has not expired.
      const now = new Date();

      const hasExpired = isAfter(now, account[PASSWORD_RESET_EXPIRY]);

      if (hasExpired) {
        console.info('Unable to verify account password reset token - token has expired');

        return {
          success: false,
          expired: true,
          accountId: account.id,
        };
      }

      console.info('Successfully verified account password reset token');

      return {
        success: true,
      };
    }

    console.info('Unable to verify account password reset token - no account found from the provided %s', PASSWORD_RESET_HASH);

    return {
      success: false,
      invalid: true,
    };
  } catch (err) {
    console.error('Error verifying account password reset token %O', err);

    throw new Error(`Verifying account password reset token ${err}`);
  }
};

export default verifyAccountPasswordResetToken;

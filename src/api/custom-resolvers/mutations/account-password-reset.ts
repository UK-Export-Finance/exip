import { Context } from '.keystone/types'; // eslint-disable-line
import { isAfter } from 'date-fns';
import { FIELD_IDS } from '../../constants';
import getAccountByField from '../../helpers/get-account-by-field';
import encryptPassword from '../../helpers/encrypt-password';
import isValidAccountPassword from '../../helpers/is-valid-account-password';
import { Account, AccountPasswordResetVariables } from '../../types';

const accountPasswordReset = async (root: any, variables: AccountPasswordResetVariables, context: Context) => {
  console.info('Resetting account password');

  try {
    const { token, password: newPassword } = variables;

    /**
     * Get the account the token is associated with.
     * If an account does not exist, return success=false
     */
    const account = await getAccountByField(context, FIELD_IDS.INSURANCE.ACCOUNT.PASSWORD_RESET_HASH, token);

    if (!account) {
      console.info('Unable to reset account password - account does not exist');

      return { success: false };
    }

    const { id: accountId, passwordResetHash, passwordResetExpiry } = account as Account;

    /**
     * Check that the account has a reset hash and expiry.
     * If not, return success=false
     */
    if (!passwordResetHash || !passwordResetExpiry) {
      console.info('Unable to reset account password - reset hash or expiry does not exist');

      return { success: false };
    }

    /**
     * Check that the verification period has not expired.
     * If expired, return success=false
     */
    const now = new Date();

    const hasExpired = isAfter(now, passwordResetExpiry);

    if (hasExpired) {
      console.info('Unable to reset account password - verification period has expired');

      return {
        success: false,
        expired: true,
      };
    }

    // TODO
    // check that the provided password has not been used before.

    console.log('-----passwordResetHash ', passwordResetHash);

    


    /**
     * Account is OK to proceed with password reset.
     * Encrypt the password and update the account
     */

    /**
     * Account is OK to proceed with password reset.
     * Encrypt the password and update the account
     */
    const { salt, hash } = encryptPassword(newPassword);


    const bla = isValidAccountPassword(newPassword, salt, hash);
    console.log('-----blaaa ', bla);

    console.log('-----hash ', hash);

    const accountUpdate = {
      salt,
      hash,
      passwordResetHash: '',
      passwordResetExpiry: null,
    };

    await context.db.Account.updateOne({
      where: {
        id: accountId,
      },
      data: accountUpdate,
    });

    return {
      success: true,
    };
  } catch (err) {
    throw new Error(`Resetting account password ${err}`);
  }
};

export default accountPasswordReset;

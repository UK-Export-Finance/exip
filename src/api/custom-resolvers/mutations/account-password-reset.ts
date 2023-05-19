import { Context } from '.keystone/types'; // eslint-disable-line
import { isAfter } from 'date-fns';
import { FIELD_IDS } from '../../constants';
import getAccountByField from '../../helpers/get-account-by-field';
import encryptPassword from '../../helpers/encrypt-password';
import hasAccountUsedPasswordBefore from '../../helpers/account-has-used-password-before';
import getPasswordHash from '../../helpers/get-password-hash';
import createAuthenticationEntry from '../../helpers/create-authentication-entry';
import { Account, AccountPasswordResetVariables } from '../../types';

const accountPasswordReset = async (root: any, variables: AccountPasswordResetVariables, context: Context) => {
  console.info('Resetting account password');

  try {
    const { token, password: newPassword } = variables;

    /**
     * Get the account the token is associated with.
     * If no account is found, return success=false
     */
    const account = await getAccountByField(context, FIELD_IDS.INSURANCE.ACCOUNT.PASSWORD_RESET_HASH, token);

    if (!account) {
      console.info('Unable to reset account password - account does not exist');

      return { success: false };
    }

    /**
     * Check if the account has a reset hash and expiry.
     * If not, return success=false
     */
    const { id: accountId, passwordResetHash, passwordResetExpiry, salt: currentSalt, hash: currentHash } = account as Account;

    /**
     * Check that the account has a reset hash and expiry.
     * If not, return success=false
     */
    if (!passwordResetHash || !passwordResetExpiry) {
      console.info('Unable to reset account password - reset hash or expiry does not exist');

      return { success: false };
    }

    /**
     * Check that the current time has not surpassed the reset expiry period.
     * If it has, return expired=true
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

    /**
     * Check that the provided password is not the same as the current password.
     * If it has been used before, return hasBeenUsedBefore=false
     */
    const newHashCurrentSalt = getPasswordHash(newPassword, currentSalt);

    const passwordIsTheSame = newHashCurrentSalt === currentHash;

    if (passwordIsTheSame) {
      console.info('Unable to reset account password - provided password is the same');

      return {
        success: false,
        hasBeenUsedBefore: true,
      };
    }

    /**
     * Check that the provided password is not the same as any previous passwords.
     * If it has been used before, return hasBeenUsedBefore=false
     */
    const usedPasswordBefore = await hasAccountUsedPasswordBefore(context, accountId, newPassword);

    if (usedPasswordBefore) {
      console.info('Unable to reset account password - provided password has been used before');

      return {
        success: false,
        hasBeenUsedBefore: true,
      };
    }

    /**
     * Account is OK to proceed with password reset.
     * 1) Add a new entry to the Authentication table
     */
    const authEntry = {
      account: {
        connect: {
          id: accountId,
        },
      },
      salt: currentSalt,
      hash: currentHash,
    };

    await createAuthenticationEntry(context, authEntry);

    /**
     * 2) Encrypt the provided password.
     * 3) Update the account.
     */
    const { salt: newSalt, hash: newHash } = encryptPassword(newPassword);

    const accountUpdate = {
      salt: newSalt,
      hash: newHash,
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
    console.error(err);

    throw new Error(`Resetting account password ${err}`);
  }
};

export default accountPasswordReset;

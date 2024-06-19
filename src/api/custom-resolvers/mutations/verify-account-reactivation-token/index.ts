import { Context } from '.keystone/types';
import { isBefore } from 'date-fns';
import { FIELD_IDS } from '../../../constants';
import getAccountByField from '../../../helpers/get-account-by-field';
import update from '../../../helpers/update-account';
import deleteAuthenticationRetries from '../../../helpers/delete-authentication-retries';
import { Account, VerifyAccountReactivationTokenVariables, VerifyAccountReactivationTokenResponse } from '../../../types';

const {
  INSURANCE: {
    ACCOUNT: { REACTIVATION_HASH, REACTIVATION_EXPIRY },
  },
} = FIELD_IDS;

/**
 * verifyAccountReactivationToken
 * Check if an account can be reactivated.
 * If so, update the account.
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the VerifyAccountReactivationToken mutation
 * @param {Context} KeystoneJS context API
 * @returns {Promise<Object>} Object with success or expired flag.
 */
const verifyAccountReactivationToken = async (
  root: any,
  variables: VerifyAccountReactivationTokenVariables,
  context: Context,
): Promise<VerifyAccountReactivationTokenResponse> => {
  try {
    console.info('Received a request to reactivate account - checking account');

    // get the account the token is associated with.
    const account = (await getAccountByField(context, REACTIVATION_HASH, variables.token)) as Account;

    if (account) {
      console.info('Received a request to reactivate account - found account %s', account.id);

      // check that the verification period has not expired.
      const now = new Date();
      const canReactivateAccount = isBefore(now, account[REACTIVATION_EXPIRY]);

      if (!canReactivateAccount) {
        console.info('Unable to reactivate account - reactivation period has expired');

        return {
          expired: true,
          success: false,
          accountId: account.id,
        };
      }

      /**
       * Update the account:
       * - mark as unblocked
       * - mark as verified (incase the account was previously unverified)
       *   - both verification and reactivation have the same mechanism (clicking token via email)
       * - nullify the reactivation hash and expiry
       * - mark the account has unblocked and nullify the verification hash and expiry.
       */
      console.info('Reactivating account %s', account.id);

      const accountUpdate = {
        reactivationHash: '',
        reactivationExpiry: null,
      };

      const statusUpdate = {
        isBlocked: false,
        isVerified: true,
      };

      await update.account(context, account.id, accountUpdate);
      await update.accountStatus(context, account.status.id, statusUpdate);

      /**
       * Wipe the retry entries
       * The account should have a clean slate after becoming unblocked/reactivated.
       */
      await deleteAuthenticationRetries(context, account.id);

      return {
        success: true,
      };
    }

    console.info('Unable to reactivate account - no account found from the provided %s', REACTIVATION_HASH);

    return {
      success: false,
      invalid: true,
    };
  } catch (err) {
    console.error('Error checking account and reactivating account(verifyAccountReactivationToken mutation) %O', err);
    throw new Error(`Checking account and reactivating account(verifyAccountReactivationToken mutation) ${err}`);
  }
};

export default verifyAccountReactivationToken;

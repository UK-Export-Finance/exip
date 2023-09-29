import { isBefore } from 'date-fns';
import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import getAccountByField from '../../../helpers/get-account-by-field';
import { Context, VerifyEmailAddressVariables, VerifyEmailAddressResponse } from '../../../types';

const { EMAIL, VERIFICATION_HASH, VERIFICATION_EXPIRY } = ACCOUNT_FIELD_IDS;

/**
 * verifyAccountEmailAddress
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the VerifyEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success or expired flag.
 */
const verifyAccountEmailAddress = async (root: any, variables: VerifyEmailAddressVariables, context: Context): Promise<VerifyEmailAddressResponse> => {
  try {
    console.info('Verifying account email address');

    // get the account the token is associated with.
    const account = await getAccountByField(context, VERIFICATION_HASH, variables.token);

    if (account) {
      const { id } = account;

      // check that the verification period has not expired.
      const now = new Date();
      const canActivateAccount = isBefore(now, account[VERIFICATION_EXPIRY]);

      if (!canActivateAccount) {
        console.info('Unable to verify account email - verification period has expired');

        return {
          expired: true,
          success: false,
          accountId: id,
        };
      }

      /**
       * Mark the account has verified and
       * nullify the verification hash and expiry.
       */
      console.info('Verified account email - updating account to be verified');

      const accountUpdate = {
        isVerified: true,
        verificationHash: '',
        verificationExpiry: null,
      };

      await context.db.Account.updateOne({
        where: { id: account.id },
        data: accountUpdate,
      });

      return {
        success: true,
        accountId: id,
        emailRecipient: account[EMAIL],
      };
    }

    console.info('Unable to verify account email - no account found from the provided %s', VERIFICATION_HASH);

    return {
      success: false,
      invalid: true,
    };
  } catch (err) {
    console.error('Error verifying account email address %O', err);

    throw new Error(`Verifying account email address ${err}`);
  }
};

export default verifyAccountEmailAddress;

import { isBefore } from 'date-fns';
import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import getAccountByField from '../../../helpers/get-account-by-field';
import update from '../../../helpers/update-account';
import { Account, Context, VerifyEmailAddressVariables, VerifyEmailAddressResponse } from '../../../types';

const { ID, EMAIL, VERIFICATION_EXPIRY } = ACCOUNT_FIELD_IDS;

/**
 * verifyAccountEmailAddress
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the VerifyEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Promise<Object>} Object with success or expired flag.
 */
const verifyAccountEmailAddress = async (root: any, variables: VerifyEmailAddressVariables, context: Context): Promise<VerifyEmailAddressResponse> => {
  try {
    console.info('Verifying account email address');

    // get the account by ID.
    const account = (await getAccountByField(context, ID, variables.id)) as Account;

    if (!account) {
      console.info('Unable to verify account email address - account does not exist');

      return {
        success: false,
        invalid: true,
      };
    }

    /**
     * Check if the account is already verified.
     * If so, return success=true.
     * Without this, if this resolver is called more than once,
     * and an account becomes verified, it would return success=false.
     */
    if (account.accountStatus.isVerified) {
      console.info('Account email address is already verified');

      return {
        success: true,
      };
    }

    const { id } = account;
    const { id: accountStatusId } = account.accountStatus;

    /**
     * Check if the verification period has expired.
     * If so, return success=false, expired=true
     */
    const now = new Date();
    const canActivateAccount = isBefore(now, account[VERIFICATION_EXPIRY]);

    if (!canActivateAccount) {
      console.info('Unable to verify account email address - verification period has expired');

      return {
        expired: true,
        success: false,
        accountId: id,
      };
    }

    /**
     * Mark the account as verified and
     * nullify the verification hash and expiry.
     */
    console.info('Verified account email address - updating account to be verified');

    const accountUpdate = {
      verificationHash: '',
      verificationExpiry: null,
    };

    const accountStatusUpdate = {
      isVerified: true,
    };

    await update.account(context, id, accountUpdate);
    await update.accountStatus(context, accountStatusId, accountStatusUpdate);

    return {
      success: true,
      accountId: id,
      emailRecipient: account[EMAIL],
    };
  } catch (err) {
    console.error('Error verifying account email address %O', err);

    throw new Error(`Verifying account email address ${err}`);
  }
};

export default verifyAccountEmailAddress;

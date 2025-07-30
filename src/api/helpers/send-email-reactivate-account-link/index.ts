import crypto from 'crypto';
import { ACCOUNT } from '../../constants';
import getAccountById from '../get-account-by-id';
import update from '../update-account';
import getFullNameString from '../get-full-name-string';
import sendEmail from '../../emails';
import { AccountSendEmailReactivateLinkVariables, AccountSendEmailReactivateLinkResponse, Context } from '../../types';

const {
  ENCRYPTION: {
    STRING_TYPE,
    PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
    PASSWORD: {
      PBKDF2: { KEY_LENGTH },
    },
  },
} = ACCOUNT;

/**
 * sendEmailReactivateAccountLink
 * Generate a hash, update account and send a link to the account via email.
 * @param {AccountSendEmailReactivateLinkVariables} variables for the SendReactivateAccountEmail helper
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<object>} Object with success flag
 */
const send = async (variables: AccountSendEmailReactivateLinkVariables, context: Context): Promise<AccountSendEmailReactivateLinkResponse> => {
  try {
    console.info('Received a request to send reactivate account email/link - checking account - sendEmailReactivateAccountLinkHelper');

    const { urlOrigin, accountId } = variables;

    /**
     * Get the account
     * If an account does not exist, return success=false
     */
    const account = await getAccountById(context, accountId);

    if (!account) {
      console.info('Unable to check account and send reactivate account email/link - no account found');

      return { success: false };
    }

    const { email } = account;

    /**
     * Account is OK to proceed with account reactivation
     * Generate a reactivate account link and send to the account's email address.
     */
    console.info('Generating hash for account reactivation');

    const reactivationHash = crypto.pbkdf2Sync(email, account.salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    const accountUpdate = {
      reactivationHash,
      reactivationExpiry: ACCOUNT.REACTIVATION_EXPIRY(),
    };

    console.info('Updating account for reactivation');

    await update.account(context, accountId, accountUpdate);

    console.info('Sending reactivate account email/link');

    const name = getFullNameString(account);

    const emailResponse = await sendEmail.reactivateAccountLink(urlOrigin, email, name, reactivationHash);

    if (emailResponse.success) {
      return {
        ...emailResponse,
        email,
        accountId,
      };
    }

    return { accountId, email, success: false };
  } catch (error) {
    console.error('Error checking account and sending reactivate account email/link (sendEmailReactivateAccountLink helper) %o', error);

    throw new Error(`Checking account and sending reactivate account email/link (sendEmailReactivateAccountLink helper) ${error}`);
  }
};

const sendEmailReactivateAccountLinkHelper = {
  send,
};

export default sendEmailReactivateAccountLinkHelper;

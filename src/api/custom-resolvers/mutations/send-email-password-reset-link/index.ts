import crypto from 'crypto';
import { ACCOUNT } from '../../../constants';
import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import getAccountByField from '../../../helpers/get-account-by-field';
import createAuthenticationRetryEntry from '../../../helpers/create-authentication-retry-entry';
import shouldBlockAccount from '../../../helpers/should-block-account';
import blockAccount from '../../../helpers/block-account';
import update from '../../../helpers/update-account';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import { AccountSendEmailPasswordResetLinkVariables, Account, AccountSendEmailPasswordResetLinkResponse, Context } from '../../../types';

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
 * sendEmailPasswordResetLink
 * If an account has not reached the MAX_AUTH_RETRIES threshold,
 * Generate a password reset hash, update account and send a link to the account via email.
 * Otherwise, block the account
 * Or return success=false if the account is not found.
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SendEmailPasswordResetLink mutation
 * @param {Object} KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag
 */
const sendEmailPasswordResetLink = async (
  root: any,
  variables: AccountSendEmailPasswordResetLinkVariables,
  context: Context,
): Promise<AccountSendEmailPasswordResetLinkResponse> => {
  try {
    console.info('Received a password reset request - checking account');

    const { urlOrigin, email } = variables;

    /**
     * Get the account the email is associated with.
     * If an account does not exist, return success=false
     */
    const account = (await getAccountByField(context, ACCOUNT_FIELD_IDS.EMAIL, email)) as Account;

    if (!account) {
      console.info('Unable to check account and send password reset email - no account found');

      return { success: false };
    }

    const { id: accountId } = account;

    /**
     * Create a new retry entry for the account
     * If this fails, return success=false
     */
    const newRetriesEntry = await createAuthenticationRetryEntry(context, accountId);

    if (!newRetriesEntry.success) {
      return { success: false };
    }

    /**
     * Check if the account should be blocked.
     * If so, update the account and return isBlocked=true
     */
    const needToBlockAccount = await shouldBlockAccount(context, accountId);

    if (needToBlockAccount) {
      try {
        const blocked = await blockAccount(context, accountId);

        if (blocked) {
          return {
            success: false,
            isBlocked: true,
            accountId,
          };
        }
      } catch (err) {
        console.error('Error blocking account $O', err);
        return { success: false };
      }
    }

    /**
     * Account is OK to proceed with password reset.
     * Generate a password reset link and send to the account's email address.
     */
    console.info('Generating password reset hash');

    const passwordResetHash = crypto.pbkdf2Sync(email, account.salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    const accountUpdate = {
      passwordResetHash,
      passwordResetExpiry: ACCOUNT.PASSWORD_RESET_EXPIRY(),
    };

    console.info('Updating account for password reset');

    await update.account(context, accountId, accountUpdate);

    console.info('Sending password reset email');

    const name = getFullNameString(account);

    const emailResponse = await sendEmail.passwordResetLink(urlOrigin, email, name, passwordResetHash);

    if (emailResponse.success) {
      return emailResponse;
    }

    return { success: false };
  } catch (err) {
    console.error('Error checking account and sending password reset email (sendEmailPasswordResetLink mutation) $O', err);

    throw new Error(`Checking account and sending password reset email (sendEmailPasswordResetLink mutation) ${err}`);
  }
};

export default sendEmailPasswordResetLink;

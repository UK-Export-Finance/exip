import { Context } from '.keystone/types'; // eslint-disable-line
import crypto from 'crypto';
import { ACCOUNT, FIELD_IDS } from '../../constants';
import getAccountByField from '../../helpers/get-account-by-field';
import createAuthenticationRetryEntry from '../../helpers/create-authentication-retry-entry';
import getFullNameString from '../../helpers/get-full-name-string';
import sendEmail from '../../emails';
import { AccountSendEmailPasswordResetLinkVariables, Account, AccountSendEmailPasswordResetLinkResponse } from '../../types';

const {
  ENCRYPTION: {
    STRING_TYPE,
    PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
    PASSWORD: {
      PBKDF2: { KEY_LENGTH },
    },
  },
  MAX_PASSWORD_RESET_TRIES,
} = ACCOUNT;

/**
 * sendEmailPasswordResetLink
 * Generate a password reset hash, update account and send a link to the account via email
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SendEmailPasswordResetLink mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const sendEmailPasswordResetLink = async (
  root: any,
  variables: AccountSendEmailPasswordResetLinkVariables,
  context: Context,
): Promise<AccountSendEmailPasswordResetLinkResponse> => {
  try {
    console.info('Received a password reset request - checking account');

    const { urlOrigin, email } = variables;

    // Get the account the email is associated with.
    const account = (await getAccountByField(context, FIELD_IDS.INSURANCE.ACCOUNT.EMAIL, email)) as Account;

    if (!account) {
      console.info('Unable to check account and send password reset email - no account found');

      return { success: false };
    }

    const { id: accountId } = account;

    const newRetriesEntry = await createAuthenticationRetryEntry(context, accountId);

    console.info(`Checking account ${accountId} for password reset retries`);

    const retries = await context.db.AuthenticationRetry.findMany({
      where: {
        account: {
          every: {
            id: { equals: accountId },
          },
        },
      },
    });

    const shouldBlockAccount = retries.length >= MAX_PASSWORD_RESET_TRIES;

    if (shouldBlockAccount) {
      console.info(`Account ${accountId} password reset retries exceeds the threshold - blocking account`);

      (await context.db.Account.updateOne({
        where: { id: accountId },
        data: { isBlocked: true },
      })) as Account;

      return {
        success: false,
        isBlocked: true,
        accountId,
      };
    }

    if (newRetriesEntry.success) {
      console.info('Generating password reset hash');

      const passwordResetHash = crypto.pbkdf2Sync(email, account.salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

      const accountUpdate = {
        passwordResetHash,
        passwordResetExpiry: ACCOUNT.PASSWORD_RESET_EXPIRY(),
      };

      console.info('Updating account for password reset');

      (await context.db.Account.updateOne({
        where: { id: accountId },
        data: accountUpdate,
      })) as Account;

      console.info('Sending password reset email');

      const name = getFullNameString(account);

      const emailResponse = await sendEmail.passwordResetLink(urlOrigin, email, name, passwordResetHash);

      if (emailResponse.success) {
        return emailResponse;
      }

      return { success: false };
    }

    return { success: false };
  } catch (err) {
    console.error(err);
    throw new Error(`Checking account and sending password reset email (sendEmailPasswordResetLink mutation) ${err}`);
  }
};

export default sendEmailPasswordResetLink;

import { Context } from '.keystone/types'; // eslint-disable-line
import crypto from 'crypto';
import { ACCOUNT, FIELD_IDS } from '../../constants';
import getAccountByField from '../../helpers/get-account-by-field';
import getFullNameString from '../../helpers/get-full-name-string';
import sendEmail from '../../emails';
import { AccountSendEmailPasswordResetLinkVariables, Account, SuccessResponse } from '../../types';

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
 * Generate a password reset hash, update account and send a link to the account via email
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SendEmailPasswordResetLink mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const sendEmailPasswordResetLink = async (root: any, variables: AccountSendEmailPasswordResetLinkVariables, context: Context): Promise<SuccessResponse> => {
  try {
    console.info('Sending password reset email');

    const { email } = variables;

    // Get the account the email is associated with.
    const account = await getAccountByField(context, FIELD_IDS.INSURANCE.ACCOUNT.EMAIL, email);

    if (!account) {
      console.info('Unable to send password reset email - no account found');

      return { success: false };
    }

    const passwordResetHash = crypto.pbkdf2Sync(email, account.salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    const accountUpdate = {
      passwordResetHash,
      passwordResetExpiry: ACCOUNT.PASSWORD_RESET_EXPIRY(),
    };

    (await context.db.Account.updateOne({
      where: { id: account.id },
      data: accountUpdate,
    })) as Account;

    const name = getFullNameString(account);

    const emailResponse = await sendEmail.passwordResetLink(email, name, passwordResetHash);

    if (emailResponse.success) {
      return emailResponse;
    }

    return { success: false };
  } catch (err) {
    console.error(err);
    throw new Error(`Sending password reset email (sendEmailPasswordResetLink mutation) ${err}`);
  }
};

export default sendEmailPasswordResetLink;

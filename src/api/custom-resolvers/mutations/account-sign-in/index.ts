import ACCOUNT_FIELD_IDS from '../../../constants/field-ids/insurance/account';
import getAccountByField from '../../../helpers/get-account-by-field';
import isValidAccountPassword from '../../../helpers/is-valid-account-password';
import createAuthenticationRetryEntry from '../../../helpers/create-authentication-retry-entry';
import shouldBlockAccount from '../../../helpers/should-block-account';
import blockAccount from '../../../helpers/block-account';
import accountChecks from './account-checks';
import { Account, AccountSignInVariables, AccountSignInResponse, Context } from '../../../types';

/**
 * accountSignIn
 * 1) Check if the account exists.
 * 2) Check if the account is already blocked.
 * 3) Get and validate email and password.
 * 4) If the provided credentials are valid:
 *   4.1) Generate an OTP, save in the database.
 *   4.2) Send the user an email with security code.
 *
 * 5) If the provided credentials are invalid:
 *   5.1) Create a new retry entry for the account.
 *   5.2) Check if the account should be blocked. If so, block the account.
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the AccountSignIn mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const accountSignIn = async (root: any, variables: AccountSignInVariables, context: Context): Promise<AccountSignInResponse> => {
  try {
    console.info('Signing in account');

    const { urlOrigin, email, password } = variables;

    // Get the account the email is associated with.
    const accountData = (await getAccountByField(context, ACCOUNT_FIELD_IDS.EMAIL, email)) as Account;

    if (!accountData) {
      console.info('Unable to validate account - no account found');

      return { success: false };
    }

    const account = accountData;

    const { id: accountId } = account;

    /**
     * Check if the account is blocked
     * If so, return isBlocked=false
     */
    const { isBlocked } = account;

    if (isBlocked) {
      console.info('Unable to sign in account - account is already blocked');

      return { success: false, isBlocked: true, accountId };
    }

    /**
     * Account is found and verified. We can therefore:
     * 1) Check if the password matches what is encrypted in the database.
     * 2) If the password is valid:
     *   - If the account is unverified, but has a valid has/token, send verification email.
     *   - If the account is verified, generate an OTP/security code and send via email.
     * 3) Otherwise, we return a rejection because either:
     *   - The password is invalid.
     *   - The email was not sent.
     */
    if (isValidAccountPassword(password, account.salt, account.hash)) {
      console.info('Signing in account - valid credentials provided');

      return accountChecks(context, account, urlOrigin);
    }

    /**
     * Provided credentials are invalid.
     * 1) Create a new retry entry for the account.
     * 2) Check if the account should be blocked and if so, block the account.
     */

    console.info('Signing in account - invalid credentials provided');

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
      const blocked = await blockAccount(context, accountId);

      if (blocked) {
        return {
          success: false,
          isBlocked: true,
          accountId,
        };
      }

      return { success: false };
    }

    return { success: false };
  } catch (err) {
    console.error('Error signing into account %O', err);

    throw new Error(`Signing in account (accountSignIn mutation) ${err}`);
  }
};

export default accountSignIn;

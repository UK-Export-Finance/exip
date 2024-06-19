import { Context } from '.keystone/types';
import getAccountByField from '../../../helpers/get-account-by-field';
import getAuthenticationRetriesByAccountId from '../../../helpers/get-authentication-retries-by-account-id';
import { Account, AccountDeletionVariables, AuthenticationRetry } from '../../../types';

/**
 * deleteAnAccount
 * Deletes an account.
 * NOTE: this is currently only used for E2E tests.
 * 1) Check if the account exists.
 * 2) Delete authentication retry entries.
 * 3) Delete the account.
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the DeleteAnAccount mutation
 * @param {Context} KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag
 */
const deleteAnAccount = async (root: any, variables: AccountDeletionVariables, context: Context) => {
  console.info('Deleting account ', variables.email);

  try {
    const { email } = variables;

    // check if an account with the email already exists
    const account = (await getAccountByField(context, 'email', email)) as Account;

    if (!account) {
      console.info(`Unable to delete account - account not found`);

      return { success: false };
    }

    const { id: accountId } = account;

    console.info('Checking authentication retry entries');

    // delete authentication retry entries
    const retries = await getAuthenticationRetriesByAccountId(context, accountId);

    if (retries.length) {
      console.info('Deleting authentication retry entries');

      const retriesArray = retries.map((retry: AuthenticationRetry) => ({
        id: retry.id,
      }));

      await context.db.AuthenticationRetry.deleteMany({
        where: retriesArray,
      });
    }

    console.info('Deleting account %s', accountId);

    await context.db.Account.deleteOne({
      where: {
        id: accountId,
      },
    });

    return {
      success: true,
    };
  } catch (err) {
    console.error('Error deleting account %O', err);

    throw new Error(`Deleting account ${err}`);
  }
};

export default deleteAnAccount;

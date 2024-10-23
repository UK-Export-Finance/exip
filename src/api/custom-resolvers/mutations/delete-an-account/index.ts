import getAccountByField from '../../../helpers/get-account-by-field';
import getAuthenticationRetriesByAccountId from '../../../helpers/get-authentication-retries-by-account-id';
import { Account, AccountDeletionVariables, AuthenticationRetry, Context } from '../../../types';

/**
 * deleteAnAccount
 * Deletes an account.
 * NOTE: this is currently only used for E2E tests.
 * 1) Check if the account exists.
 * 2) Delete authentication retry entries.
 * 3) Delete the account.
 * @param {Object} root: GraphQL root variables
 * @param {Object} variables: GraphQL variables for the DeleteAnAccount mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<SuccessResponse>} Object with success flag
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
  } catch (error) {
    console.error('Error deleting account %o', error);

    throw new Error(`Deleting account ${error}`);
  }
};

export default deleteAnAccount;

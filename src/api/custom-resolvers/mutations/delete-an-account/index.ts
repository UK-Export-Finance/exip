import { Context } from '.keystone/types'; // eslint-disable-line
import getAccountByField from '../../../helpers/get-account-by-field';
import getAuthenticationRetriesByAccountId from '../../../helpers/get-authentication-retries-by-account-id';
import { Account, AccountDeletionVariables } from '../../../types';

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

      const retriesArray = retries.map((retry) => ({
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

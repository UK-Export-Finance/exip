import { Context } from '.keystone/types'; // eslint-disable-line
import getAccountByField from '../../helpers/get-account-by-field';
import { Account, AccountDeletionVariables } from '../../types';

const deleteAnAccount = async (root: any, variables: AccountDeletionVariables, context: Context) => {
  console.info('Deleting account ', variables.email);

  try {
    const { email } = variables;

    // check if an account with the email already exists
    const account = (await getAccountByField(context, 'email', email)) as Account;

    if (!account) {
      console.info(`Unable to delete account - account already exists`);

      return { success: false };
    }

    const { id: accountId } = account;

    // delete authentication retry entries
    const retries = await context.db.AuthenticationRetry.findMany({
      where: {
        account: {
          every: {
            id: { equals: accountId },
          },
        },
      },
    });

    const retriesArray = retries.map((retry) => ({
      id: retry.id,
    }));

    if (retries.length) {
      await context.db.AuthenticationRetry.deleteMany({
        where: retriesArray,
      });
    }

    await context.db.Account.deleteOne({
      where: {
        id: accountId,
      },
    });

    return {
      success: true,
    };
  } catch (err) {
    throw new Error(`Deleting account ${err}`);
  }
};

export default deleteAnAccount;

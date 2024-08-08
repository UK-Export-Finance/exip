import { Account, Context } from '../../types';

/**
 * getAccountById
 * Get an account by account ID
 * @param {Object} context: KeystoneJS context API
 * @param {String} accountId: Account ID
 * @returns {Promise<Account>} Account
 */
const getAccountById = async (context: Context, accountId: string): Promise<Account> => {
  try {
    console.info('Getting account by ID');

    const account = (await context.db.Account.findOne({
      where: {
        id: accountId,
      },
    })) as Account;

    return account;
  } catch (error) {
    console.error('Error getting account by ID %O', error);

    throw new Error(`Getting account by ID ${error}`);
  }
};

export default getAccountById;

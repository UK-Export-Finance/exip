import { Account, Context } from '../../types';

/**
 * getAccountById
 * Get an account by account ID
 * @param {Object} context: KeystoneJS context API
 * @param {String} accountId: Account ID
 * @returns {Promise<Account>} Account
 */
const getAccountById = async (context: Context, accountId: string) => {
  try {
    console.info('Getting account by ID');

    const account = (await context.db.Account.findOne({
      where: {
        id: accountId,
      },
    })) as Account;

    return account;
  } catch (err) {
    console.error('Error getting account by ID %O', err);

    throw new Error(`Getting account by ID ${err}`);
  }
};

export default getAccountById;

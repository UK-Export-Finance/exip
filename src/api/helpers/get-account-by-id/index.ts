import { Account, Context } from '../../types';

/**
 * getAccountById
 * Get the account the ID is associated with.
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Promise<Object>} Account
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

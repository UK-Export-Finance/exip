import accounts from './accounts';
import { Account, Context } from '../types';

/**
 * createMultipleAccounts
 * Create multiple accounts for unit testing
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Array<Account>>} Accounts array
 */
export const createMultipleAccounts = async (context: Context): Promise<Array<Account>> => {
  try {
    console.info('Creating multiple accounts (test helpers)');

    const promises = (await Promise.all([
      await accounts.create({ context }),
      await accounts.create({ context, deleteAccounts: false }),
      await accounts.create({ context, deleteAccounts: false }),
      await accounts.create({ context, deleteAccounts: false }),
      await accounts.create({ context, deleteAccounts: false }),
      await accounts.create({ context, deleteAccounts: false }),
    ])) as Array<Account>;

    return promises;
  } catch (error) {
    console.error('Error creating multiple accounts (test helpers)');

    throw new Error('Error creating multiple accounts (test helpers)');
  }
};

export default createMultipleAccounts;

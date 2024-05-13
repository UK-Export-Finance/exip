import accounts from './accounts';
import { Account, Context } from '../types';

/**
 * createMultipleAccounts
 * Create multiple accounts for unit testing
 * @param {Object} KeystoneJS context API
 * @returns {Promise<Array<Account>>} Accounts array
 */
export const createMultipleAccounts = async (context: Context): Promise<Array<Account>> => {
  const account0 = (await accounts.create({ context })) as Account;
  const account1 = (await accounts.create({ context, deleteAccounts: false })) as Account;
  const account2 = (await accounts.create({ context, deleteAccounts: false })) as Account;
  const account3 = (await accounts.create({ context, deleteAccounts: false })) as Account;
  const account4 = (await accounts.create({ context, deleteAccounts: false })) as Account;
  const account5 = (await accounts.create({ context, deleteAccounts: false })) as Account;

  return [account0, account1, account2, account3, account4, account5];
};

export default createMultipleAccounts;

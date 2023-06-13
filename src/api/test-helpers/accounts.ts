import { Context } from '.keystone/types'; // eslint-disable-line
import { mockAccount } from '../test-mocks';
import { Account } from '../types';

/**
 * create account test helper
 * Create an account with mock account data and any provied custom account data.
 * @param {Object} Created account
 */
const create = async (context: Context, accountData?: Account) => {
  try {
    let accountInput = mockAccount;

    if (accountData) {
      accountInput = accountData;
    }

    const account = (await context.query.Account.createOne({
      data: accountInput,
      query: 'id email firstName lastName email salt hash verificationHash sessionExpiry otpExpiry reactivationHash reactivationExpiry isVerified isBlocked',
    })) as Account;

    return account;
  } catch (err) {
    console.error(err);
    throw new Error(`Creating an account (test helpers) ${err}`);
  }
};

/**
 * deleteAll test helper
 * Get all accounts and delete them.
 * @param {Array} Accounts that have been deleted
 */
const deleteAll = async (context: Context) => {
  try {
    console.info('Getting and deleting accounts (test helpers)');

    const accounts = await context.query.Account.findMany();

    if (accounts.length) {
      const response = await context.query.Account.deleteMany({
        where: accounts,
      });

      return response;
    }

    return [];
  } catch (err) {
    console.error(err);
    throw new Error(`Deleting accounts (test helpers) ${err}`);
  }
};

const accounts = {
  create,
  deleteAll,
};

export default accounts;

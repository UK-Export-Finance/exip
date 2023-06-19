import { Context } from '.keystone/types'; // eslint-disable-line
import { mockAccount } from '../test-mocks';
import { Account } from '../types';

/**
 * create account test helper
 * Create an account with mock account data and any provied custom account data.
 * @param {Object} KeystoneJS context API
 * @param {Object} Account data
 * @returns {Object} Created account
 */
const create = async (context: Context, accountData?: Account) => {
  try {
    console.info('Creating an account (test helpers)');

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
 * @param {Object} KeystoneJS context API
 * @returns {Array} Accounts that have been deleted
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
    throw new Error(`Getting and deleting accounts (test helpers) ${err}`);
  }
};

/**
 * get account test helper
 * Get an account by ID
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Object} Account
 */
const get = async (context: Context, accountId: string) => {
  try {
    console.info('Getting an account by ID (test helpers)');

    const account = (await context.query.Account.findOne({
      where: { id: accountId },
      query:
        'id firstName lastName email otpSalt otpHash otpExpiry salt hash passwordResetHash passwordResetExpiry verificationHash verificationExpiry isVerified isBlocked reactivationHash reactivationExpiry',
    })) as Account;

    return account;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting an account by ID (test helpers) ${err}`);
  }
};

const accounts = {
  create,
  deleteAll,
  get,
};

export default accounts;

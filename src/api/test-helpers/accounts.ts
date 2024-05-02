import authRetries from './auth-retries';
import accountStatusHelper from './account-status';
import { mockAccount } from '../test-mocks';
import { Account, Context, TestHelperAccountCreate } from '../types';

/**
 * deleteAll test helper
 * Get all accounts and delete them.
 * @param {Object} KeystoneJS context API
 * @returns {Array} Accounts that have been deleted
 */
const deleteAll = async (context: Context) => {
  try {
    console.info('Getting and deleting accounts (test helpers)');

    await authRetries.deleteAll(context);
    await accountStatusHelper.deleteAll(context);

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
        'id firstName lastName email otpSalt otpHash otpExpiry salt hash passwordResetHash passwordResetExpiry verificationHash verificationExpiry reactivationHash reactivationExpiry accountStatus { id isBlocked isVerified isInactivated }',
    })) as Account;

    return account;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting an account by ID (test helpers) ${err}`);
  }
};

/**
 * create account test helper
 * Create an account with mock account data and any provided custom account data.
 * @param {Object} KeystoneJS context API, account data, deleteAccounts flag
 * @returns {Object} Created account
 */
const create = async ({ context, data, deleteAccounts = true }: TestHelperAccountCreate) => {
  try {
    console.info('Creating an account (test helpers)');

    if (deleteAccounts) {
      await deleteAll(context);
    }

    const { accountStatus, ...mockAccountData } = mockAccount;

    let accountInput = mockAccountData;

    if (data) {
      accountInput = data;
    }

    const account = (await context.query.Account.createOne({
      data: accountInput,
      query:
        'id email firstName lastName email salt hash verificationHash sessionExpiry otpExpiry reactivationHash reactivationExpiry passwordResetHash passwordResetExpiry accountStatus { id isBlocked isVerified isInactivated }',
    })) as Account;

    await accountStatusHelper.create({ context, accountId: account.id });

    // returns updated account with accountStatus data
    const updatedAccount = await get(context, account.id);

    return updatedAccount;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const accounts = {
  create,
  deleteAll,
  get,
};

export default accounts;

import authRetries from './auth-retries';
import accountStatusHelper from './account-status';
import { mockAccount } from '../test-mocks';
import { Account, Context, TestHelperAccountCreate, AccountCreationCore } from '../types';

/**
 * deleteAll test helper
 * Get all accounts and delete them.
 * @param {Context} context: KeystoneJS context API
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
  } catch (error) {
    console.error('Error getting and deleting accounts (test helpers) %o', error);

    throw new Error(`Getting and deleting accounts (test helpers) ${error}`);
  }
};

/**
 * get account test helper
 * Get an account by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} Account ID
 * @returns {object} Account
 */
const get = async (context: Context, accountId: string): Promise<Account> => {
  try {
    console.info('Getting an account by ID (test helpers)');

    const account = (await context.query.Account.findOne({
      where: { id: accountId },
      query:
        'id firstName lastName email otpSalt otpHash otpExpiry salt hash passwordResetHash passwordResetExpiry verificationHash verificationExpiry reactivationHash reactivationExpiry updatedAt status { id isBlocked isVerified isInactive updatedAt }',
    })) as Account;

    return account;
  } catch (error) {
    console.error('Error getting an account by ID (test helpers) %o', error);

    throw new Error(`Getting an account by ID (test helpers) ${error}`);
  }
};

/**
 * create account test helper
 * Create an account with mock account data and any provided custom account data.
 * @param {Context} context: KeystoneJS context API, account data, deleteAccounts flag
 * @returns {object} Created account
 */
const create = async ({ context, data, deleteAccounts = true }: TestHelperAccountCreate) => {
  try {
    console.info('Creating an account (test helpers)');

    if (deleteAccounts) {
      await deleteAll(context);
    }

    const { status, ...mockAccountData } = mockAccount;

    let accountInput = mockAccountData;

    if (data) {
      accountInput = data;
    }

    const account = (await context.query.Account.createOne({
      data: accountInput,
      query:
        'id email firstName lastName email salt hash verificationHash sessionExpiry otpExpiry reactivationHash reactivationExpiry passwordResetHash passwordResetExpiry updatedAt status { id isBlocked isVerified isInactive updatedAt }',
    })) as Account;

    await accountStatusHelper.create({ context, accountId: account.id, deleteAccountStatus: false });

    // returns updated account with status data
    const updatedAccount = await get(context, account.id);

    return updatedAccount;
  } catch (error) {
    console.error('Error creating an account (test helpers) %o', error);

    return error;
  }
};

/**
 * update account test helper
 * updates an account by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} Account ID
 * @param {AccountCreationCore} Account update data
 * @returns {Account} Account
 */
const update = async (context: Context, accountId: string, data: AccountCreationCore) => {
  try {
    console.info('Getting an account by ID (test helpers)');

    const account = (await context.db.Account.updateOne({
      where: { id: accountId },
      data,
    })) as Account;

    return account;
  } catch (error) {
    console.error('Error updating an account by ID (test helpers) %o', error);

    throw new Error(`Updating an account by ID (test helpers) ${error}`);
  }
};

const accounts = {
  create,
  deleteAll,
  get,
  update,
};

export default accounts;

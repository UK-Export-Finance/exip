import { mockAccount } from '../test-mocks';
import { AccountStatus, AccountStatusUpdate, Context, TestHelperAccountStatusCreate } from '../types';

/**
 * deleteAll test helper
 * Get all account-status and delete them.
 * @param {Object} KeystoneJS context API
 * @returns {Array} Accounts that have been deleted
 */
const deleteAll = async (context: Context) => {
  try {
    console.info('Getting and deleting account status (test helpers)');

    const accountStatus = await context.query.AccountStatus.findMany();

    if (accountStatus.length) {
      const response = await context.query.AccountStatus.deleteMany({
        where: accountStatus,
      });

      return response;
    }

    return [];
  } catch (err) {
    console.error(err);
    throw new Error(`Getting and deleting account status (test helpers) ${err}`);
  }
};

/**
 * create account status test helper
 * Create an account with mock accountStatus data and any connections to account
 * @param {Object} KeystoneJS context API, accountStatus data, accountId and deleteAccountStatus flag
 * @returns {TestHelperAccountStatusCreate} Created accountStatus
 */
const create = async ({ context, data, accountId, deleteAccountStatus = true }: TestHelperAccountStatusCreate) => {
  try {
    console.info('Creating an account status (test helpers)');

    if (deleteAccountStatus) {
      await deleteAll(context);
    }

    let accountInput = {
      account: {
        connect: {
          id: accountId,
        },
      },
    };

    if (data) {
      accountInput = {
        ...accountInput,
        ...mockAccount.accountStatus,
      };
    }

    const accountStatus = (await context.query.AccountStatus.createOne({
      data: accountInput,
      query: 'id isVerified isBlocked isInactivated',
    })) as AccountStatus;

    return accountStatus;
  } catch (err) {
    console.error('Error creating account status %O', err);
    return err;
  }
};

/**
 * get account status test helper
 * Get an accountStatus by ID
 * @param {Object} KeystoneJS context API
 * @param {String} AccountStatus ID
 * @returns {AccountStatus} Account
 */
const get = async (context: Context, accountStatusId: string) => {
  try {
    console.info('Getting an accountStatus by ID (test helpers)');

    const accountStatus = (await context.query.AccountStatus.findOne({
      where: { id: accountStatusId },
      query: 'id isVerified isBlocked isInactive',
    })) as AccountStatus;

    return accountStatus;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting an account status by ID (test helpers) ${err}`);
  }
};

/**
 * update account-status test helper
 * Updates an accountStatus by accountStatus ID
 * @param {Object} KeystoneJS context API
 * @param {String} AccountStatus ID
 * @returns {AccountStatus} Account
 */
const update = async (context: Context, accountStatusId: string, data: AccountStatusUpdate) => {
  try {
    console.info('Updating an accountStatus by ID (test helpers)');

    const accountStatus = (await context.db.AccountStatus.updateOne({
      where: { id: accountStatusId },
      data,
    })) as AccountStatus;

    return accountStatus;
  } catch (err) {
    console.error(err);
    throw new Error(`Updating an account status by ID (test helpers) ${err}`);
  }
};

const accountStatus = {
  create,
  deleteAll,
  get,
  update,
};

export default accountStatus;

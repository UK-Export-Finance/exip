import { mockAccount } from '../test-mocks';
import { AccountStatus, AccountStatusCore, Context, TestHelperAccountStatusCreate } from '../types';

/**
 * deleteAll test helper
 * Get all AccountStatus and delete them.
 * @param {Context} context: KeystoneJS context API
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
  } catch (error) {
    console.error('Error getting and deleting an account status (test helpers) %o', error);

    throw new Error(`Getting and deleting an account status (test helpers) ${error}`);
  }
};

/**
 * create account status test helper
 * Create an account with mock accountStatus data and any connections to account
 * @param {Context} context: KeystoneJS context API, accountStatus data, accountId and deleteAccountStatus flag
 * @param {AccountStatusCore} data update data
 * @param {String} accountId
 * @param {Boolean} deleteAccountStatus: should delete account statuses
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
        ...mockAccount.status,
      };
    }

    const accountStatus = (await context.query.AccountStatus.createOne({
      data: accountInput,
      query: 'id isVerified isBlocked isInactive updatedAt',
    })) as AccountStatus;

    return accountStatus;
  } catch (error) {
    console.error('Error creating account status (test helpers) %o', error);

    return error;
  }
};

/**
 * get account status test helper
 * Get an accountStatus by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} AccountStatus ID
 * @returns {AccountStatus} Account
 */
const get = async (context: Context, accountStatusId: string) => {
  try {
    console.info('Getting an accountStatus by ID (test helpers)');

    const accountStatus = (await context.query.AccountStatus.findOne({
      where: { id: accountStatusId },
      query: 'id isVerified isBlocked isInactive updatedAt',
    })) as AccountStatus;

    return accountStatus;
  } catch (error) {
    console.error('Error getting an account status by ID (test helpers) %o', error);

    throw new Error(`Getting an account status by ID (test helpers) ${error}`);
  }
};

/**
 * update account status test helper
 * Updates an accountStatus by accountStatus ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} AccountStatus ID
 * @param {AccountStatusCore} data
 * @returns {AccountStatus} Account
 */
const update = async (context: Context, accountStatusId: string, data: AccountStatusCore) => {
  try {
    console.info('Updating an accountStatus by ID (test helpers)');

    const accountStatus = (await context.db.AccountStatus.updateOne({
      where: { id: accountStatusId },
      data,
    })) as AccountStatus;

    return accountStatus;
  } catch (error) {
    console.error('Error updating an account status by ID (test helpers) %o', error);

    throw new Error(`Updating an account status by ID (test helpers) ${error}`);
  }
};

const accountStatus = {
  create,
  deleteAll,
  get,
  update,
};

export default accountStatus;

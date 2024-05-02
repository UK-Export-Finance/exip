import { Context } from '../../types';

/**
 * account
 * Update an account
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @param {Object} Account update data
 * @returns {Promise<Object>} Updated account
 */
const account = async (context: Context, accountId: string, updateData: object) => {
  try {
    console.info('Updating account');

    const updatedAccount = await context.db.Account.updateOne({
      where: {
        id: accountId,
      },
      data: updateData,
    });

    return updatedAccount;
  } catch (err) {
    console.error('Error updating account %O', err);

    throw new Error(`Updating account ${err}`);
  }
};

/**
 * accountStatus
 * Update an accountStatus
 * @param {Object} KeystoneJS context API
 * @param {String} AccountStatus ID
 * @param {Object} AccountStatus update data
 * @returns {Promise<Object>} Updated account
 */
const accountStatus = async (context: Context, accountStatusId: string, updateData: object) => {
  try {
    console.info('Updating account');

    const updatedAccountStatus = await context.db.AccountStatus.updateOne({
      where: {
        id: accountStatusId,
      },
      data: updateData,
    });

    return updatedAccountStatus;
  } catch (err) {
    console.error('Error updating account status %O', err);

    throw new Error(`Updating account status ${err}`);
  }
};

const update = {
  account,
  accountStatus,
};

export default update;

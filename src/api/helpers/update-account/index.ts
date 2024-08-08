import { AccountStatusCore, Context } from '../../types';

/**
 * account
 * Update an account
 * @param {Context} KeystoneJS context API
 * @param {String} Account ID
 * @param {Account} Account update data
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
  } catch (error) {
    console.error('Error updating account %O', error);

    throw new Error(`Updating account ${error}`);
  }
};

/**
 * accountStatus
 * Update an accountStatus
 * @param {Context} context: KeystoneJS context API
 * @param {String} accountStatusId: Account status ID
 * @param {Object} updateData: Update data
 * @returns {Promise<Object>} Updated account
 */
const accountStatus = async (context: Context, accountStatusId: string, updateData: AccountStatusCore) => {
  try {
    console.info('Updating account');

    const updatedAccountStatus = await context.db.AccountStatus.updateOne({
      where: {
        id: accountStatusId,
      },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });

    return updatedAccountStatus;
  } catch (error) {
    console.error('Error updating account status %O', error);

    throw new Error(`Updating account status ${error}`);
  }
};

const update = {
  account,
  accountStatus,
};

export default update;

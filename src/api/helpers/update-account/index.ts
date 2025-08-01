import { AccountStatusCore, Context } from '../../types';

/**
 * account
 * Update an account
 * @param {Context} context: KeystoneJS context API
 * @param {string} Account ID
 * @param {Account} Account update data
 * @returns {Promise<object>} Updated account
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
    console.error('Error updating account %o', error);

    throw new Error(`Updating account ${error}`);
  }
};

/**
 * accountStatus
 * Update an accountStatus
 * @param {Context} context: KeystoneJS context API
 * @param {string} accountStatusId: Account status ID
 * @param {object} updateData: Update data
 * @returns {Promise<object>} Updated account
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
    console.error('Error updating account status %o', error);

    throw new Error(`Updating account status ${error}`);
  }
};

const update = {
  account,
  accountStatus,
};

export default update;

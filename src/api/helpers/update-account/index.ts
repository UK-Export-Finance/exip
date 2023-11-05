import { Context } from '../../types';

/**
 * account
 * Update an account
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @param {Object} Account update data
 * @returns {Object} Updated account
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

const update = {
  account,
};

export default update;

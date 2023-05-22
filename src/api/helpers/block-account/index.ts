import { Context } from '.keystone/types'; // eslint-disable-line
import { Account } from '../../types';
/**
 * blockAccount
 * Update an account to have a true isBlocked property/flag
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Boolean}
 */
const blockAccount = async (context: Context, accountId: string) => {
  console.info(`Blocking account ${accountId}`);

  try {
    const result = (await context.db.Account.updateOne({
      where: { id: accountId },
      data: { isBlocked: true },
    })) as Account;

    if (result.id) {
      return true;
    }

    return false;
  } catch (err) {
    console.error(err);

    throw new Error(`Blocking account ${err}`);
  }
};

export default blockAccount;

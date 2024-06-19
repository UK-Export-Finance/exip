import { Context } from '.keystone/types';
import update from '../update-account';

/**
 * blockAccount
 * Update an account to have a true isBlocked property/flag
 * @param {Context} KeystoneJS context API
 * @param {String} AccountStatus ID
 * @returns {Promise<Boolean>}
 */
const blockAccount = async (context: Context, statusId: string): Promise<boolean> => {
  console.info('Blocking account %s', statusId);

  try {
    const statusUpdate = { isBlocked: true };

    const result = await update.accountStatus(context, statusId, statusUpdate);

    if (result.id) {
      return true;
    }

    return false;
  } catch (err) {
    console.error('Error blocking account %O', err);

    throw new Error(`Blocking account ${err}`);
  }
};

export default blockAccount;

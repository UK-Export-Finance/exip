import update from '../update-account';
import { Account, Context } from '../../types';

/**
 * blockAccount
 * Update an account to have a true isBlocked property/flag
 * @param {Object} KeystoneJS context API
 * @param {String} AccountStatus ID
 * @returns {Promise<Boolean>}
 */
const blockAccount = async (context: Context, statusId: string) => {
  console.info('Blocking account %s', statusId);

  try {
    const statusUpdate = { isBlocked: true };

    const result = (await update.accountStatus(context, statusId, statusUpdate)) as Account;

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

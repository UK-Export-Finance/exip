import update from '../update-account';
import { Account, Context } from '../../types';

/**
 * blockAccount
 * Update an account to have a true isBlocked property/flag
 * @param {Object} KeystoneJS context API
 * @param {String} AccountStatus ID
 * @returns {Promise<Boolean>}
 */
const blockAccount = async (context: Context, accountStatusId: string) => {
  console.info('Blocking account %s', accountStatusId);

  try {
    const accountStatusUpdate = { isBlocked: true };

    const result = (await update.accountStatus(context, accountStatusId, accountStatusUpdate)) as Account;

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

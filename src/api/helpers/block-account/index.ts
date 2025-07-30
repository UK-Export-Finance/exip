import update from '../update-account';
import { Context } from '../../types';

/**
 * blockAccount
 * Update an account to have a true isBlocked property/flag
 * @param {Context} context: KeystoneJS context API
 * @param {string} AccountStatus ID
 * @returns {Promise<boolean>}
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
  } catch (error) {
    console.error('Error blocking account %o', error);

    throw new Error(`Blocking account ${error}`);
  }
};

export default blockAccount;

import update from '../update-account';
import { Account, Context } from '../../types';

/**
 * blockAccount
 * Update an account to have a true isBlocked property/flag
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Boolean}
 */
const blockAccount = async (context: Context, accountId: string) => {
  console.info('Blocking account %s', accountId);

  try {
    const accountUpdate = { isBlocked: true };

    const result = (await update.account(context, accountId, accountUpdate)) as Account;

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

import { Context } from '.keystone/types';
import { AccountStatus } from '../../types';

/**
 * getAccountStatusById
 * Get an account status by account status ID
 * @param {Object} context: KeystoneJS context API
 * @param {String} id: Account status ID
 * @returns {Promise<Account>} Account
 */
const getAccountStatusById = async (context: Context, id: string): Promise<AccountStatus | boolean> => {
  try {
    console.info('Getting account status by ID  %s', id);

    const accountStatus = await context.query.AccountStatus.findOne({
      where: { id },
      query: 'id isVerified isBlocked isInactive',
    }) as AccountStatus;

    return accountStatus;
  } catch (err) {
    console.error('Error getting account status by ID %O', err);
    throw new Error(`Getting account status by ID ${err}`);
  }
};

export default getAccountStatusById;

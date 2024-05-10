import { Context } from '.keystone/types'; // eslint-disable-line
import mapUnverifiedAccounts from '../map-unverified-accounts';
import { Account } from '../../types';

/**
 * mapAndUpdateUnverifiedAccounts
 * maps and generates save object for unverified accounts
 * updates AccountStatus' isInactive flag to true and updates AccountStatus and Account updatedAt
 * @param {Array<Account>} accounts: array of applications
 * @param {Context} context
 */
const mapAndUpdateUnverifiedAccounts = async (accounts: Array<Account>, context: Context) => {
  try {
    console.info('Mapping and updating unverified accounts - mapAndUpdateUnverifiedAccounts');

    /**
     * generates data array for database saving
     * contains where and data (status change)
     * array for account and for accountStatus
     */
    const { account, accountStatus } = mapUnverifiedAccounts(accounts);

    /**
     * updates the accounts' updatedAt
     * updates the AccountStatus' isInactive and updatedAt
     */
    await context.db.Account.updateMany({
      data: account,
    });

    await context.db.AccountStatus.updateMany({
      data: accountStatus,
    });
  } catch (err) {
    console.error('Error mapping and updating unverified accounts %O', err);
    throw new Error(`Error mapping and updating unverified accounts ${err}`);
  }
};

export default mapAndUpdateUnverifiedAccounts;

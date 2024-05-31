import { Account, CronAccountStatusUnverifiedUpdate, CronAccountUpdate } from '../../types';

/**
 * mapUnverifiedAccounts
 * generates array of objects for updating the db
 * object contains where object with id of account to be updated
 * contains data object with fields which are updated
 * @param {Array<Account>} accounts: array of accounts
 * @returns {Array<CronAccountStatusUnverifiedUpdate>}: Arrays of objects for updating db
 */
const mapUnverifiedAccounts = (accounts: Array<Account>) => {
  /**
   * loops through accounts array
   * adds id of accountStatus to where object
   * sets isInactive to true
   * updates updatedAt timestamp
   */
  const mappedAccountStatusArray = accounts.map((account: Account) => {
    const mapped = {
      where: { id: account.status.id },
      data: {
        isInactive: true,
        updatedAt: new Date(),
      },
    } as CronAccountStatusUnverifiedUpdate;

    return mapped;
  });

  /**
   * loops through accounts array
   * adds id of account to where object
   * updates updatedAt timestamp
   */
  const mappedAccountArray = accounts.map((account: Account) => {
    const mapped = {
      where: { id: account.id },
      data: {
        updatedAt: new Date(),
        verificationHash: '',
        verificationExpiry: null,
      },
    } as CronAccountUpdate;

    return mapped;
  });

  return {
    accountStatus: mappedAccountStatusArray,
    account: mappedAccountArray,
  };
};

export default mapUnverifiedAccounts;

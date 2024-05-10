import { Account, CronAccountStatusUnverifiedUpdate, CronAccountUpdate } from '../../types';

/**
 * mapInactiveApplications
 * generates array of objects for updating the db
 * object contains where object with id of application to be updated
 * contains data object with fields which are updated
 * @param {Array<CronAccountStatusUnverifiedUpdate>} applications: array of application ids and statuses
 * @returns {Array<CronAccountStatusUnverifiedUpdate>}: Arrays of objects for updating db
 */
const mapUnverifiedAccounts = (accounts: Array<Account>) => {
  /**
   * loops through applications array
   * adds id to where object
   * adds abandoned status to status, previous status and updatedAt
   * pushes to mappedArray
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

  const mappedAccountArray = accounts.map((account: Account) => {
    const mapped = {
      where: { id: account.id },
      data: {
        updatedAt: new Date(),
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

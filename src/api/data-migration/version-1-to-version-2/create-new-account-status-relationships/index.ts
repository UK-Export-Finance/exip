import { Connection } from 'mysql2/promise';
import createAccountStatusRows from './account-status-rows';
import getAllAccountStatuses from '../get-all-account-statuses';
import updateAccountStatusColumns from './account-status-columns';
import getAllAccounts from '../get-all-accounts';

/**
 * createNewAccountStatusRelationships
 * Create new "account status" relationships for all existing accounts.
 * 1) Get all accounts
 * 2) Create account status rows/entries in the "AccountStatus" table
 * 3) Get all account statuses
 * 4) Update status ID columns in the "Account" table
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<boolean>}
 */
const createNewAccountStatusRelationships = async (connection: Connection): Promise<boolean> => {
  const loggingMessage = 'Creating new status relationships for all accounts';

  console.info('✅ %s', loggingMessage);

  try {
    const accounts = await getAllAccounts(connection);

    const statusRows = await createAccountStatusRows(connection, accounts);

    const accountStatuses = await getAllAccountStatuses(connection);

    await updateAccountStatusColumns(connection, statusRows, accountStatuses);

    return true;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default createNewAccountStatusRelationships;
